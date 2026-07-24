import HomePageClient from './HomePageClient'
import { getServices, getFeaturedServices } from '@/lib/api/services'
import { getDoctors } from '@/lib/api/doctors'
import { getTestimonials } from '@/lib/api/testimonials'
import { getHomepageSettings } from '@/lib/api/settings'
import { getRecentPosts } from '@/lib/api/posts'

export default async function HomePage() {
  const [services, doctors, testimonials, settings, posts] = await Promise.all([
    getFeaturedServices(),
    getDoctors(),
    getTestimonials(),
    getHomepageSettings(),
    getRecentPosts(3),
  ])

  // If no featured services, get all services
  const displayServices = services.length > 0 ? services : await getServices()

  return (
    <HomePageClient
      services={displayServices}
      doctors={doctors}
      testimonials={testimonials}
      settings={settings}
      posts={posts}
    />
  )
}
