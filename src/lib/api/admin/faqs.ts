'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { InsertTables, UpdateTables } from '@/types/database'

export async function getFaqsAdmin() {
  const supabase = await createClient()
  const { data } = await supabase.from('faqs').select('*').order('order_index', { ascending: true })
  return data || []
}

export async function getFaqById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('faqs').select('*').eq('id', id).single()
  if (error) {
    console.error('Error fetching FAQ:', error.message)
    return null
  }
  return data
}

export async function createFaq(data: InsertTables<'faqs'>) {
  const supabase = await createClient()
  const { data: result, error } = await supabase.from('faqs').insert({ ...data, created_at: new Date().toISOString() }).select().single()
  if (error) return { data: null, error: error.message }
  revalidatePath('/admin/faqs')
  return { data: result, error: null }
}

export async function updateFaq(id: string, data: UpdateTables<'faqs'>) {
  const supabase = await createClient()
  const { data: result, error } = await supabase.from('faqs').update(data).eq('id', id).select().single()
  if (error) return { data: null, error: error.message }
  revalidatePath('/admin/faqs')
  return { data: result, error: null }
}

export async function deleteFaq(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('faqs').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/faqs')
  return { error: null }
}
