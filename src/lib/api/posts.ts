import { createClient } from '@/lib/supabase/server'
import type { Post, Locale } from '@/types'

/**
 * Get all published posts
 */
export async function getPosts(
  locale?: Locale,
  options?: {
    limit?: number
    category?: string
  }
): Promise<Post[]> {
  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (options?.category) {
    query = query.eq('category', options.category)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return (data as Post[]) || []
}

/**
 * Get post by slug
 */
export async function getPostBySlug(
  slug: string,
  locale?: Locale
): Promise<Post | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data as Post
}

/**
 * Get recent posts
 */
export async function getRecentPosts(
  limit: number = 3,
  locale?: Locale
): Promise<Post[]> {
  return getPosts(locale, { limit })
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(locale?: Locale): Promise<Post[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }

  return (data as Post[]) || []
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(
  category: string,
  locale?: Locale
): Promise<Post[]> {
  return getPosts(locale, { category })
}

/**
 * Get all post slugs (for static generation)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('is_published', true)

  if (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }

  return (data as { slug: string }[])?.map((p) => p.slug) || []
}

/**
 * Get unique post categories
 */
export async function getPostCategories(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('category')
    .eq('is_published', true)
    .not('category', 'is', null)

  if (error) {
    console.error('Error fetching post categories:', error)
    return []
  }

  // Get unique categories
  const categories = [...new Set((data as { category: string }[])?.map((p) => p.category).filter(Boolean))]
  return categories
}

/**
 * Increment post views
 * This should be called from a client component or API route
 */
export async function incrementPostViews(postId: string): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.rpc('increment_post_views', {
    post_id: postId,
  })

  if (error) {
    console.error('Error incrementing post views:', error)
  }
}

/**
 * Get post with author details
 */
export async function getPostWithAuthor(
  slug: string,
  locale?: Locale
): Promise<(Post & { author: { name: string; profile_image: string | null } | null }) | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      doctors:author_id (
        name,
        profile_image
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching post with author:', error)
    return null
  }

  const postData = data as any
  return {
    ...postData,
    author: postData.doctors,
  }
}
