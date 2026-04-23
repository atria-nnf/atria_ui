import { createClient } from '@/lib/supabase/server'
import type { GalleryImage } from '@/types'

/**
 * Get all gallery images
 */
export async function getGalleryImages(
  category?: string
): Promise<GalleryImage[]> {
  const supabase = await createClient()

  let query = supabase
    .from('gallery')
    .select('*')
    .order('order_index', { ascending: true })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching gallery images:', error)
    return []
  }

  return (data as GalleryImage[]) || []
}

/**
 * Get featured gallery images
 */
export async function getFeaturedGalleryImages(): Promise<GalleryImage[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('is_featured', true)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching featured gallery images:', error)
    return []
  }

  return (data as GalleryImage[]) || []
}

/**
 * Get gallery images by category
 */
export async function getGalleryByCategory(
  category: string
): Promise<GalleryImage[]> {
  return getGalleryImages(category)
}

/**
 * Get all gallery categories
 */
export async function getGalleryCategories(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('gallery')
    .select('category')
    .not('category', 'is', null)

  if (error) {
    console.error('Error fetching gallery categories:', error)
    return []
  }

  // Get unique categories
  const categories = [...new Set((data as { category: string }[])?.map((g) => g.category).filter(Boolean))]
  return categories
}
