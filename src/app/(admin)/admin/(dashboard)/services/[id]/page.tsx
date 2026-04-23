import { notFound } from 'next/navigation'
import { getServiceById } from '@/lib/api/admin/services'
import { ServiceForm } from '../ServiceForm'

interface EditServicePageProps {
  params: Promise<{ id: string }>
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params
  const service = await getServiceById(id)

  if (!service) {
    notFound()
  }

  return <ServiceForm service={service} isEditing />
}
