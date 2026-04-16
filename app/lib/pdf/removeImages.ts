import {
  PDFDocument,
  PDFName,
  PDFDict,
  PDFRef,
  PDFArray,
  PDFRawStream,
  decodePDFRawStream,
  PDFContext,
  type PDFPageLeaf,
} from 'pdf-lib';

function latin1Decode(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i++) {
    s += String.fromCharCode(bytes[i]);
  }
  return s;
}

function latin1Encode(str: string): Uint8Array {
  const out = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    out[i] = str.charCodeAt(i) & 0xff;
  }
  return out;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Remove inline image objects (BI … EI) from decoded content stream bytes. */
function stripInlineImagesBytes(decoded: Uint8Array): Uint8Array {
  const s = latin1Decode(decoded);
  const stripped = s.replace(/\bBI\b[\s\S]*?\bEI\b/g, '');
  return latin1Encode(stripped);
}

/** Remove `Do` operators that paint the given image XObject names. */
function stripImageDoOperators(decoded: Uint8Array, imageNames: Set<string>): Uint8Array {
  if (imageNames.size === 0) return decoded;
  let s = latin1Decode(decoded);
  for (const name of Array.from(imageNames)) {
    const re = new RegExp(`\\s*${escapeRegExp(name)}\\s+Do\\s*`, 'g');
    s = s.replace(re, '\n');
  }
  return latin1Encode(s);
}

function decodeStreamToBytes(stream: PDFRawStream): Uint8Array {
  const decoded = decodePDFRawStream(stream);
  const reader = decoded as unknown as { getBytes(length?: number): Uint8Array };
  return reader.getBytes();
}

function stripAndRecompress(
  context: PDFContext,
  stream: PDFRawStream,
  imageNames: Set<string>
): PDFRawStream {
  const decoded = decodeStreamToBytes(stream);
  let next = stripImageDoOperators(decoded, imageNames);
  next = stripInlineImagesBytes(next);
  return context.flateStream(next);
}

function getContentStreamRefs(leaf: PDFPageLeaf, context: PDFContext): PDFRef[] {
  const contents = leaf.get(PDFName.of('Contents'));
  if (!contents) return [];

  if (contents instanceof PDFRef) {
    return [contents];
  }

  const asArray = context.lookupMaybe(contents, PDFArray);
  if (asArray) {
    const refs: PDFRef[] = [];
    for (let i = 0; i < asArray.size(); i++) {
      const item = asArray.get(i);
      if (item instanceof PDFRef) refs.push(item);
    }
    return refs;
  }

  return [];
}

function collectAndRemoveImagesFromXObject(xObject: PDFDict, context: PDFContext): Set<string> {
  const removed = new Set<string>();

  for (const key of [...xObject.keys()]) {
    const refOrVal = xObject.get(key);
    const obj = refOrVal instanceof PDFRef ? context.lookup(refOrVal) : refOrVal;
    if (!(obj instanceof PDFRawStream)) continue;

    const subtype = obj.dict.lookup(PDFName.of('Subtype'));
    if (subtype === PDFName.of('Image')) {
      removed.add(key.toString());
      xObject.delete(key);
    }
  }

  return removed;
}

function processFormXObject(formStream: PDFRawStream, context: PDFContext): void {
  const dict = formStream.dict;
  let formResources = dict.lookupMaybe(PDFName.of('Resources'), PDFDict);
  if (!formResources) {
    formResources = context.obj({});
    dict.set(PDFName.of('Resources'), formResources);
  }

  const xObject = formResources.lookupMaybe(PDFName.of('XObject'), PDFDict);
  let removedNames = new Set<string>();

  if (xObject) {
    const nestedForms: PDFRawStream[] = [];

    for (const key of [...xObject.keys()]) {
      const refOrVal = xObject.get(key);
      const obj = refOrVal instanceof PDFRef ? context.lookup(refOrVal) : refOrVal;
      if (!(obj instanceof PDFRawStream)) continue;

      const subtype = obj.dict.lookup(PDFName.of('Subtype'));
      if (subtype === PDFName.of('Form')) {
        nestedForms.push(obj);
      }
    }

    for (const nested of nestedForms) {
      processFormXObject(nested, context);
    }

    removedNames = collectAndRemoveImagesFromXObject(xObject, context);
  }

  const ref = context.getObjectRef(formStream);
  if (!ref) return;

  const stripped = stripAndRecompress(context, formStream, removedNames);
  context.assign(ref, stripped);
}

function removePageLevelImages(leaf: PDFPageLeaf, context: PDFContext): Set<string> {
  leaf.normalize();
  const resources = leaf.Resources();
  if (!resources) return new Set();

  let xObject = resources.lookupMaybe(PDFName.of('XObject'), PDFDict);
  if (!xObject) return new Set();

  const formStreams: PDFRawStream[] = [];
  for (const key of [...xObject.keys()]) {
    const refOrVal = xObject.get(key);
    const obj = refOrVal instanceof PDFRef ? context.lookup(refOrVal) : refOrVal;
    if (!(obj instanceof PDFRawStream)) continue;
    if (obj.dict.lookup(PDFName.of('Subtype')) === PDFName.of('Form')) {
      formStreams.push(obj);
    }
  }

  for (const form of formStreams) {
    processFormXObject(form, context);
  }

  xObject = resources.lookupMaybe(PDFName.of('XObject'), PDFDict);
  if (!xObject) return new Set();

  return collectAndRemoveImagesFromXObject(xObject, context);
}

function stripPageContentStreams(leaf: PDFPageLeaf, context: PDFContext, imageNames: Set<string>): void {
  const refs = getContentStreamRefs(leaf, context);
  for (const ref of refs) {
    const stream = context.lookup(ref);
    if (!(stream instanceof PDFRawStream)) continue;
    const stripped = stripAndRecompress(context, stream, imageNames);
    context.assign(ref, stripped);
  }
}

/**
 * Remove embedded images from a PDF while keeping vector text and paths where possible.
 * Strips image XObjects, corresponding `Do` operators, inline images (BI…EI), and recurses into Form XObjects.
 */
export async function removeImages(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  for (const page of pdfDoc.getPages()) {
    const leaf = page.node;
    const pageImageNames = removePageLevelImages(leaf, pdfDoc.context);
    stripPageContentStreams(leaf, pdfDoc.context, pageImageNames);
  }

  return pdfDoc.save();
}

export function downloadNoImagesPdf(pdfBytes: Uint8Array, filename: string): void {
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
