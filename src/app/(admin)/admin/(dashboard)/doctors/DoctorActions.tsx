'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Star, Loader2 } from 'lucide-react'
import { deleteDoctor, toggleDoctorFeatured } from '@/lib/api/admin/doctors'
import { cn } from '@/lib/utils/cn'

function DeleteButton({ id, name }: { id: string; name: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    const { error } = await deleteDoctor(id)
    setLoading(false)

    if (error) {
      alert(`Greška: ${error}`)
    } else {
      setIsOpen(false)
      router.refresh()
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Obriši"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">
              Obriši liječnika
            </h3>
            <p className="mt-2 text-gray-600">
              Jeste li sigurni da želite obrisati liječnika &quot;{name}&quot;? Ova
              akcija se ne može poništiti.
            </p>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Odustani
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Obriši
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FeaturedToggle({ id, featured }: { id: string; featured: boolean }) {
  const [loading, setLoading] = useState(false)
  const [isFeatured, setIsFeatured] = useState(featured)
  const router = useRouter()

  const handleToggle = async () => {
    setLoading(true)
    const newValue = !isFeatured
    setIsFeatured(newValue)

    const { error } = await toggleDoctorFeatured(id, newValue)
    setLoading(false)

    if (error) {
      setIsFeatured(!newValue)
      alert(`Greška: ${error}`)
    } else {
      router.refresh()
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={cn(
        'p-2 rounded-lg transition-colors',
        isFeatured
          ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
      )}
      title={isFeatured ? 'Ukloni iz istaknutih' : 'Označi kao istaknuto'}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Star className={cn('w-4 h-4', isFeatured && 'fill-current')} />
      )}
    </button>
  )
}

export { DeleteButton, FeaturedToggle }
