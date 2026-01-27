# PDF Editor MVP

A client-side PDF editor built with Next.js that runs entirely in your browser. No server-side processing, no data uploads - everything happens locally on your machine.

## Features

### 🎯 Core Functionality

- **Upload PDF**: Drag & drop or file picker with validation (max 25MB)
- **View Pages**: Canvas-based rendering with zoom controls (50% - 300%)
- **Thumbnail Navigation**: Visual page overview with drag-to-reorder
- **Page Operations**:
  - Rotate pages (90° increments)
  - Delete pages (with confirmation)
  - Reorder pages (drag & drop)
- **Text Editing** (ADVANCED):
  - **Extract & Edit Original Text**: Automatically extracts all text from PDF
  - Click any existing text to edit content, size, and color
  - Hide original text when replacing
  - Add new text overlays anywhere on the page
  - Multi-line text support
  - Drag to reposition any text
- **Image Editing**:
  - Upload and place images anywhere on pages
  - Resize and reposition images
  - Delete images
  - Support for PNG, JPEG, and other common formats
- **Shape Drawing**:
  - Rectangle: Draw boxes for emphasis
  - Circle/Ellipse: Highlight circular areas
  - Line: Draw simple lines
  - Arrow: Point to specific content
  - Highlight: Semi-transparent overlays
  - Customize colors and line widths
- **Export**: Download edited PDF with ALL changes applied:
  - Modified text (original + new)
  - Embedded images
  - Drawn shapes
  - All transformations

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **PDF Rendering**: pdfjs-dist (Mozilla's PDF.js)
- **PDF Manipulation**: pdf-lib
- **Hosting Ready**: Static export compatible (Vercel, Netlify, etc.)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
pdfeditor/
├── app/
│   ├── components/
│   │   ├── UploadArea.tsx            # File upload with drag & drop
│   │   ├── Toolbar.tsx               # Main controls (zoom, rotate, delete)
│   │   ├── EditToolbar.tsx           # ✨ NEW: Tool selector (text, image, shape)
│   │   ├── Thumbnails.tsx            # Page thumbnail list with drag-to-reorder
│   │   ├── PdfViewer.tsx             # Main page canvas viewer
│   │   ├── AdvancedOverlayLayer.tsx  # ✨ NEW: All editing (text, images, shapes)
│   │   ├── TextOverlayLayer.tsx      # Legacy text overlay (still available)
│   │   └── ExportButton.tsx          # PDF export and download
│   ├── lib/
│   │   └── pdf/
│   │       ├── pdfRender.ts          # PDF.js rendering utilities
│   │       ├── pdfExtract.ts         # ✨ NEW: Text & image extraction
│   │       └── exportPdf.ts          # pdf-lib export logic (enhanced)
│   ├── store/
│   │   └── pdfStore.ts               # Zustand state management (enhanced)
│   ├── layout.tsx
│   ├── page.tsx                      # Main page / entry point
│   └── globals.css
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## How It Works

### 1. Upload & Parsing
- File is validated (type, size) and loaded into memory
- PDF.js parses the PDF and extracts page information
- **Text Extraction**: Automatically extracts all text with positioning
- Thumbnails are generated for all pages

### 2. State Management
The app maintains:
- **originalFile**: Uploaded PDF file
- **pages[]**: Array of page objects with:
  - Original index
  - Rotation (0, 90, 180, 270)
  - Deleted flag
  - Text overlays (original + new, with normalized coordinates)
  - Image overlays (with data URLs)
  - Shape overlays (rectangles, circles, lines, arrows, highlights)
- **selectedPageId**: Current page being viewed
- **zoom**: Current zoom level (0.5 - 3.0)
- **editMode**: Current tool (select, text, image, shape)

### 3. Text Extraction
- PDF.js `getTextContent()` extracts all text with positioning
- Text items are converted to editable overlays
- Original text can be edited or hidden
- New text can be added anywhere

### 4. Rendering
- PDF.js renders pages to HTML5 canvas
- Multiple overlay layers positioned absolutely:
  - Text layer (original + new)
  - Image layer (uploaded images)
  - Shape layer (drawn shapes)
- Coordinates are normalized (0-1) so they scale with zoom
- Interactive editing with drag-and-drop

### 5. Export
- pdf-lib loads the original PDF
- Creates a new PDF document
- Copies pages in the new order (skipping deleted pages)
- Applies rotations
- **Hides replaced text** (white rectangles over originals)
- **Burns edited text** into the PDF pages
- **Embeds images** (PNG/JPEG)
- **Draws shapes** (SVG-like rendering)
- Generates downloadable file

## Limitations & Known Issues

### File Constraints
- **Max file size**: 25MB (browser memory constraint)
- **Recommended page count**: < 50 pages for smooth performance
- **No password-protected PDFs**: Encrypted files not supported

### Feature Limitations
- **No undo/redo**: Doesn't include history management (TODO: implement)
- **Basic text rendering**: Only standard fonts (Helvetica), no custom fonts
- **Text positioning**: Extracted text positioning may not be perfect for complex layouts
- **Original text replacement**: Hides original with white rectangles (works best on white backgrounds)
- **Form field editing**: Forms are flattened on export
- **Image extraction**: Currently limited (can add new images, but extracting existing images from PDF is complex)

### Browser Compatibility
- **Modern browsers only**: Chrome, Firefox, Edge, Safari (latest versions)
- **Large PDFs**: May cause performance issues or memory errors
- **Mobile**: Works but not optimized for touch interactions

## ✅ Implemented Advanced Features

- [x] **Extract and edit original PDF text**
- [x] **Image overlays** (upload and place images)
- [x] **Draw shapes** (rectangles, circles, lines, arrows, highlights)
- [x] **Multi-line text support**
- [x] **Hide/replace original text**
- [x] **Comprehensive export** (all overlay types)

## Future Enhancements

- [ ] Undo/redo functionality
- [ ] More text formatting options (bold, italic, font family selection)
- [ ] Extract existing images from PDF (currently can only add new images)
- [ ] Freehand drawing/signature
- [ ] Page merging from multiple PDFs
- [ ] Extract/split pages to separate PDFs
- [ ] OCR for scanned PDFs
- [ ] Optimize large file handling
- [ ] Mobile-responsive touch controls
- [ ] Keyboard shortcuts
- [ ] Collaborative editing (cloud sync)

## Troubleshooting

### "Failed to load PDF"
- Check if the file is a valid PDF
- Ensure the PDF is not encrypted or password-protected
- Try a smaller file (< 25MB)

### "Export failed"
- Some complex PDFs with unusual structure may not export correctly
- Try with a simpler PDF to verify the feature works
- Check browser console for specific errors

### Slow performance
- Large PDFs (> 50 pages) may render slowly
- Try reducing zoom level
- Close other browser tabs to free up memory

### PDF.js worker errors
- The app loads the PDF.js worker from a CDN
- Ensure you have internet connectivity (even though processing is local)
- In production, consider bundling the worker locally

## Development Notes

### Why client-only?
- **Privacy**: User files never leave their machine
- **Simplicity**: No backend infrastructure needed
- **Cost**: Free hosting on static platforms
- **Speed**: No network latency for processing

### Key Technical Decisions
- **Zustand over Redux**: Simpler state management for MVP
- **Canvas rendering**: Better performance than SVG for PDF pages
- **Normalized coordinates**: Makes overlays zoom-independent
- **pdf-lib for export**: Browser-compatible, unlike Node-based alternatives

### Adding New Features
1. Add state to `pdfStore.ts` if needed
2. Create component in `app/components/`
3. Add helper functions in `app/lib/pdf/` if manipulating PDFs
4. Update export logic in `exportPdf.ts` to persist changes

## License

MIT License - feel free to use this as a starting point for your own projects.

## Credits

- Built with [Next.js](https://nextjs.org/)
- PDF rendering by [PDF.js](https://mozilla.github.io/pdf.js/)
- PDF manipulation by [pdf-lib](https://pdf-lib.js.org/)
- State management by [Zustand](https://github.com/pmndrs/zustand)
