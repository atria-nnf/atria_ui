export interface CookieConsent {
  essential: boolean // Always true - required for site to function
  functional: boolean // Locale storage, preferences
  analytics: boolean // Future analytics
  marketing: boolean // Google Maps, YouTube embeds
}

export interface StoredConsent {
  consent: CookieConsent
  consentDate: string // ISO date string
  version: number
}

export const CONSENT_VERSION = 1

export const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
}

export const FULL_CONSENT: CookieConsent = {
  essential: true,
  functional: true,
  analytics: true,
  marketing: true,
}

export type ConsentCategory = keyof CookieConsent
