import Link from 'next/link'
import { getFaqsAdmin, deleteFaq } from '@/lib/api/admin/faqs'
import { Plus, Pencil, GripVertical } from 'lucide-react'
import { DeleteButton } from '@/components/admin/GenericActions'

export default async function FaqsPage() {
  const items = await getFaqsAdmin()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ</h1>
          <p className="text-gray-600 mt-1">Upravljajte čestim pitanjima</p>
        </div>
        <Link href="/admin/faqs/new" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-brand-color/90">
          <Plus className="w-4 h-4" />Novo pitanje
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-10">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Pitanje</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Kategorija</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Akcije</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-gray-500">Nema pitanja</td></tr>
            ) : items.map((item: any, i: number) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-500"><GripVertical className="w-4 h-4 text-gray-400 inline mr-2" />{i + 1}</td>
                <td className="px-4 py-4">
                  <p className="font-medium text-gray-900">{item.question?.['hr-HR'] || ''}</p>
                  <p className="text-sm text-gray-500 truncate max-w-md">{item.answer?.['hr-HR'] || ''}</p>
                </td>
                <td className="px-4 py-4">{item.category ? <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">{item.category}</span> : '—'}</td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/faqs/${item.id}`} className="p-2 text-gray-500 hover:text-brand-color hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></Link>
                    <DeleteButton id={item.id} name="ovo pitanje" action={deleteFaq} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
