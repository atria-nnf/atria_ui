import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/api'
import { getDoctors } from '@/lib/api'
import { getTestimonialsByService } from '@/lib/api'
import { getLocalizedContent } from '@/lib/utils/locale'
import { ServiceDetailsClient } from './ServiceDetailsClient'

interface Props {
  params: Promise<{ slug: string }>
}

// Dynamic page - services loaded at request time
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Usluga nije pronađena',
    }
  }

  const name = getLocalizedContent(service.name, 'hr-HR')
  const description = getLocalizedContent(service.description, 'hr-HR')

  return {
    title: name,
    description: description || `Saznajte više o usluzi ${name} u Poliklinici Atria.`,
  }
}

export default async function ServiceDetailsPage({ params }: Props) {
  const { slug } = await params
  const [service, doctors, testimonials] = await Promise.all([
    getServiceBySlug(slug),
    getDoctors(),
    getServiceBySlug(slug).then((s) => (s ? getTestimonialsByService(s.id) : [])),
  ])

  if (!service) {
    notFound()
  }

  return (
    <ServiceDetailsClient
      service={service}
      doctors={doctors}
      testimonials={testimonials}
    />
  )
}
