import { Metadata } from 'next'
import { getDoctors } from '@/lib/api'
import { DoctorsPageClient } from './DoctorsPageClient'

export const metadata: Metadata = {
  title: 'Liječnici',
  description:
    'Upoznajte naše stručnjake - iskusne liječnike s ljudskim pristupom u Poliklinici Atria.',
}

export default async function DoctorsPage() {
  const doctors = await getDoctors()

  return <DoctorsPageClient initialDoctors={doctors} />
}
