import Link from 'next/link'
import { getServicesAdmin } from '@/lib/api/admin/services'
import { Plus, Pencil, GripVertical, ExternalLink } from 'lucide-react'
import { DeleteButton, FeaturedToggle } from './ServiceActions'

const categoryLabels: Record<string, string> = {
  specialist: 'Specijalistički',
  diagnostics: 'Dijagnostika',
  preventive: 'Preventiva',
  aesthetic: 'Estetika',
}

export default async function ServicesPage() {
  const services = await getServicesAdmin()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usluge</h1>
          <p className="text-gray-600 mt-1">
            Upravljajte uslugama poliklinike
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-brand-color/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova usluga
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-10">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Naziv
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kategorija
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Istaknuto
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Akcije
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    Nema usluga. Kliknite &quot;Nova usluga&quot; da dodate prvu.
                  </td>
                </tr>
              ) : (
                services.map((service, index) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {service.featured_image ? (
                          <img
                            src={service.featured_image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            —
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {service.name?.['hr-HR'] || service.name?.['en-US'] || 'Bez naziva'}
                          </p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {service.short_description?.['hr-HR'] || ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {service.category ? (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                          {categoryLabels[service.category] || service.category}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {service.slug}
                      </code>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <FeaturedToggle
                        id={service.id}
                        featured={service.is_featured}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/usluge/${service.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Pogledaj na stranici"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/services/${service.id}`}
                          className="p-2 text-gray-500 hover:text-brand-color hover:bg-blue-50 rounded-lg transition-colors"
                          title="Uredi"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteButton
                          id={service.id}
                          name={service.name?.['hr-HR'] || 'ovu uslugu'}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
