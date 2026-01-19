'use client'

import { useState } from 'react'
import { X, Copy, Check, Download, Code, Sparkles } from 'lucide-react'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  design: any
  image: string | null
  onExport: (type: 'code' | 'prompt', platform: string) => Promise<string>
}

export default function ExportModal({ isOpen, onClose, design, image, onExport }: ExportModalProps) {
  const [exportType, setExportType] = useState<'code' | 'prompt'>('prompt')
  const [platform, setPlatform] = useState('lovable')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    try {
      const result = await onExport(exportType, platform)
      setOutput(result)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = exportType === 'code' ? `component.${platform === 'flutter' ? 'dart' : 'tsx'}` : `prompt-${platform}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">Export Design</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {!output ? (
            <div className="space-y-6">
              {/* Export Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Export Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setExportType('prompt')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      exportType === 'prompt'
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Sparkles className={`w-8 h-8 mb-2 ${exportType === 'prompt' ? 'text-primary' : 'text-gray-400'}`} />
                    <h3 className="font-semibold text-white mb-1">AI Prompt</h3>
                    <p className="text-sm text-gray-400">For Lovable, v0, Bolt, etc.</p>
                  </button>
                  <button
                    onClick={() => setExportType('code')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      exportType === 'code'
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Code className={`w-8 h-8 mb-2 ${exportType === 'code' ? 'text-primary' : 'text-gray-400'}`} />
                    <h3 className="font-semibold text-white mb-1">Direct Code</h3>
                    <p className="text-sm text-gray-400">React Native, Flutter, etc.</p>
                  </button>
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  {exportType === 'prompt' ? 'Target Platform' : 'Framework'}
                </label>
                {exportType === 'prompt' ? (
                  <div className="grid grid-cols-3 gap-3">
                    {['lovable', 'v0', 'bolt', 'cursor', 'rork'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`p-3 rounded-lg border transition-all ${
                          platform === p
                            ? 'border-primary bg-primary/10 text-white'
                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {['react-native', 'flutter', 'react'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`p-3 rounded-lg border transition-all ${
                          platform === p
                            ? 'border-primary bg-primary/10 text-white'
                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        {p.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Generating...' : 'Generate Export'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Output Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {exportType === 'prompt' ? `Prompt for ${platform}` : `${platform} Code`}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {exportType === 'prompt' 
                      ? 'Copy and paste this into your AI coding tool'
                      : 'Ready to use in your project'
                    }
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Output Content */}
              <div className="bg-gray-950 rounded-lg p-4 max-h-[400px] overflow-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {output}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setOutput('')}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                >
                  Generate Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
