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
  | 'services_page'
  | 'about_us'
  | 'contact_info'
  | 'contact_page'
  | 'doctors_page'
  | 'careers_page'
  | 'blog_page'
  | 'footer'
  | 'privacy_policy'
  | 'terms_of_service'
  | 'cookie_policy'

// Homepage settings structure
export interface HomepageStat {
  number: string
  label: Record<Locale, string>
}

export interface HomepageProcessStep {
  step: string
  title: Record<Locale, string>
  description: Record<Locale, string>
}

export interface HomepageGalleryImage {
  image: string
  span: 'col-span-1' | 'col-span-2' | 'col-span-2 row-span-2'
}

export interface HomepageSettings {
  heroTitle?: Record<Locale, string>
  heroSubtitle?: Record<Locale, string>
  heroBackgroundImage?: string
  ctaButtonText?: Record<Locale, string>
  stats?: HomepageStat[]
  processSteps?: HomepageProcessStep[]
  // Gallery section
  gallerySectionLabel?: Record<Locale, string>
  gallerySectionTitle?: Record<Locale, string>
  galleryImages?: HomepageGalleryImage[]
  // CTA section at the bottom of homepage
  ctaSectionTitle?: Record<Locale, string>
  ctaSectionSubtitle?: Record<Locale, string>
  ctaSectionButtonText?: Record<Locale, string>
  seo?: {
    title?: Record<Locale, string>
    description?: Record<Locale, string>
    ogImage?: string
  }
}

// Footer settings structure
export interface FooterSettings {
  brandTagline?: Record<Locale, string>
  newsletterTitle?: Record<Locale, string>
  newsletterDescription?: Record<Locale, string>
  workingHoursWeekdays?: string
  workingHoursSaturday?: string
  copyrightText?: Record<Locale, string>
}

// Services page settings structure
export interface ServicesPageStat {
  number: string
  label: Record<Locale, string>
}

export interface ServicesPageWhyItem {
  title: Record<Locale, string>
  description: Record<Locale, string>
  icon: string
}

export interface ServicesPageSettings {
  heroTitle?: Record<Locale, string>
  heroSubtitle?: Record<Locale, string>
  stats?: ServicesPageStat[]
  whyChooseUs?: ServicesPageWhyItem[]
  ctaTitle?: Record<Locale, string>
  ctaSubtitle?: Record<Locale, string>
}

// Contact info structure
export interface ContactInfo {
  clinicName: string
  phone: string
  mobilePhone?: string
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
    tiktok?: string
  }
}

// Contact page settings structure
export interface ContactPageSettings {
  heroLabel?: Record<Locale, string>
  heroTitle?: Record<Locale, string>
  heroSubtitle?: Record<Locale, string>
  // Form section
  formSectionTitle?: Record<Locale, string>
  formSectionSubtitle?: Record<Locale, string>
  // Working hours
  workingHoursWeekdays?: string
  workingHoursSaturday?: string
  workingHoursSunday?: Record<Locale, string>
  // Booking card
  bookingCardLine1?: Record<Locale, string>
  bookingCardLine2?: Record<Locale, string>
  // Directions section
  directionsByCarTitle?: Record<Locale, string>
  directionsByCarText?: Record<Locale, string>
  directionsByTransportTitle?: Record<Locale, string>
  directionsByTransportText?: Record<Locale, string>
  directionsAccessibilityTitle?: Record<Locale, string>
  directionsAccessibilityText?: Record<Locale, string>
}

// Doctors page stat structure
export interface DoctorsPageStat {
  number: string
  label: Record<Locale, string>
}

// Doctors page "Why Our Doctors" item
export interface DoctorsPageWhyItem {
  title: Record<Locale, string>
  description: Record<Locale, string>
  icon: string
}

// Doctors page settings structure
export interface DoctorsPageSettings {
  heroLabel?: Record<Locale, string>
  heroTitle?: Record<Locale, string>
  heroSubtitle?: Record<Locale, string>
  stats?: DoctorsPageStat[]
  // Why Our Doctors section
  whySectionTitle?: Record<Locale, string>
  whySectionSubtitle?: Record<Locale, string>
  whyOurDoctors?: DoctorsPageWhyItem[]
}

// Careers page settings structure
export interface CareersPageSettings {
  heroLabel?: Record<Locale, string>
  heroTitleLine1?: Record<Locale, string>
  heroTitleLine2?: Record<Locale, string>
  heroSubtitle?: Record<Locale, string>
}

// Blog/News page settings structure
export interface BlogPageSettings {
  newsletterTitle?: Record<Locale, string>
  newsletterSubtitle?: Record<Locale, string>
  newsletterPlaceholder?: Record<Locale, string>
  newsletterButtonText?: Record<Locale, string>
  newsletterDisclaimer?: Record<Locale, string>
}

// About us page structure
export interface AboutUsStat {
  number: string
  label: Record<Locale, string>
}

export interface AboutUsValue {
  title: Record<Locale, string>
  description: Record<Locale, string>
  icon: string
  color: string
}

export interface AboutUsMilestone {
  year: string
  event: Record<Locale, string>
}

export interface AboutUsSettings {
  // Hero section
  heroTitle?: Record<Locale, string>
  heroSubtitle?: Record<Locale, string>
  // Stats section
  stats?: AboutUsStat[]
  // Our Story section
  storyTitle?: Record<Locale, string>
  storyParagraph1?: Record<Locale, string>
  storyParagraph2?: Record<Locale, string>
  storyImage?: string
  // Timeline/Milestones
  milestones?: AboutUsMilestone[]
  // Values section
  values?: AboutUsValue[]
  // CTA section
  ctaTitle?: Record<Locale, string>
  ctaSubtitle?: Record<Locale, string>
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

// Newsletter subscriber (newsletter_subscribers table)
export interface NewsletterSubscriber {
  id: string
  email: string
  source: string | null
  created_at: string
}
