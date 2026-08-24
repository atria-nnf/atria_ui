'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getNewsletterSubscribersAdmin() {
  const supabase = await createClient()
  const { data } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false })
  return data || []
}

export async function deleteNewsletterSubscriber(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/newsletter')
  return { error: null }
}
