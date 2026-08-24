import { createAdminClient } from '@/lib/supabase/admin'

export interface SubscribeResult {
  success: boolean
  error?: string
}

/**
 * Subscribe an email to the newsletter
 * Uses admin client to bypass RLS for public form submissions
 */
export async function subscribeToNewsletter(
  email: string,
  source: 'footer' | 'blog' = 'footer'
): Promise<SubscribeResult> {
  try {
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.toLowerCase().trim(), source })

    if (error) {
      // Unique violation — already subscribed, treat as success
      if (error.code === '23505') {
        return { success: true }
      }
      console.error('Error subscribing to newsletter:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Error subscribing to newsletter:', err)
    return { success: false, error: 'Failed to subscribe' }
  }
}
