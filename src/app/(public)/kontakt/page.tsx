import { Metadata } from 'next'
import { getContactInfo, getServices, getFAQsByCategory, getContactPageSettings } from '@/lib/api'
import { ContactPageClient } from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktirajte Polikliniku Atria - telefon, email, adresa i kontakt forma. Tu smo za vas.',
}

export default async function ContactPage() {
  const [contactInfo, services, faqs, pageSettings] = await Promise.all([
    getContactInfo(),
    getServices(),
    getFAQsByCategory('general'),
    getContactPageSettings(),
  ])

  return <ContactPageClient contactInfo={contactInfo} services={services} faqs={faqs} pageSettings={pageSettings} />
}
