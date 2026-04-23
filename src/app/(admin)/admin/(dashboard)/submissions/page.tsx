import Link from 'next/link'
import { getSubmissionsAdmin, deleteSubmission, updateSubmissionStatus } from '@/lib/api/admin/submissions'
import { Mail, Eye, Clock, Phone, Download } from 'lucide-react'
import { DeleteButton } from '@/components/admin/GenericActions'
import { StatusSelect, ExportButton } from './SubmissionActions'

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-yellow-100 text-yellow-700',
  responded: 'bg-green-100 text-green-700',
}
const statusLabels: Record<string, string> = { new: 'Nova', read: 'Pročitano', responded: 'Odgovoreno' }

export default async function SubmissionsPage() {
  const items = await getSubmissionsAdmin()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Poruke</h1><p className="text-gray-600 mt-1">Kontakt forme i upiti</p></div>
        <ExportButton items={items} />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Pošiljatelj</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Poruka</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Datum</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Akcije</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500">Nema poruka</td></tr>
            ) : items.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.email}</p>
                  {item.phone && <p className="text-sm text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" />{item.phone}</p>}
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-gray-600 max-w-md truncate">{item.message}</p>
                  {item.service && <span className="text-xs text-gray-400">Usluga: {item.service}</span>}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(item.created_at).toLocaleDateString('hr-HR')}</div>
                </td>
                <td className="px-4 py-4 text-center">
                  <StatusSelect id={item.id} status={item.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/submissions/${item.id}`} className="p-2 text-gray-500 hover:text-brand-color hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></Link>
                    <DeleteButton id={item.id} name="ovu poruku" action={deleteSubmission} />
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
