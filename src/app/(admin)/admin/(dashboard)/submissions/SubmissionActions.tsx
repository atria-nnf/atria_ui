'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Download, Loader2 } from 'lucide-react'
import { updateSubmissionStatus } from '@/lib/api/admin/submissions'

function StatusSelect({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status || 'new')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setValue(newStatus)
    setLoading(true)
    await updateSubmissionStatus(id, newStatus)
    setLoading(false)
    router.refresh()
  }

  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700 border-blue-200',
    read: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    responded: 'bg-green-100 text-green-700 border-green-200',
  }

  return (
    <select value={value} onChange={handleChange} disabled={loading} className={`px-2 py-1 text-xs font-medium rounded-full border cursor-pointer ${colors[value] || 'bg-gray-100'}`}>
      <option value="new">Nova</option>
      <option value="read">Pročitano</option>
      <option value="responded">Odgovoreno</option>
    </select>
  )
}

function ExportButton({ items }: { items: any[] }) {
  const exportCSV = () => {
    const headers = ['Ime', 'Email', 'Telefon', 'Usluga', 'Poruka', 'Status', 'Datum']
    const rows = items.map(i => [i.name, i.email, i.phone || '', i.service || '', i.message.replace(/"/g, '""'), i.status, new Date(i.created_at).toLocaleDateString('hr-HR')])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `poruke-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <button onClick={exportCSV} className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
      <Download className="w-4 h-4" />Izvezi CSV
    </button>
  )
}

export { StatusSelect, ExportButton }
