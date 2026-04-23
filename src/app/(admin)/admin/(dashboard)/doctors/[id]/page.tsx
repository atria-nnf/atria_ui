import { notFound } from 'next/navigation'
import { getDoctorById } from '@/lib/api/admin/doctors'
import { DoctorForm } from '../DoctorForm'

interface EditDoctorPageProps {
  params: Promise<{ id: string }>
}

export default async function EditDoctorPage({ params }: EditDoctorPageProps) {
  const { id } = await params
  const doctor = await getDoctorById(id)

  if (!doctor) {
    notFound()
  }

  return <DoctorForm doctor={doctor} isEditing />
}
