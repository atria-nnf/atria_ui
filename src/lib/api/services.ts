import { createClient } from '@/lib/supabase/server'
import type { Service, Locale, ServiceCategory } from '@/types'

/**
 * Get all services
 */
export async function getServices(locale?: Locale): Promise<Service[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return (data as Service[]) || []
}

/**
 * Get service by slug
 */
export async function getServiceBySlug(
  slug: string,
  locale?: Locale
): Promise<Service | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching service:', error)
    return null
  }

  return data as Service
}

/**
 * Get featured services
 */
export async function getFeaturedServices(locale?: Locale): Promise<Service[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_featured', true)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching featured services:', error)
    return []
  }

  return (data as Service[]) || []
}

/**
 * Get services by category
 */
export async function getServicesByCategory(
  category: ServiceCategory,
  locale?: Locale
): Promise<Service[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('category', category)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching services by category:', error)
    return []
  }

  return (data as Service[]) || []
}

/**
 * Get all service slugs (for static generation)
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from('services').select('slug')

  if (error) {
    console.error('Error fetching service slugs:', error)
    return []
  }

  return (data as { slug: string }[])?.map((s) => s.slug) || []
}

/**
 * Get services with their doctors
 */
export async function getServicesWithDoctors(locale?: Locale): Promise<
  (Service & { doctors: { id: string; name: string; slug: string }[] })[]
> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      service_doctors (
        doctors (
          id,
          name,
          slug
        )
      )
    `)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching services with doctors:', error)
    return []
  }

  // Transform the nested structure
  return (
    (data as any[])?.map((service) => ({
      ...service,
      doctors:
        service.service_doctors?.map((sd: { doctors: { id: string; name: string; slug: string } }) => sd.doctors) || [],
    })) || []
  )
}
