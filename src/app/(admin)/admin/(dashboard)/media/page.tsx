'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, Trash2, Copy, Check, FolderOpen, Image, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/admin/ui/Button'

type FileItem = { name: string; id: string; created_at: string }

export default function MediaPage() {
  const [bucket, setBucket] = useState('images')
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const bucketUrl = supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/${bucket}/` : ''

  const loadFiles = async () => {
    setLoading(true)
    const { data } = await supabase.storage.from(bucket).list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })
    setFiles((data || []).filter(f => f.name !== '.emptyFolderPlaceholder') as FileItem[])
    setLoading(false)
  }

  useEffect(() => { loadFiles() }, [bucket])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const ext = file.name.split('.').pop()
      const name = `${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage.from(bucket).upload(name, file)
      if (uploadError) {
        setError(`Greška pri učitavanju: ${uploadError.message}`)
        return
      }
      loadFiles()
    } catch (err) {
      setError('Neočekivana greška pri učitavanju')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (name: string) => {
    if (!confirm(`Obriši ${name}?`)) return
    setError(null)
    try {
      const { error: deleteError } = await supabase.storage.from(bucket).remove([name])
      if (deleteError) {
        setError(`Greška pri brisanju: ${deleteError.message}`)
        return
      }
      loadFiles()
    } catch (err) {
      setError('Neočekivana greška pri brisanju')
    }
  }

  const copyUrl = (name: string) => {
    navigator.clipboard.writeText(bucketUrl + name)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Mediji</h1><p className="text-gray-600 mt-1">Upravljajte datotekama</p></div>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-brand-color/90 cursor-pointer">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Učitavanje...' : 'Učitaj'}
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*,video/*" />
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">&times;</button>
        </div>
      )}

      <div className="flex gap-2">
        {['images', 'videos', 'documents'].map(b => (
          <button key={b} onClick={() => setBucket(b)} className={`px-4 py-2 rounded-lg text-sm font-medium ${bucket === b ? 'bg-brand-color text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            <FolderOpen className="w-4 h-4 inline mr-2" />{b}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
      ) : files.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-500">Nema datoteka u ovom bucketu</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map(file => (
            <div key={file.name} className="group relative bg-white rounded-xl shadow-sm overflow-hidden">
              {bucket === 'images' ? (
                <img src={bucketUrl + file.name} alt={`Media file: ${file.name}`} className="w-full h-32 object-cover" />
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center"><Image className="w-8 h-8 text-gray-400" /></div>
              )}
              <div className="p-2">
                <p className="text-xs text-gray-600 truncate" title={file.name}>{file.name}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button onClick={() => copyUrl(file.name)} className="p-1.5 bg-white rounded-lg shadow hover:bg-gray-50">
                  {copied === file.name ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-gray-600" />}
                </button>
                <button onClick={() => handleDelete(file.name)} className="p-1.5 bg-white rounded-lg shadow hover:bg-red-50">
                  <Trash2 className="w-3 h-3 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
