'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Undo, Redo, Image as ImageIcon, Link, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { uploadImage, getImageUrl } from '@/lib/utils/image'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
  imageFolder?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = '',
  className,
  minHeight = '150px',
  imageFolder = 'posts',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isInternalChange = useRef(false)
  const [uploading, setUploading] = useState(false)

  // Sync external value changes to editor
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || ''
      }
    }
    isInternalChange.current = false
  }, [value])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }, [handleInput])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle Ctrl+B for bold
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') {
        e.preventDefault()
        execCommand('bold')
      } else if (e.key === 'i') {
        e.preventDefault()
        execCommand('italic')
      }
    }
  }, [execCommand])

  // Handle image upload
  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Molimo odaberite sliku')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Slika mora biti manja od 5MB')
      return
    }

    setUploading(true)
    const supabase = createClient()
    const result = await uploadImage(supabase, file, 'images', imageFolder)
    setUploading(false)

    if (result.error) {
      alert(result.error)
      return
    }

    if (result.path) {
      const imageUrl = getImageUrl(result.path)
      if (imageUrl) {
        // Insert image at cursor position
        const img = `<img src="${imageUrl}" alt="" class="max-w-full h-auto rounded-lg my-4" />`
        execCommand('insertHTML', img)
      }
    }
  }, [imageFolder, execCommand])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
    // Reset input so same file can be selected again
    e.target.value = ''
  }, [handleImageUpload])

  // Handle paste with images
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        e.preventDefault()
        const file = items[i].getAsFile()
        if (file) {
          handleImageUpload(file)
        }
        return
      }
    }
  }, [handleImageUpload])

  // Insert link
  const insertLink = useCallback(() => {
    const url = prompt('Unesite URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }, [execCommand])

  const ToolbarButton = ({
    onClick,
    icon: Icon,
    title
  }: {
    onClick: () => void
    icon: React.ElementType
    title: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  )

  return (
    <div className={cn('border border-gray-300 rounded-lg overflow-hidden', className)}>
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200 flex-wrap">
        <ToolbarButton
          onClick={() => execCommand('bold')}
          icon={Bold}
          title="Podebljano (Ctrl+B)"
        />
        <ToolbarButton
          onClick={() => execCommand('italic')}
          icon={Italic}
          title="Kurziv (Ctrl+I)"
        />
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => execCommand('formatBlock', 'h2')}
          icon={Heading2}
          title="Naslov 2"
        />
        <ToolbarButton
          onClick={() => execCommand('formatBlock', 'h3')}
          icon={Heading3}
          title="Naslov 3"
        />
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => execCommand('insertUnorderedList')}
          icon={List}
          title="Lista"
        />
        <ToolbarButton
          onClick={() => execCommand('insertOrderedList')}
          icon={ListOrdered}
          title="Numerirana lista"
        />
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={insertLink}
          icon={Link}
          title="Umetni link"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Umetni sliku"
          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImageIcon className="w-4 h-4" />
          )}
        </button>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => execCommand('undo')}
          icon={Undo}
          title="Poništi"
        />
        <ToolbarButton
          onClick={() => execCommand('redo')}
          icon={Redo}
          title="Ponovi"
        />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className={cn(
          'px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset',
          'prose prose-sm max-w-none',
          '[&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400',
          '[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2',
          '[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1',
          '[&_p]:my-2',
          '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2',
          '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2',
          '[&_li]:my-1',
          '[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4',
          '[&_a]:text-orangeCTA [&_a]:underline'
        )}
        style={{ minHeight }}
        suppressContentEditableWarning
      />

      {uploading && (
        <div className="px-3 py-2 bg-orange-50 text-orange-700 text-sm border-t border-orange-200">
          Učitavanje slike...
        </div>
      )}
    </div>
  )
}
