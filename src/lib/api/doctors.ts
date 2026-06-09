import { createClient } from '@/lib/supabase/server'
import type { Doctor, Locale } from '@/types'

/**
 * Get all doctors
 */
export async function getDoctors(locale?: Locale): Promise<Doctor[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching doctors:', error)
    return []
  }

  return (data as Doctor[]) || []
}

/**
 * Get doctor by slug
 */
export async function getDoctorBySlug(
  slug: string,
  locale?: Locale
): Promise<Doctor | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching doctor:', error)
    return null
  }

  return data as Doctor
}

/**
 * Get featured doctors
 */
export async function getFeaturedDoctors(locale?: Locale): Promise<Doctor[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('is_featured', true)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching featured doctors:', error)
    return []
  }

  return (data as Doctor[]) || []
}

/**
 * Get doctors by specialty (searching in JSONB field)
 */
export async function getDoctorsBySpecialty(
  specialty: string,
  locale: Locale = 'hr-HR'
): Promise<Doctor[]> {
  const supabase = await createClient()

  // Search in the localized specialty field
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .contains('specialty', { [locale]: specialty })
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching doctors by specialty:', error)
    return []
  }

  return (data as Doctor[]) || []
}

/**
 * Get all doctor slugs (for static generation)
 */
export async function getAllDoctorSlugs(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from('doctors').select('slug')

  if (error) {
    console.error('Error fetching doctor slugs:', error)
    return []
  }

  return (data as { slug: string }[])?.map((d) => d.slug) || []
}

/**
 * Get doctors by service ID
 */
export async function getDoctorsByService(serviceId: string): Promise<Doctor[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('service_doctors')
    .select(`
      doctors (*)
    `)
    .eq('service_id', serviceId)

  if (error) {
    console.error('Error fetching doctors by service:', error)
    return []
  }

  // Extract doctors from the join result
  return (data as any[])?.map((sd) => sd.doctors).filter(Boolean) || []
}

/**
 * Get doctors with their services
 */
export async function getDoctorsWithServices(locale?: Locale): Promise<
  (Doctor & { services: { id: string; name: object; slug: string }[] })[]
> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('doctors')
    .select(`
      *,
      service_doctors (
        services (
          id,
          name,
          slug
        )
      )
    `)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching doctors with services:', error)
    return []
  }

  // Transform the nested structure
  return (
    (data as any[])?.map((doctor) => ({
      ...doctor,
      services:
        doctor.service_doctors?.map((sd: { services: { id: string; name: object; slug: string } }) => sd.services) || [],
    })) || []
  )
}
