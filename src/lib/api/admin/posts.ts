'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Post } from '@/types'

type PostInsert = Omit<Post, 'id' | 'created_at' | 'updated_at' | 'views'>
type PostUpdate = Partial<PostInsert>

/**
 * Create a new post
 */
export async function createPost(data: PostInsert): Promise<{ data: Post | null; error: string | null }> {
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      ...data,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')

  return { data: post as Post, error: null }
}

/**
 * Update a post
 */
export async function updatePost(
  id: string,
  data: PostUpdate
): Promise<{ data: Post | null; error: string | null }> {
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating post:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)

  return { data: post as Post, error: null }
}

/**
 * Delete a post
 */
export async function deletePost(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')

  return { error: null }
}

/**
 * Get post by ID (for editing)
 */
export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data as Post
}

/**
 * Get all posts for admin list
 */
export async function getPostsAdmin(): Promise<Post[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return (data as Post[]) || []
}

/**
 * Toggle post published status
 */
export async function togglePostPublished(
  id: string,
  published: boolean
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const updateData: any = {
    is_published: published,
    updated_at: new Date().toISOString(),
  }

  // Set published_at when publishing
  if (published) {
    updateData.published_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('posts')
    .update(updateData)
    .eq('id', id)

  if (error) {
    console.error('Error toggling published:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')

  return { error: null }
}

/**
 * Toggle post featured status
 */
export async function togglePostFeatured(
  id: string,
  featured: boolean
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('posts')
    .update({ is_featured: featured, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('Error toggling featured:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')

  return { error: null }
}
