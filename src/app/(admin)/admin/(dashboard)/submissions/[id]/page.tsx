import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSubmissionById } from '@/lib/api/admin/submissions'
import { ArrowLeft, Mail, Phone, Calendar, Tag } from 'lucide-react'
import { StatusSelect } from '../SubmissionActions'

export default async function SubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getSubmissionById(id)
  if (!item) notFound()

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/submissions" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
        <div><h1 className="text-2xl font-bold text-gray-900">Detalji poruke</h1></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{item.email}</span>
              {item.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{item.phone}</span>}
            </div>
          </div>
          <StatusSelect id={item.id} status={item.status} />
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(item.created_at).toLocaleString('hr-HR')}</span>
          {item.service && <span className="flex items-center gap-1"><Tag className="w-4 h-4" />{item.service}</span>}
        </div>

        <div className="pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Poruka:</h3>
          <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">{item.message}</p>
        </div>

        <div className="pt-4 flex gap-3">
          <a href={`mailto:${item.email}`} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-brand-color/90">
            <Mail className="w-4 h-4" />Odgovori emailom
          </a>
        </div>
      </div>
    </div>
  )
}
