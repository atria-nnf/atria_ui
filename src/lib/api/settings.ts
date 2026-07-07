import { createClient } from '@/lib/supabase/server'
import type {
  Setting,
  HomepageSettings,
  ServicesPageSettings,
  ContactInfo,
  ContactPageSettings,
  DoctorsPageSettings,
  CareersPageSettings,
  BlogPageSettings,
  AboutUsSettings,
  LegalPageSettings,
  FooterSettings,
  SettingKey,
} from '@/types'

/**
 * Get a setting by key
 */
export async function getSetting<T = object>(key: SettingKey): Promise<T | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single()

  if (error) {
    // PGRST116 means no rows returned - this is expected for settings that haven't been created yet
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching setting "${key}":`, error)
    }
    return null
  }

  return (data as { value: T })?.value ?? null
}

/**
 * Get homepage settings
 */
export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  return getSetting<HomepageSettings>('homepage')
}

/**
 * Get services page settings
 */
export async function getServicesPageSettings(): Promise<ServicesPageSettings | null> {
  return getSetting<ServicesPageSettings>('services_page')
}

/**
 * Get contact info
 */
export async function getContactInfo(): Promise<ContactInfo> {
  const data = await getSetting<ContactInfo>('contact_info')

  // Return default values if no data
  if (!data) {
    return {
      clinicName: 'Poliklinika Atria',
      phone: '+385 1 123 4567',
      email: 'info@atria.hr',
      address: 'Trg kralja Tomislava 1',
      city: 'Dugo Selo',
      postalCode: '10370',
      latitude: 45.8,
      longitude: 16.2167,
    }
  }

  return data
}

/**
 * Get about us page settings
 */
export async function getAboutUsPage(): Promise<AboutUsSettings | null> {
  return getSetting<AboutUsSettings>('about_us')
}

/**
 * Get contact page settings
 */
export async function getContactPageSettings(): Promise<ContactPageSettings | null> {
  return getSetting<ContactPageSettings>('contact_page')
}

/**
 * Get doctors page settings
 */
export async function getDoctorsPageSettings(): Promise<DoctorsPageSettings | null> {
  return getSetting<DoctorsPageSettings>('doctors_page')
}

/**
 * Get careers page settings
 */
export async function getCareersPageSettings(): Promise<CareersPageSettings | null> {
  return getSetting<CareersPageSettings>('careers_page')
}

/**
 * Get blog page settings
 */
export async function getBlogPageSettings(): Promise<BlogPageSettings | null> {
  return getSetting<BlogPageSettings>('blog_page')
}

/**
 * Get footer settings
 */
export async function getFooterSettings(): Promise<FooterSettings | null> {
  return getSetting<FooterSettings>('footer')
}

/**
 * Get privacy policy
 */
export async function getPrivacyPolicy(): Promise<LegalPageSettings | null> {
  return getSetting<LegalPageSettings>('privacy_policy')
}

/**
 * Get terms of service
 */
export async function getTermsOfService(): Promise<LegalPageSettings | null> {
  return getSetting<LegalPageSettings>('terms_of_service')
}

/**
 * Get cookie policy
 */
export async function getCookiePolicy(): Promise<LegalPageSettings | null> {
  return getSetting<LegalPageSettings>('cookie_policy')
}

/**
 * Get all settings
 */
export async function getAllSettings(): Promise<Setting[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from('settings').select('*')

  if (error) {
    console.error('Error fetching all settings:', error)
    return []
  }

  return (data as Setting[]) || []
}
