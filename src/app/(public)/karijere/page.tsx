import { Metadata } from 'next'
import { getActiveJobs } from '@/lib/api'
import { CareersPageClient } from './CareersPageClient'

export const metadata: Metadata = {
  title: 'Karijera',
  description: 'Pridružite se timu Poliklinike Atria. Pregledajte otvorene pozicije i prijavite se.',
}

export default async function CareersPage() {
  const jobs = await getActiveJobs()
  return <CareersPageClient jobs={jobs} />
}
