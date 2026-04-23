import { notFound } from 'next/navigation'
import { getGalleryItemById } from '@/lib/api/admin/gallery'
import { GalleryForm } from '../GalleryForm'
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getGalleryItemById(id)
  if (!item) notFound()
  return <GalleryForm item={item} isEditing />
}
