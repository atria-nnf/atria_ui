'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { InsertTables, UpdateTables } from '@/types/database'

export async function getTestimonialsAdmin() {
  const supabase = await createClient()
  const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
  return data || []
}

export async function getTestimonialById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single()
  if (error) {
    console.error('Error fetching testimonial:', error.message)
    return null
  }
  return data
}

export async function createTestimonial(data: InsertTables<'testimonials'>) {
  const supabase = await createClient()
  const { data: result, error } = await supabase.from('testimonials').insert({ ...data, created_at: new Date().toISOString() }).select().single()
  if (error) return { data: null, error: error.message }
  revalidatePath('/admin/testimonials')
  return { data: result, error: null }
}

export async function updateTestimonial(id: string, data: UpdateTables<'testimonials'>) {
  const supabase = await createClient()
  const { data: result, error } = await supabase.from('testimonials').update(data).eq('id', id).select().single()
  if (error) return { data: null, error: error.message }
  revalidatePath('/admin/testimonials')
  return { data: result, error: null }
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/testimonials')
  return { error: null }
}

export async function toggleTestimonialApproved(id: string, approved: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').update({ is_approved: approved }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/testimonials')
  return { error: null }
}
