'use client'

import { useRef } from 'react'
import { Download, ZoomIn, ZoomOut } from 'lucide-react'
import { toPng } from 'html-to-image'

interface MockupPreviewProps {
  image: string | null
  design: any
}

export default function MockupPreview({ image, design }: MockupPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!previewRef.current) return
    
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 2
      })
      
      const link = document.createElement('a')
      link.download = 'mockup.png'
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Failed to download:', error)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h3 className="font-semibold text-white">Live Preview</h3>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            title="Download mockup"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-8 bg-gray-950">
        <div className="max-w-md mx-auto">
          <div
            ref={previewRef}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ aspectRatio: '9/19' }}
          >
            {image ? (
              <img
                src={image}
                alt="Design preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <p>No preview available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      {design && (
        <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
          <p>Design structure loaded</p>
        </div>
      )}
    </div>
  )
}
