import { Metadata } from 'next'
import { getPrivacyPolicy } from '@/lib/api'
import { LegalPageClient } from '@/components/LegalPageClient'

export const metadata: Metadata = {
  title: 'Pravila privatnosti',
  description: 'Pravila privatnosti Poliklinike Atria - kako prikupljamo i koristimo vaše podatke.',
}

export default async function PrivacyPolicyPage() {
  const data = await getPrivacyPolicy()
  return <LegalPageClient data={data} pageType="privacy" />
}
