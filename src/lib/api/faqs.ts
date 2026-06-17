import { createClient } from '@/lib/supabase/server'
import type { FAQ, Locale } from '@/types'

/**
 * Get all FAQs
 */
export async function getFAQs(
  locale?: Locale,
  category?: string
): Promise<FAQ[]> {
  const supabase = await createClient()

  let query = supabase
    .from('faqs')
    .select('*')
    .order('order_index', { ascending: true })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }

  return (data as FAQ[]) || []
}

/**
 * Get FAQs by category
 */
export async function getFAQsByCategory(
  category: string,
  locale?: Locale
): Promise<FAQ[]> {
  return getFAQs(locale, category)
}

/**
 * Get general FAQs (not linked to any specific service)
 * These are shown on the contact page
 */
export async function getGeneralFAQs(locale?: Locale): Promise<FAQ[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .is('service_id', null)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching general FAQs:', error)
    return []
  }

  return (data as FAQ[]) || []
}

/**
 * Get FAQs by service
 */
export async function getFAQsByService(
  serviceId: string,
  locale?: Locale
): Promise<FAQ[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('service_id', serviceId)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching FAQs by service:', error)
    return []
  }

  return (data as FAQ[]) || []
}

/**
 * Get all FAQ categories
 */
export async function getFAQCategories(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('faqs')
    .select('category')
    .not('category', 'is', null)

  if (error) {
    console.error('Error fetching FAQ categories:', error)
    return []
  }

  // Get unique categories
  const categories = [...new Set((data as { category: string }[])?.map((f) => f.category).filter(Boolean))]
  return categories
}
