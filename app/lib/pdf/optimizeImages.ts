import {
  PDFDocument,
  PDFName,
  PDFDict,
  PDFRef,
  PDFRawStream,
  decodePDFRawStream,
  PDFContext,
  type PDFPageLeaf,
} from 'pdf-lib';

export interface OptimizeImagesOptions {
  /** JPEG quality 0–1 (opaque images). */
  quality?: number;
  /** Maximum width or height in pixels after scaling (longest side). */
  maxResolution?: number;
}

function decodeStreamToBytes(stream: PDFRawStream): Uint8Array {
  const decoded = decodePDFRawStream(stream);
  const reader = decoded as unknown as { getBytes(length?: number): Uint8Array };
  return reader.getBytes();
}

async function tryCreateImageBitmap(bytes: Uint8Array): Promise<ImageBitmap | null> {
  const attempts: { type: string }[] = [
    { type: 'image/jpeg' },
    { type: 'image/png' },
    { type: 'image/webp' },
  ];
  for (const { type } of attempts) {
    try {
      const blob = new Blob([bytes as BlobPart], { type });
      return await createImageBitmap(blob);
    } catch {
      /* try next */
    }
  }
  return null;
}

function canvasHasTransparency(canvas: HTMLCanvasElement): boolean {
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  const { width, height } = canvas;
  if (width === 0 || height === 0) return false;
  const step = Math.max(1, Math.floor(Math.min(width, height) / 32));
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4 + 3;
      if (data[i] < 255) return true;
    }
  }
  return false;
}

function canvasToPngBytes(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to encode PNG'));
          return;
        }
        blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
      },
      'image/png'
    );
  });
}

async function optimizeImageAtRef(
  ref: PDFRef,
  pdfDoc: PDFDocument,
  options: Required<OptimizeImagesOptions>
): Promise<void> {
  const obj = pdfDoc.context.lookup(ref);
  if (!(obj instanceof PDFRawStream)) return;
  if (obj.dict.lookup(PDFName.of('Subtype')) !== PDFName.of('Image')) return;

  let decoded: Uint8Array;
  try {
    decoded = decodeStreamToBytes(obj);
  } catch {
    decoded = obj.getContents().slice();
  }

  let bitmap = await tryCreateImageBitmap(decoded);
  if (!bitmap) return;

  const w = bitmap.width;
  const h = bitmap.height;
  const maxR = options.maxResolution;
  let tw = w;
  let th = h;
  if (w > maxR || h > maxR) {
    const scale = Math.min(maxR / w, maxR / h);
    tw = Math.max(1, Math.round(w * scale));
    th = Math.max(1, Math.round(h * scale));
  }

  const canvas = document.createElement('canvas');
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    return;
  }
  ctx.drawImage(bitmap, 0, 0, tw, th);
  bitmap.close();

  const hasAlpha = canvasHasTransparency(canvas);
  const quality = Math.min(1, Math.max(0.05, options.quality));

  if (hasAlpha) {
    const pngBytes = await canvasToPngBytes(canvas);
    const embedded = await pdfDoc.embedPng(pngBytes);
    const newStream = pdfDoc.context.lookup(embedded.ref);
    if (newStream instanceof PDFRawStream) {
      const cloned = newStream.clone(pdfDoc.context);
      pdfDoc.context.assign(ref, cloned);
    }
    pdfDoc.context.delete(embedded.ref);
  } else {
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/jpeg', quality);
    });
    if (!blob) return;
    const jpegBytes = new Uint8Array(await blob.arrayBuffer());
    const embedded = await pdfDoc.embedJpg(jpegBytes);
    const newStream = pdfDoc.context.lookup(embedded.ref);
    if (newStream instanceof PDFRawStream) {
      const cloned = newStream.clone(pdfDoc.context);
      pdfDoc.context.assign(ref, cloned);
    }
    pdfDoc.context.delete(embedded.ref);
  }
}

function collectImageRefsFromXObject(
  xObject: PDFDict,
  context: PDFContext,
  refs: PDFRef[],
  seen: Set<string>
): void {
  for (const key of [...xObject.keys()]) {
    const refOrVal = xObject.get(key);
    const obj = refOrVal instanceof PDFRef ? context.lookup(refOrVal) : refOrVal;
    if (!(obj instanceof PDFRawStream)) continue;
    const subtype = obj.dict.lookup(PDFName.of('Subtype'));
    if (subtype === PDFName.of('Image')) {
      const ref = refOrVal instanceof PDFRef ? refOrVal : context.getObjectRef(obj);
      if (ref instanceof PDFRef) {
        const id = `${ref.objectNumber}.${ref.generationNumber}`;
        if (!seen.has(id)) {
          seen.add(id);
          refs.push(ref);
        }
      }
    } else if (subtype === PDFName.of('Form')) {
      collectImageRefsFromForm(obj as PDFRawStream, context, refs, seen);
    }
  }
}

function collectImageRefsFromForm(formStream: PDFRawStream, context: PDFContext, refs: PDFRef[], seen: Set<string>): void {
  const dict = formStream.dict;
  const formResources = dict.lookupMaybe(PDFName.of('Resources'), PDFDict);
  if (!formResources) return;
  const xObject = formResources.lookupMaybe(PDFName.of('XObject'), PDFDict);
  if (!xObject) return;

  const nestedForms: PDFRawStream[] = [];
  for (const key of [...xObject.keys()]) {
    const refOrVal = xObject.get(key);
    const obj = refOrVal instanceof PDFRef ? context.lookup(refOrVal) : refOrVal;
    if (!(obj instanceof PDFRawStream)) continue;
    if (obj.dict.lookup(PDFName.of('Subtype')) === PDFName.of('Form')) {
      nestedForms.push(obj);
    }
  }
  for (const nested of nestedForms) {
    collectImageRefsFromForm(nested, context, refs, seen);
  }

  collectImageRefsFromXObject(xObject, context, refs, seen);
}

function collectPageImageRefs(leaf: PDFPageLeaf, context: PDFContext, refs: PDFRef[], seen: Set<string>): void {
  leaf.normalize();
  const resources = leaf.Resources();
  if (!resources) return;
  const xObject = resources.lookupMaybe(PDFName.of('XObject'), PDFDict);
  if (!xObject) return;
  collectImageRefsFromXObject(xObject, context, refs, seen);
}

/**
 * Recompress and optionally downscale embedded image XObjects (JPEG/PNG/WebP decodable streams).
 * Skips unsupported formats (e.g. some CMYK/JBIG2/JPX) without failing the whole job.
 */
export async function optimizeImages(
  file: File,
  options: OptimizeImagesOptions = {}
): Promise<Uint8Array> {
  const quality = options.quality ?? 0.8;
  const maxResolution = options.maxResolution ?? 1920;

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const refs: PDFRef[] = [];
  const seen = new Set<string>();
  for (const page of pdfDoc.getPages()) {
    collectPageImageRefs(page.node, pdfDoc.context, refs, seen);
  }

  const opts: Required<OptimizeImagesOptions> = { quality, maxResolution };

  for (const ref of refs) {
    try {
      await optimizeImageAtRef(ref, pdfDoc, opts);
    } catch {
      /* skip broken image */
    }
  }

  return pdfDoc.save();
}

export function downloadOptimizedPdf(pdfBytes: Uint8Array, filename: string): void {
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
