import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { ContactSubmission } from '@/types'

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}

export interface SubmitContactResult {
  success: boolean
  data?: ContactSubmission
  error?: string
}

/**
 * Submit contact form
 * Uses admin client to bypass RLS for public form submissions
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<SubmitContactResult> {
  try {
    const supabase = createAdminClient()

    // Build the message with service info if provided
    const fullMessage = formData.service
      ? `Odabrana usluga: ${formData.service}\n\n${formData.message}`
      : formData.message

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: formData.service || null,
        message: fullMessage,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Error submitting contact form:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data as ContactSubmission }
  } catch (err) {
    console.error('Error submitting contact form:', err)
    return { success: false, error: 'Failed to submit form' }
  }
}

/**
 * Get all contact submissions (admin only)
 */
export async function getContactSubmissions(
  status?: string
): Promise<ContactSubmission[]> {
  const supabase = await createClient()

  let query = supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching contact submissions:', error)
    return []
  }

  return (data as ContactSubmission[]) || []
}

/**
 * Update contact submission status (admin only)
 */
export async function updateContactSubmissionStatus(
  id: string,
  status: 'new' | 'read' | 'responded'
): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Error updating contact submission status:', error)
    return false
  }

  return true
}

/**
 * Get contact submission count by status (for dashboard)
 */
export async function getContactSubmissionCounts(): Promise<{
  new: number
  read: number
  responded: number
  total: number
}> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('contact_submissions')
    .select('status')

  if (error) {
    console.error('Error fetching contact submission counts:', error)
    return { new: 0, read: 0, responded: 0, total: 0 }
  }

  const counts = {
    new: 0,
    read: 0,
    responded: 0,
    total: (data as { status: string }[])?.length || 0,
  }

  ;(data as { status: string }[])?.forEach((submission) => {
    if (submission.status === 'new') counts.new++
    else if (submission.status === 'read') counts.read++
    else if (submission.status === 'responded') counts.responded++
  })

  return counts
}
