'use client';

import { usePdfStore } from './store/pdfStore';
import UploadArea from './components/UploadArea';
import Toolbar from './components/Toolbar';
import EditToolbar from './components/EditToolbar';
import Thumbnails from './components/Thumbnails';
import PdfViewer from './components/PdfViewer';
import ExportButton from './components/ExportButton';

export default function Home() {
  const { pages, reset } = usePdfStore();
  const hasPages = pages.length > 0;

  return (
    <main className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">PDF Editor</h1>
          {hasPages && (
            <button
              onClick={() => {
                if (confirm('Close current PDF? All unsaved changes will be lost.')) {
                  reset();
                }
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              ✕ Close PDF
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      {!hasPages ? (
        /* Empty State - Upload Area */
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl w-full px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Edit PDFs in Your Browser
              </h2>
              <p className="text-gray-600">
                No uploads to servers. All processing happens locally in your browser.
              </p>
            </div>
            
            <UploadArea />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">📄</div>
                <h3 className="font-semibold text-gray-900 mb-1">View & Navigate</h3>
                <p className="text-sm text-gray-600">
                  Render pages, zoom in/out, and navigate with thumbnails
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">✏️</div>
                <h3 className="font-semibold text-gray-900 mb-1">Edit Pages</h3>
                <p className="text-sm text-gray-600">
                  Reorder, rotate, delete pages, and add text overlays
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">⬇️</div>
                <h3 className="font-semibold text-gray-900 mb-1">Export</h3>
                <p className="text-sm text-gray-600">
                  Download your edited PDF with all changes applied
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Limitations</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Maximum file size: 25MB</li>
                <li>• Works best with PDFs under 50 pages</li>
                <li>• Complex PDFs with forms may not render perfectly</li>
                <li>• Encrypted/password-protected PDFs are not supported</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Editor View */
        <div className="flex-1 flex flex-col overflow-hidden">
          <Toolbar />
          <EditToolbar />
          
          <div className="flex-1 flex overflow-hidden">
            <Thumbnails />
            <PdfViewer />
          </div>
          
          <ExportButton />
        </div>
      )}
    </main>
  );
}
