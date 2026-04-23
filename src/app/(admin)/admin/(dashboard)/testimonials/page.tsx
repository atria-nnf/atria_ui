import Link from 'next/link'
import { getTestimonialsAdmin, deleteTestimonial, toggleTestimonialApproved } from '@/lib/api/admin/testimonials'
import { Plus, Pencil, Trash2, Star, CheckCircle, XCircle } from 'lucide-react'
import { DeleteButton, ToggleButton } from '@/components/admin/GenericActions'

export default async function TestimonialsPage() {
  const items = await getTestimonialsAdmin()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Svjedočanstva</h1>
          <p className="text-gray-600 mt-1">Upravljajte recenzijama pacijenata</p>
        </div>
        <Link href="/admin/testimonials/new" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-brand-color/90">
          <Plus className="w-4 h-4" />Novo svjedočanstvo
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Autor</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sadržaj</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Ocjena</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Odobreno</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Akcije</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500">Nema svjedočanstava</td></tr>
            ) : items.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium text-gray-900">{item.author_name}</td>
                <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">{item.content?.['hr-HR'] || ''}</td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center gap-1">{item.rating}<Star className="w-4 h-4 text-yellow-500 fill-current" /></span>
                </td>
                <td className="px-4 py-4 text-center">
                  <ToggleButton id={item.id} active={item.is_approved} action={toggleTestimonialApproved} activeIcon={<CheckCircle className="w-4 h-4" />} inactiveIcon={<XCircle className="w-4 h-4" />} activeClass="text-green-600 bg-green-50" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/testimonials/${item.id}`} className="p-2 text-gray-500 hover:text-brand-color hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></Link>
                    <DeleteButton id={item.id} name={item.author_name} action={deleteTestimonial} />
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
