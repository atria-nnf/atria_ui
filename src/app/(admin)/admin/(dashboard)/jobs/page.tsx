import Link from 'next/link'
import { getJobsAdmin, deleteJob, toggleJobActive } from '@/lib/api/admin/jobs'
import { Plus, Pencil, Briefcase, MapPin } from 'lucide-react'
import { DeleteButton, ToggleButton } from '@/components/admin/GenericActions'

export default async function JobsPage() {
  const items = await getJobsAdmin()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Karijere</h1>
          <p className="text-gray-600 mt-1">Upravljajte oglasima za posao</p>
        </div>
        <Link href="/admin/jobs/new" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-brand-color/90">
          <Plus className="w-4 h-4" />Novi oglas
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Pozicija</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Odjel</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tip</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Akcije</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500">Nema oglasa za posao</td></tr>
            ) : items.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <p className="font-medium text-gray-900">{item.title?.['hr-HR'] || ''}</p>
                  {item.location?.['hr-HR'] && <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location['hr-HR']}</p>}
                </td>
                <td className="px-4 py-4 text-gray-600">{item.department || '—'}</td>
                <td className="px-4 py-4">{item.employment_type ? <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">{item.employment_type}</span> : '—'}</td>
                <td className="px-4 py-4 text-center">
                  <ToggleButton id={item.id} active={item.is_active} action={toggleJobActive} activeLabel="Aktivan" inactiveLabel="Neaktivan" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/jobs/${item.id}`} className="p-2 text-gray-500 hover:text-brand-color hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></Link>
                    <DeleteButton id={item.id} name={item.title?.['hr-HR'] || 'ovaj oglas'} action={deleteJob} />
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
