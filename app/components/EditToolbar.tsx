'use client';

import { usePdfStore } from '../store/pdfStore';

export default function EditToolbar() {
  const { editMode, setEditMode, selectedShapeType, setSelectedShapeType } = usePdfStore();

  const tools = [
    { mode: 'none' as const, icon: '👆', label: 'Select', title: 'Select and move items' },
    { mode: 'text' as const, icon: 'T', label: 'Text', title: 'Add or edit text' },
    { mode: 'image' as const, icon: '🖼️', label: 'Image', title: 'Add images' },
    { mode: 'shape' as const, icon: '⬜', label: 'Shape', title: 'Draw shapes' },
  ];

  const shapeTypes = [
    { type: 'rectangle' as const, icon: '▭', label: 'Rectangle' },
    { type: 'circle' as const, icon: '○', label: 'Circle' },
    { type: 'line' as const, icon: '─', label: 'Line' },
    { type: 'arrow' as const, icon: '→', label: 'Arrow' },
    { type: 'highlight' as const, icon: '🖍️', label: 'Highlight' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Tools:</span>
        
        {/* Main Tools */}
        <div className="flex gap-1 border-r border-gray-300 pr-3">
          {tools.map((tool) => (
            <button
              key={tool.mode}
              onClick={() => setEditMode(tool.mode)}
              className={`
                px-3 py-2 rounded text-sm font-medium transition-colors
                ${editMode === tool.mode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
              title={tool.title}
            >
              <span className="text-lg">{tool.icon}</span>
              <span className="ml-1">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Shape Types (visible when shape mode is active) */}
        {editMode === 'shape' && (
          <div className="flex gap-1">
            {shapeTypes.map((shape) => (
              <button
                key={shape.type}
                onClick={() => setSelectedShapeType(shape.type)}
                className={`
                  px-3 py-2 rounded text-sm transition-colors
                  ${selectedShapeType === shape.type
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
                title={shape.label}
              >
                {shape.icon}
              </button>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="ml-auto text-sm text-gray-600 italic">
          {editMode === 'none' && 'Click to select and edit items'}
          {editMode === 'text' && 'Click on text to edit, or click empty area to add new text'}
          {editMode === 'image' && 'Click to upload and place an image'}
          {editMode === 'shape' && 'Click and drag to draw shape'}
        </div>
      </div>
    </div>
  );
}
