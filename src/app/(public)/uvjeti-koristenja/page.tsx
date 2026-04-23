import { Metadata } from 'next'
import { getTermsOfService } from '@/lib/api'
import { LegalPageClient } from '@/components/LegalPageClient'

export const metadata: Metadata = {
  title: 'Uvjeti korištenja',
  description: 'Uvjeti korištenja web stranice Poliklinike Atria.',
}

export default async function TermsOfServicePage() {
  const data = await getTermsOfService()
  return <LegalPageClient data={data} pageType="terms" />
}
