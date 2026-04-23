import Link from 'next/link'
import { getGalleryAdmin, deleteGalleryItem } from '@/lib/api/admin/gallery'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { DeleteButton } from '@/components/admin/GenericActions'

export default async function GalleryPage() {
  const items = await getGalleryAdmin()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galerija</h1>
          <p className="text-gray-600 mt-1">Upravljajte slikama galerije</p>
        </div>
        <Link href="/admin/gallery/new" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-brand-color/90">
          <Plus className="w-4 h-4" />Nova slika
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl p-12 text-center text-gray-500">Nema slika u galeriji</div>
        ) : items.map((item: any) => (
          <div key={item.id} className="group relative bg-white rounded-xl shadow-sm overflow-hidden">
            {item.image_url ? (
              <img src={item.image_url} alt={item.caption?.['hr-HR'] || 'Gallery image'} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">Nema slike</div>
            )}
            <div className="p-3">
              <p className="text-sm text-gray-600 truncate">{item.caption?.['hr-HR'] || 'Bez opisa'}</p>
              {item.category && <span className="text-xs text-gray-500">{item.category}</span>}
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Link href={`/admin/gallery/${item.id}`} className="p-2 bg-white rounded-lg shadow hover:bg-gray-50"><Pencil className="w-4 h-4 text-gray-600" /></Link>
              <DeleteButton id={item.id} name="ovu sliku" action={deleteGalleryItem} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
