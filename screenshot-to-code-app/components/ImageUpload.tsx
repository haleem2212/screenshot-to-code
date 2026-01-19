'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload: (imageData: string) => void
  disabled?: boolean
}

export default function ImageUpload({ onImageUpload, disabled }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageUpload(result)
      }
      reader.readAsDataURL(file)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: false,
    disabled
  })

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
        transition-all duration-200
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-600 hover:border-primary/50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        {isDragActive ? (
          <Upload className="w-16 h-16 text-primary animate-bounce" />
        ) : (
          <ImageIcon className="w-16 h-16 text-gray-400" />
        )}
        <div>
          <p className="text-xl font-semibold mb-2">
            {isDragActive ? 'Drop your screenshot here' : 'Upload a screenshot'}
          </p>
          <p className="text-sm text-gray-400">
            Drag & drop or click to browse
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Supports PNG, JPG, JPEG, WEBP
          </p>
        </div>
      </div>
    </div>
  )
}
