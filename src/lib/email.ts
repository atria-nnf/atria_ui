import { Resend } from 'resend'

const NOTIFICATION_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL || 'info@poliklinika-atria.hr'
const FROM_EMAIL = process.env.EMAIL_FROM || 'Poliklinika Atria <onboarding@resend.dev>'

export interface ContactNotification {
  name: string
  email: string
  phone?: string | null
  service?: string | null
  message: string
}

/**
 * Send a notification email to the clinic when a contact form is submitted.
 * Requires RESEND_API_KEY — if not configured, logs a warning and skips
 * (the submission is still saved to the database).
 */
export async function sendContactNotification(data: ContactNotification): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skipping contact notification email')
    return false
  }

  try {
    const resend = new Resend(apiKey)

    const escapeHtml = (str: string) =>
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

    const rows = [
      ['Ime i prezime', data.name],
      ['Email', data.email],
      ['Telefon', data.phone || '—'],
      ['Usluga', data.service || '—'],
    ]
      .map(
        ([label, value]) =>
          `<tr><td style="padding:8px 16px 8px 0;color:#64748b;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:8px 0;color:#0f172a;">${escapeHtml(value)}</td></tr>`
      )
      .join('')

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: `Nova poruka s web stranice — ${data.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#0f172a;">Nova poruka s kontakt forme</h2>
          <table style="border-collapse:collapse;font-size:14px;">${rows}</table>
          <p style="color:#64748b;font-size:14px;margin-top:24px;margin-bottom:8px;">Poruka:</p>
          <div style="background:#f8fafc;border-radius:8px;padding:16px;color:#0f172a;font-size:14px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
          <p style="color:#94a3b8;font-size:12px;margin-top:24px;">Odgovorite izravno na ovaj email kako biste kontaktirali pošiljatelja.</p>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending contact notification email:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Error sending contact notification email:', err)
    return false
  }
}
