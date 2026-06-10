import type { CookieConsent, StoredConsent } from './consent-types'
import { CONSENT_VERSION, DEFAULT_CONSENT } from './consent-types'

const STORAGE_KEY = 'cookie-consent'

export function getStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const parsed: StoredConsent = JSON.parse(stored)

    // Validate version - if outdated, treat as no consent
    if (parsed.version !== CONSENT_VERSION) {
      return null
    }

    // Ensure essential is always true
    parsed.consent.essential = true

    return parsed
  } catch {
    return null
  }
}

export function setStoredConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') return

  const stored: StoredConsent = {
    consent: {
      ...consent,
      essential: true, // Always ensure essential is true
    },
    consentDate: new Date().toISOString(),
    version: CONSENT_VERSION,
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {
    console.error('Failed to store cookie consent')
  }
}

export function clearStoredConsent(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    console.error('Failed to clear cookie consent')
  }
}

export function hasStoredConsent(): boolean {
  return getStoredConsent() !== null
}

export function getDefaultConsent(): CookieConsent {
  return { ...DEFAULT_CONSENT }
}
