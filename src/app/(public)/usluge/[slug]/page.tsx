import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/api'
import { getDoctorsByService } from '@/lib/api'
import { getTestimonialsByService } from '@/lib/api'
import { getPostsByService } from '@/lib/api'
import { getFAQsByService } from '@/lib/api'
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
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const [doctors, testimonials, relatedPosts, faqs] = await Promise.all([
    getDoctorsByService(service.id),
    getTestimonialsByService(service.id),
    getPostsByService(service.id),
    getFAQsByService(service.id),
  ])

  return (
    <ServiceDetailsClient
      service={service}
      doctors={doctors}
      testimonials={testimonials}
      relatedPosts={relatedPosts}
      faqs={faqs}
    />
  )
}
