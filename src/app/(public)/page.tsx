import HomePageClient from './HomePageClient'
import { getServices, getFeaturedServices } from '@/lib/api/services'
import { getDoctors } from '@/lib/api/doctors'
import { getTestimonials } from '@/lib/api/testimonials'

export default async function HomePage() {
  const [services, doctors, testimonials] = await Promise.all([
    getFeaturedServices(),
    getDoctors(),
    getTestimonials(),
  ])

  // If no featured services, get all services
  const displayServices = services.length > 0 ? services : await getServices()

  return (
    <HomePageClient
      services={displayServices}
      doctors={doctors}
      testimonials={testimonials}
    />
  )
}
