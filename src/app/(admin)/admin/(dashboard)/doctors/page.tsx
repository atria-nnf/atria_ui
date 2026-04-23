import Link from 'next/link'
import { getDoctorsAdmin } from '@/lib/api/admin/doctors'
import { Plus, Pencil, ExternalLink, GripVertical } from 'lucide-react'
import { DeleteButton, FeaturedToggle } from './DoctorActions'

export default async function DoctorsPage() {
  const doctors = await getDoctorsAdmin()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Liječnici</h1>
          <p className="text-gray-600 mt-1">
            Upravljajte liječnicima poliklinike
          </p>
        </div>
        <Link
          href="/admin/doctors/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-brand-color/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novi liječnik
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
                  Liječnik
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Specijalizacija
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kontakt
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
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    Nema liječnika. Kliknite &quot;Novi liječnik&quot; da dodate prvog.
                  </td>
                </tr>
              ) : (
                doctors.map((doctor, index) => (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {doctor.profile_image ? (
                          <img
                            src={doctor.profile_image}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover bg-gray-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium">
                            {doctor.name?.charAt(0) || '?'}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{doctor.name}</p>
                          <p className="text-sm text-gray-500">
                            {doctor.title?.['hr-HR'] || ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-700">
                        {doctor.specialty?.['hr-HR'] || <span className="text-gray-400">—</span>}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        {doctor.email && (
                          <p className="text-gray-600">{doctor.email}</p>
                        )}
                        {doctor.phone && (
                          <p className="text-gray-500">{doctor.phone}</p>
                        )}
                        {!doctor.email && !doctor.phone && (
                          <span className="text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <FeaturedToggle
                        id={doctor.id}
                        featured={doctor.is_featured}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/lijecnici#${doctor.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Pogledaj na stranici"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/doctors/${doctor.id}`}
                          className="p-2 text-gray-500 hover:text-brand-color hover:bg-blue-50 rounded-lg transition-colors"
                          title="Uredi"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteButton
                          id={doctor.id}
                          name={doctor.name || 'ovog liječnika'}
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
