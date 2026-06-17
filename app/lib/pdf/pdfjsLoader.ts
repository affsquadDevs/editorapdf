// Lazily load pdfjs-dist so it is NOT bundled into the tool-page first-load JS.
//
// pdfjs-dist (~300 kB) is only needed once the user actually opens a PDF (preview
// rendering, bookmark splitting, image extraction). Statically importing it in the
// lib/pdf modules pulled it into the tool landing-page bundle. This loader imports it
// on first use and configures the worker exactly once. It returns the same module
// namespace a static `import * as pdfjsLib from 'pdfjs-dist'` would, so every call site
// (pdfjs.getDocument(...), pdfjs.OPS.*, etc.) is behavior-identical.

type Pdfjs = typeof import('pdfjs-dist')

let _pdfjs: Pdfjs | null = null
let _loading: Promise<Pdfjs> | null = null

export function getPdfjs(): Promise<Pdfjs> {
  if (_pdfjs) return Promise.resolve(_pdfjs)
  if (!_loading) {
    _loading = import('pdfjs-dist').then((mod) => {
      // Handle both ESM namespace and CJS interop shapes.
      const pdfjs = (((mod as any).getDocument ? mod : (mod as any).default) ?? mod) as Pdfjs
      if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
      }
      _pdfjs = pdfjs
      return pdfjs
    })
  }
  return _loading
}
