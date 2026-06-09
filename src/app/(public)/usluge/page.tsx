import { Metadata } from 'next'
import { getServices, getServicesPageSettings } from '@/lib/api'
import { ServicesPageClient } from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'Usluge',
  description:
    'Pregledajte sve medicinske usluge Poliklinike Atria - od specijaliziranih pregleda do dijagnostike i preventive.',
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getServicesPageSettings(),
  ])

  return <ServicesPageClient initialServices={services} settings={settings} />
}
