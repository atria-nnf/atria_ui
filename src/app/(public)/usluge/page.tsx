import { Metadata } from 'next'
import { getServices } from '@/lib/api'
import { ServicesPageClient } from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'Usluge',
  description:
    'Pregledajte sve medicinske usluge Poliklinike Atria - od specijaliziranih pregleda do dijagnostike i preventive.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return <ServicesPageClient initialServices={services} />
}
