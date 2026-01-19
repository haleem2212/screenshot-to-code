'use client'

import { useState } from 'react'
import { useDesignStore } from '@/lib/store'
import ImageUpload from '@/components/ImageUpload'
import ChatInterface from '@/components/ChatInterface'
import MockupPreview from '@/components/MockupPreview'
import ExportModal from '@/components/ExportModal'
import { Sparkles, Code, RotateCcw } from 'lucide-react'

export default function Home() {
  const [showExportModal, setShowExportModal] = useState(false)
  const {
    originalImage,
    currentDesign,
    setOriginalImage,
    setCurrentDesign,
    addMessage,
    setIsProcessing,
    reset
  } = useDesignStore()

  const handleImageUpload = async (imageData: string) => {
    setOriginalImage(imageData)
    setIsProcessing(true)

    try {
      // Analyze the screenshot
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
      })

      const { analysis } = await response.json()
      setCurrentDesign(analysis)
      
      addMessage({
        role: 'assistant',
        content: 'I\'ve analyzed your screenshot! What would you like to change? You can ask me to modify colors, layout, add components, or anything else.'
      })
    } catch (error) {
      console.error('Analysis failed:', error)
      addMessage({
        role: 'assistant',
        content: 'Sorry, I had trouble analyzing that screenshot. Please try again or upload a different image.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSendMessage = async (message: string) => {
    addMessage({ role: 'user', content: message })
    setIsProcessing(true)

    try {
      const response = await fetch('/api/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentDesign,
          userMessage: message,
          image: originalImage
        })
      })

      const { design, explanation } = await response.json()
      setCurrentDesign(design)
      
      addMessage({
        role: 'assistant',
        content: explanation || 'I\'ve updated the design based on your request!'
      })
    } catch (error) {
      console.error('Adjustment failed:', error)
      addMessage({
        role: 'assistant',
        content: 'Sorry, I had trouble making that change. Can you try rephrasing your request?'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleExport = async (type: 'code' | 'prompt', platform: string): Promise<string> => {
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          design: currentDesign,
          exportType: type,
          platform,
          image: originalImage
        })
      })

      const { output } = await response.json()
      return output
    } catch (error) {
      console.error('Export failed:', error)
      throw error
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? This will clear your current design.')) {
      reset()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Screenshot to Code</h1>
                <p className="text-sm text-gray-400">Design with AI, export anywhere</p>
              </div>
            </div>
            {originalImage && (
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {!originalImage ? (
          /* Upload State */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">
                Turn Screenshots into Code
              </h2>
              <p className="text-xl text-gray-400 mb-2">
                Upload a screenshot, make AI adjustments, export to code or prompts
              </p>
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                  <span>Upload</span>
                </div>
                <div className="w-12 h-px bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">2</div>
                  <span>Adjust</span>
                </div>
                <div className="w-12 h-px bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">3</div>
                  <span>Export</span>
                </div>
              </div>
            </div>
            <ImageUpload onImageUpload={handleImageUpload} />
            
            {/* Features */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <Code className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">Export to Code</h3>
                <p className="text-gray-400 text-sm">
                  Get production-ready React Native, Flutter, or React code instantly
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <Sparkles className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-semibold text-lg mb-2">Export to Prompts</h3>
                <p className="text-gray-400 text-sm">
                  Generate perfect prompts for Lovable, v0, Bolt, Cursor, or Rork
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Editor State */
          <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Chat Panel */}
            <div className="lg:col-span-1 flex flex-col">
              <ChatInterface onSendMessage={handleSendMessage} />
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-2 flex flex-col">
              <MockupPreview image={originalImage} design={currentDesign} />
              
              {/* Export Buttons */}
              {currentDesign && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Export Design
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          design={currentDesign}
          image={originalImage}
          onExport={handleExport}
        />
      )}
    </main>
  )
}
