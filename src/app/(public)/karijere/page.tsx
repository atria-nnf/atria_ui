import { Metadata } from 'next'
import { getActiveJobs, getCareersPageSettings } from '@/lib/api'
import { CareersPageClient } from './CareersPageClient'

export const metadata: Metadata = {
  title: 'Karijera',
  description: 'Pridružite se timu Poliklinike Atria. Pregledajte otvorene pozicije i prijavite se.',
}

export default async function CareersPage() {
  const [jobs, pageSettings] = await Promise.all([
    getActiveJobs(),
    getCareersPageSettings(),
  ])
  return <CareersPageClient jobs={jobs} pageSettings={pageSettings} />
}
