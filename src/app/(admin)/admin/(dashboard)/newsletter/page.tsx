import { getNewsletterSubscribersAdmin, deleteNewsletterSubscriber } from '@/lib/api/admin/newsletter'
import { Clock } from 'lucide-react'
import { DeleteButton } from '@/components/admin/GenericActions'
import { ExportButton } from './NewsletterActions'
import type { NewsletterSubscriber } from '@/types'

const sourceLabels: Record<string, string> = { footer: 'Footer', blog: 'Blog' }

export default async function NewsletterPage() {
  const items = (await getNewsletterSubscribersAdmin()) as NewsletterSubscriber[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Newsletter</h1><p className="text-gray-600 mt-1">Pretplatnici na newsletter ({items.length})</p></div>
        <ExportButton items={items} />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Izvor</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Datum prijave</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Akcije</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-gray-500">Nema pretplatnika</td></tr>
            ) : items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4"><p className="font-medium text-gray-900">{item.email}</p></td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">{sourceLabels[item.source || ''] || item.source || '—'}</span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(item.created_at).toLocaleDateString('hr-HR')}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <DeleteButton id={item.id} name="ovog pretplatnika" action={deleteNewsletterSubscriber} />
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
