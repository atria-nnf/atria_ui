import { Metadata } from 'next'
import { getCookiePolicy } from '@/lib/api'
import { LegalPageClient } from '@/components/LegalPageClient'

export const metadata: Metadata = {
  title: 'Politika kolačića',
  description: 'Politika kolačića Poliklinike Atria - kako koristimo kolačiće na našoj web stranici.',
}

export default async function CookiePolicyPage() {
  const data = await getCookiePolicy()
  return <LegalPageClient data={data} pageType="cookies" />
}
