import { Metadata } from 'next'
import { getDoctors, getDoctorsPageSettings } from '@/lib/api'
import { DoctorsPageClient } from './DoctorsPageClient'

export const metadata: Metadata = {
  title: 'Liječnici',
  description:
    'Upoznajte naše stručnjake - iskusne liječnike s ljudskim pristupom u Poliklinici Atria.',
}

export default async function DoctorsPage() {
  const [doctors, pageSettings] = await Promise.all([
    getDoctors(),
    getDoctorsPageSettings(),
  ])

  return <DoctorsPageClient initialDoctors={doctors} pageSettings={pageSettings} />
}
