import { notFound } from 'next/navigation'
import { getJobById } from '@/lib/api/admin/jobs'
import { JobForm } from '../JobForm'
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getJobById(id)
  if (!item) notFound()
  return <JobForm item={item} isEditing />
}
