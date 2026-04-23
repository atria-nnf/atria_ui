'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { InsertTables, UpdateTables } from '@/types/database'

export async function getGalleryAdmin() {
  const supabase = await createClient()
  const { data } = await supabase.from('gallery').select('*').order('order_index', { ascending: true })
  return data || []
}

export async function getGalleryItemById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('gallery').select('*').eq('id', id).single()
  if (error) {
    console.error('Error fetching gallery item:', error.message)
    return null
  }
  return data
}

export async function createGalleryItem(data: InsertTables<'gallery'>) {
  const supabase = await createClient()
  const { data: result, error } = await supabase.from('gallery').insert({ ...data, created_at: new Date().toISOString() }).select().single()
  if (error) return { data: null, error: error.message }
  revalidatePath('/admin/gallery')
  return { data: result, error: null }
}

export async function updateGalleryItem(id: string, data: UpdateTables<'gallery'>) {
  const supabase = await createClient()
  const { data: result, error } = await supabase.from('gallery').update(data).eq('id', id).select().single()
  if (error) return { data: null, error: error.message }
  revalidatePath('/admin/gallery')
  return { data: result, error: null }
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('gallery').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/gallery')
  return { error: null }
}
