'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSubmissionsAdmin() {
  const supabase = await createClient()
  const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
  return data || []
}

export async function getSubmissionById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('contact_submissions').select('*').eq('id', id).single()
  if (error) {
    console.error('Error fetching submission:', error.message)
    return null
  }
  return data
}

export async function updateSubmissionStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('contact_submissions').update({ status }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/submissions')
  return { error: null }
}

export async function deleteSubmission(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('contact_submissions').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/submissions')
  return { error: null }
}
