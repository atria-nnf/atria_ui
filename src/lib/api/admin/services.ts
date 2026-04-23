'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Service } from '@/types'

type ServiceInsert = Omit<Service, 'id' | 'created_at' | 'updated_at'>
type ServiceUpdate = Partial<ServiceInsert>

/**
 * Create a new service
 */
export async function createService(data: ServiceInsert): Promise<{ data: Service | null; error: string | null }> {
  const supabase = await createClient()

  const { data: service, error } = await supabase
    .from('services')
    .insert({
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating service:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/admin/services')
  revalidatePath('/usluge')

  return { data: service as Service, error: null }
}

/**
 * Update a service
 */
export async function updateService(
  id: string,
  data: ServiceUpdate
): Promise<{ data: Service | null; error: string | null }> {
  const supabase = await createClient()

  const { data: service, error } = await supabase
    .from('services')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating service:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/admin/services')
  revalidatePath('/usluge')
  revalidatePath(`/usluge/${service.slug}`)

  return { data: service as Service, error: null }
}

/**
 * Delete a service
 */
export async function deleteService(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting service:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/services')
  revalidatePath('/usluge')

  return { error: null }
}

/**
 * Get service by ID (for editing)
 */
export async function getServiceById(id: string): Promise<Service | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching service:', error)
    return null
  }

  return data as Service
}

/**
 * Get all services for admin list
 */
export async function getServicesAdmin(): Promise<Service[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return (data as Service[]) || []
}

/**
 * Reorder services
 */
export async function reorderServices(
  items: { id: string; order_index: number }[]
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const updates = items.map((item) =>
    supabase
      .from('services')
      .update({ order_index: item.order_index })
      .eq('id', item.id)
  )

  const results = await Promise.all(updates)
  const error = results.find((r) => r.error)?.error

  if (error) {
    console.error('Error reordering services:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/services')
  revalidatePath('/usluge')

  return { error: null }
}

/**
 * Toggle service featured status
 */
export async function toggleServiceFeatured(
  id: string,
  featured: boolean
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('services')
    .update({ is_featured: featured, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('Error toggling featured:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/services')
  revalidatePath('/usluge')

  return { error: null }
}
