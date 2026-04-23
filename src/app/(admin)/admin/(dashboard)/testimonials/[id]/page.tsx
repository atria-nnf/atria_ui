import { notFound } from 'next/navigation'
import { getTestimonialById } from '@/lib/api/admin/testimonials'
import { TestimonialForm } from '../TestimonialForm'
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getTestimonialById(id)
  if (!item) notFound()
  return <TestimonialForm item={item} isEditing />
}
