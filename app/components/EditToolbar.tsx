'use client';

import { usePdfStore } from '../store/pdfStore';

export default function EditToolbar() {
  const {
    editMode,
    setEditMode,
    selectedShapeType,
    setSelectedShapeType,
    selectedShapeStyle,
    setSelectedShapeStyle,
    pages,
    selectedPageId,
    addImageOverlay,
    saveHistory,
  } = usePdfStore();
  

  const tools = [
    { 
      mode: 'none' as const, 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
        </svg>
      ),
      label: 'Select', 
      title: 'Select and move items' 
    },
    { 
      mode: 'text' as const, 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      label: 'Text', 
      title: 'Add or edit text' 
    },
    { 
      mode: 'image' as const, 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      label: 'Image', 
      title: 'Add images' 
    },
    { 
      mode: 'shape' as const, 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
        </svg>
      ),
      label: 'Shape', 
      title: 'Draw shapes' 
    },
  ];


  const shapeTypes = [
    { 
      type: 'rectangle' as const, 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
        </svg>
      ),
      label: 'Rectangle' 
    },
    { 
      type: 'circle' as const, 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
      label: 'Circle' 
    },
    { 
      type: 'line' as const, 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M4 20L20 4" />
        </svg>
      ),
      label: 'Line' 
    },
    { 
      type: 'arrow' as const, 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      ),
      label: 'Arrow' 
    },
    { 
      type: 'highlight' as const, 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
      label: 'Highlight' 
    },
  ];

  const instructions: Record<string, string> = {
    none: 'Click to select and edit items',
    text: 'Click on text to edit, or click empty area to add new text',
    image: 'Click to upload and place an image',
    shape: 'Click and drag to draw shape',
    signature: 'Click on PDF to place signature',
  };

  return (
    <div className="glass border-b border-surface-700/50 px-4 py-2.5">
      <div className="flex items-center gap-3">
        {/* Tools Label */}
        <span className="text-xs font-medium text-surface-500 uppercase tracking-wider hidden sm:block">
          Tools
        </span>
        
        {/* Main Tools */}
        <div className="toolbar-group">
          {tools.map((tool) => (
            <button
              key={tool.mode}
              onClick={() => setEditMode(tool.mode)}
              className={`
                btn-sm transition-all duration-200
                ${editMode === tool.mode
                  ? 'btn-primary shadow-lg shadow-primary-500/25'
                  : 'btn-ghost'
                }
              `}
              title={tool.title}
            >
              {tool.icon}
              <span className="hidden md:inline">{tool.label}</span>
            </button>
          ))}
          
          {/* Signature Button - Inside toolbar group */}
          <button
            onClick={() => setEditMode(editMode === 'signature' ? 'none' : 'signature')}
            className={`
              btn-sm transition-all duration-200
              ${editMode === 'signature'
                ? 'btn-primary shadow-lg shadow-primary-500/25'
                : 'btn-ghost hover:bg-accent-500/20 hover:text-accent-300'
              }
            `}
            title="Add signature"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="hidden md:inline">Signature</span>
          </button>
        </div>

        {/* Shape Types (visible when shape mode is active) */}
        {editMode === 'shape' && (
          <>
            {/* Divider */}
            <div className="divider-vertical h-8" />
            
            <div className="flex items-center gap-2 animate-fade-in">
              {/* Shape Type Selector */}
              <div className="toolbar-group">
                {shapeTypes.map((shape) => (
                  <button
                    key={shape.type}
                    onClick={() => setSelectedShapeType(shape.type)}
                    className={`
                      btn-icon-sm transition-all duration-200
                      ${selectedShapeType === shape.type
                        ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/25'
                        : 'btn-ghost'
                      }
                    `}
                    title={shape.label}
                  >
                    {shape.icon}
                  </button>
                ))}
              </div>

              {/* Shape Style (for new shapes) */}
              {(selectedShapeType === 'rectangle' || selectedShapeType === 'circle') && (
                <>
                  <div className="divider-vertical h-6" />
                  
                  <div className="toolbar-group">
                    <button
                      onClick={() => setSelectedShapeStyle('outline')}
                      className={`btn-sm transition-all duration-200 ${
                        selectedShapeStyle === 'outline'
                          ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                          : 'btn-ghost'
                      }`}
                      title="Outline only (no fill)"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="5" y="5" width="14" height="14" rx="2" />
                      </svg>
                      <span className="hidden lg:inline">Outline</span>
                    </button>
                    <button
                      onClick={() => setSelectedShapeStyle('filled')}
                      className={`btn-sm transition-all duration-200 ${
                        selectedShapeStyle === 'filled'
                          ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                          : 'btn-ghost'
                      }`}
                      title="Filled shape"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="5" y="5" width="14" height="14" rx="2" />
                      </svg>
                      <span className="hidden lg:inline">Filled</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* Instructions */}
        <div className="ml-auto flex items-center gap-2 text-xs text-surface-400">
          <svg className="w-4 h-4 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden sm:inline">{instructions[editMode]}</span>
        </div>
      </div>
    </div>
  );
}
