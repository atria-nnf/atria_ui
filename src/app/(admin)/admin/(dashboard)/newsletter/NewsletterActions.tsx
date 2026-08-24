'use client'
import { Download } from 'lucide-react'
import type { NewsletterSubscriber } from '@/types'

export function ExportButton({ items }: { items: NewsletterSubscriber[] }) {
  const exportCSV = () => {
    const headers = ['Email', 'Izvor', 'Datum']
    const rows = items.map(i => [i.email, i.source || '', new Date(i.created_at).toLocaleDateString('hr-HR')])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-pretplatnici-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <button onClick={exportCSV} className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
      <Download className="w-4 h-4" />Izvezi CSV
    </button>
  )
}
