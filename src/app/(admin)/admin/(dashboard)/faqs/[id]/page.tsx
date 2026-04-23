import { notFound } from 'next/navigation'
import { getFaqById } from '@/lib/api/admin/faqs'
import { FaqForm } from '../FaqForm'
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getFaqById(id)
  if (!item) notFound()
  return <FaqForm item={item} isEditing />
}
