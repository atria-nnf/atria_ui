'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Doctor } from '@/types'

type DoctorInsert = Omit<Doctor, 'id' | 'created_at' | 'updated_at'>
type DoctorUpdate = Partial<DoctorInsert>

/**
 * Create a new doctor
 */
export async function createDoctor(data: DoctorInsert): Promise<{ data: Doctor | null; error: string | null }> {
  const supabase = await createClient()

  const { data: doctor, error } = await supabase
    .from('doctors')
    .insert({
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating doctor:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/admin/doctors')
  revalidatePath('/lijecnici')

  return { data: doctor as Doctor, error: null }
}

/**
 * Update a doctor
 */
export async function updateDoctor(
  id: string,
  data: DoctorUpdate
): Promise<{ data: Doctor | null; error: string | null }> {
  const supabase = await createClient()

  const { data: doctor, error } = await supabase
    .from('doctors')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating doctor:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/admin/doctors')
  revalidatePath('/lijecnici')

  return { data: doctor as Doctor, error: null }
}

/**
 * Delete a doctor
 */
export async function deleteDoctor(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('doctors')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting doctor:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/doctors')
  revalidatePath('/lijecnici')

  return { error: null }
}

/**
 * Get doctor by ID (for editing)
 */
export async function getDoctorById(id: string): Promise<Doctor | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching doctor:', error)
    return null
  }

  return data as Doctor
}

/**
 * Get all doctors for admin list
 */
export async function getDoctorsAdmin(): Promise<Doctor[]> {
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
 * Toggle doctor featured status
 */
export async function toggleDoctorFeatured(
  id: string,
  featured: boolean
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('doctors')
    .update({ is_featured: featured, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('Error toggling featured:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/doctors')
  revalidatePath('/lijecnici')

  return { error: null }
}
