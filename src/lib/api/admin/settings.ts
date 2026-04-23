'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Json } from '@/types/database'

export async function getSetting(key: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('settings').select('*').eq('key', key).single()
  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows returned, which is expected for missing settings
    console.error('Error fetching setting:', error.message)
  }
  return data?.value || null
}

export async function getAllSettings() {
  const supabase = await createClient()
  const { data } = await supabase.from('settings').select('*')
  return data || []
}

export async function updateSetting(key: string, value: Json) {
  const supabase = await createClient()
  const { error } = await supabase.from('settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  if (error) return { error: error.message }
  revalidatePath('/admin/settings')
  revalidatePath('/')
  return { error: null }
}
