'use client'
import { useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from './ui/Button'

interface GenericFormProps {
  title: string; subtitle: string; backHref: string; isEditing?: boolean
  onSubmit: () => Promise<{ error: string | null }>; children: ReactNode
}

export function GenericForm({ title, subtitle, backHref, isEditing, onSubmit, children }: GenericFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const result = await onSubmit()
    setLoading(false)
    if (result.error) setError(result.error)
    else { router.push(backHref); router.refresh() }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={backHref} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
          <div><h1 className="text-2xl font-bold text-gray-900">{title}</h1><p className="text-gray-600 mt-1">{subtitle}</p></div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={backHref} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Odustani</Link>
          <Button type="submit" loading={loading}><Save className="w-4 h-4" />{isEditing ? 'Spremi' : 'Kreiraj'}</Button>
        </div>
      </div>
      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
      {children}
    </form>
  )
}
