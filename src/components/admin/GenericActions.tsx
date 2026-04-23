'use client'
import { useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export function DeleteButton({ id, name, action }: { id: string; name: string; action: (id: string) => Promise<{ error: string | null }> }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    const { error } = await action(id)
    setLoading(false)
    if (error) alert(`Greška: ${error}`)
    else { setIsOpen(false); router.refresh() }
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Potvrda brisanja</h3>
            <p className="mt-2 text-gray-600">Jeste li sigurni da želite obrisati &quot;{name}&quot;?</p>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setIsOpen(false)} disabled={loading} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Odustani</button>
              <button onClick={handleDelete} disabled={loading} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}Obriši
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function ToggleButton({ id, active, action, activeLabel, inactiveLabel, activeIcon, inactiveIcon, activeClass }: {
  id: string; active: boolean; action: (id: string, value: boolean) => Promise<{ error: string | null }>
  activeLabel?: string; inactiveLabel?: string; activeIcon?: ReactNode; inactiveIcon?: ReactNode; activeClass?: string
}) {
  const [loading, setLoading] = useState(false)
  const [isActive, setIsActive] = useState(active)
  const router = useRouter()

  const handleToggle = async () => {
    setLoading(true)
    const newValue = !isActive
    setIsActive(newValue)
    const { error } = await action(id, newValue)
    setLoading(false)
    if (error) { setIsActive(!newValue); alert(`Greška: ${error}`) }
    else router.refresh()
  }

  if (activeLabel) {
    return (
      <button onClick={handleToggle} disabled={loading} className={cn('px-2.5 py-1 text-xs font-medium rounded-full', isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600')}>
        {loading ? <Loader2 className="w-3 h-3 animate-spin inline" /> : isActive ? activeLabel : inactiveLabel}
      </button>
    )
  }

  return (
    <button onClick={handleToggle} disabled={loading} className={cn('p-2 rounded-lg transition-colors', isActive ? activeClass || 'text-green-600 bg-green-50' : 'text-gray-400 hover:bg-gray-100')}>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isActive ? activeIcon : inactiveIcon}
    </button>
  )
}
