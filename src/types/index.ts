// Re-export database types
export * from './database'

// Locale types
export type Locale = 'hr-HR' | 'en-US' | 'de-DE'
export const LOCALES: Locale[] = ['hr-HR', 'en-US', 'de-DE']
export const DEFAULT_LOCALE: Locale = 'hr-HR'

// Service categories
export type ServiceCategory = 'specialist' | 'diagnostics' | 'preventive' | 'aesthetic'

// Employment types
export type EmploymentType = 'full-time' | 'part-time' | 'contract'

// Contact submission status
export type ContactStatus = 'new' | 'read' | 'responded'

// Settings keys
export type SettingKey =
  | 'homepage'
  | 'about_us'
  | 'contact_info'
  | 'privacy_policy'
  | 'terms_of_service'
  | 'cookie_policy'

// Homepage settings structure
export interface HomepageSettings {
  heroTitle?: Record<Locale, string>
  heroSubtitle?: Record<Locale, string>
  heroBackgroundImage?: string
  ctaTitle?: Record<Locale, string>
  ctaButtonText?: Record<Locale, string>
  seo?: {
    title?: Record<Locale, string>
    description?: Record<Locale, string>
    ogImage?: string
  }
}

// Contact info structure
export interface ContactInfo {
  clinicName: string
  phone: string
  email: string
  address: string
  city: string
  postalCode: string
  latitude: number
  longitude: number
  workingHours?: Record<Locale, string>
  socialMedia?: {
    facebook?: string
    instagram?: string
    linkedin?: string
  }
}

// About us page structure
export interface AboutUsSettings {
  title?: Record<Locale, string>
  content?: Record<Locale, string>
  mission?: Record<Locale, string>
  vision?: Record<Locale, string>
  values?: Array<{
    title: Record<Locale, string>
    description: Record<Locale, string>
    icon?: string
  }>
  heroImage?: string
  teamImage?: string
}

// Legal page structure
export interface LegalPageSettings {
  title: Record<Locale, string>
  content: Record<Locale, string>
  lastUpdated?: string
}

// SEO metadata
export interface SEOMetadata {
  title: string
  description: string
  ogImage?: string
  ogType?: string
  canonicalUrl?: string
  keywords?: string[]
}

// Pricing structure for services
export interface ServicePricing {
  basic?: {
    price: number
    currency: string
    description?: Record<Locale, string>
  }
  standard?: {
    price: number
    currency: string
    description?: Record<Locale, string>
  }
  premium?: {
    price: number
    currency: string
    description?: Record<Locale, string>
  }
}

// Navigation item
export interface NavItem {
  label: Record<Locale, string>
  href: string
  children?: NavItem[]
}

// API response wrapper
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}
