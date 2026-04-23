import { createClient } from '@/lib/supabase/server'
import type { Testimonial, Locale } from '@/types'

/**
 * Get approved testimonials
 */
export async function getTestimonials(
  locale?: Locale,
  featured: boolean = false
): Promise<Testimonial[]> {
  const supabase = await createClient()

  let query = supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (featured) {
    query = query.eq('is_featured', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }

  return (data as Testimonial[]) || []
}

/**
 * Get featured testimonials
 */
export async function getFeaturedTestimonials(
  locale?: Locale
): Promise<Testimonial[]> {
  return getTestimonials(locale, true)
}

/**
 * Get testimonials by service
 */
export async function getTestimonialsByService(
  serviceId: string,
  locale?: Locale
): Promise<Testimonial[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('service_id', serviceId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching testimonials by service:', error)
    return []
  }

  return (data as Testimonial[]) || []
}

/**
 * Get testimonials with service details
 */
export async function getTestimonialsWithServices(
  locale?: Locale
): Promise<(Testimonial & { service: { name: object; slug: string } | null })[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('testimonials')
    .select(`
      *,
      services:service_id (
        name,
        slug
      )
    `)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching testimonials with services:', error)
    return []
  }

  return (
    (data as any[])?.map((t) => ({
      ...t,
      service: t.services,
    })) || []
  )
}
