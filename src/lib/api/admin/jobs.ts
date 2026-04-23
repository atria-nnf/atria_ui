'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { InsertTables, UpdateTables } from '@/types/database'

export async function getJobsAdmin() {
  const supabase = await createClient()
  const { data } = await supabase.from('job_postings').select('*').order('created_at', { ascending: false })
  return data || []
}

export async function getJobById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('job_postings').select('*').eq('id', id).single()
  if (error) {
    console.error('Error fetching job:', error.message)
    return null
  }
  return data
}

export async function createJob(data: InsertTables<'job_postings'>) {
  const supabase = await createClient()
  const { data: result, error } = await supabase.from('job_postings').insert({ ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }).select().single()
  if (error) return { data: null, error: error.message }
  revalidatePath('/admin/jobs')
  revalidatePath('/karijera')
  return { data: result, error: null }
}

export async function updateJob(id: string, data: UpdateTables<'job_postings'>) {
  const supabase = await createClient()
  const { data: result, error } = await supabase.from('job_postings').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) return { data: null, error: error.message }
  revalidatePath('/admin/jobs')
  revalidatePath('/karijera')
  return { data: result, error: null }
}

export async function deleteJob(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('job_postings').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/jobs')
  revalidatePath('/karijera')
  return { error: null }
}

export async function toggleJobActive(id: string, active: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('job_postings').update({ is_active: active, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/jobs')
  revalidatePath('/karijera')
  return { error: null }
}
