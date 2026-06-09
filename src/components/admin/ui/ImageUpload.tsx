'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { uploadImage, getImageUrl } from '@/lib/utils/image'
import { cn } from '@/lib/utils/cn'

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  label?: string
  hint?: string
  bucket?: string
  folder?: string
  className?: string
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto'
}

export function ImageUpload({
  value,
  onChange,
  label,
  hint,
  bucket = 'images',
  folder = '',
  className,
  aspectRatio = 'video',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    auto: 'min-h-[120px]',
  }

  const handleUpload = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Molimo odaberite sliku')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Slika mora biti manja od 5MB')
      return
    }

    setUploading(true)
    setError(null)

    const supabase = createClient()
    const result = await uploadImage(supabase, file, bucket, folder)

    setUploading(false)

    if (result.error) {
      setError(result.error)
    } else if (result.path) {
      onChange(result.path)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleRemove = () => {
    onChange('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const imageUrl = getImageUrl(value)

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        className={cn(
          'relative rounded-xl border-2 border-dashed transition-all overflow-hidden',
          aspectClasses[aspectRatio],
          dragActive
            ? 'border-orange-400 bg-orange-50'
            : value
            ? 'border-gray-200 bg-gray-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400',
          uploading && 'pointer-events-none'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {value && imageUrl ? (
          // Show uploaded image
          <div className="relative w-full h-full group">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Upload className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          // Show upload area
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                <span className="text-sm">Uploading...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-8 h-8" />
                <span className="text-sm font-medium">
                  Klikni ili povuci sliku
                </span>
                <span className="text-xs text-gray-400">
                  PNG, JPG, WebP do 5MB
                </span>
              </>
            )}
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {hint && !error && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
