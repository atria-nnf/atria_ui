'use client'

import { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react'
import type { CookieConsent } from '@/lib/cookies/consent-types'
import { DEFAULT_CONSENT, FULL_CONSENT } from '@/lib/cookies/consent-types'
import { getStoredConsent, setStoredConsent, hasStoredConsent } from '@/lib/cookies/consent-storage'

interface CookieConsentContextType {
  consent: CookieConsent
  hasConsented: boolean
  showBanner: boolean
  showPreferenceCenter: boolean
  acceptAll: () => void
  rejectAll: () => void
  updateConsent: (newConsent: Partial<CookieConsent>) => void
  openPreferenceCenter: () => void
  closePreferenceCenter: () => void
  closeBanner: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT)
  const [hasConsented, setHasConsented] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferenceCenter, setShowPreferenceCenter] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load consent from localStorage on mount
  useEffect(() => {
    const stored = getStoredConsent()
    if (stored) {
      setConsent(stored.consent)
      setHasConsented(true)
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }
    setIsInitialized(true)
  }, [])

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    setConsent(newConsent)
    setStoredConsent(newConsent)
    setHasConsented(true)
    setShowBanner(false)
    setShowPreferenceCenter(false)
  }, [])

  const acceptAll = useCallback(() => {
    saveConsent(FULL_CONSENT)
  }, [saveConsent])

  const rejectAll = useCallback(() => {
    saveConsent({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    })
  }, [saveConsent])

  const updateConsent = useCallback((newConsent: Partial<CookieConsent>) => {
    const updated: CookieConsent = {
      ...consent,
      ...newConsent,
      essential: true, // Always ensure essential is true
    }
    saveConsent(updated)
  }, [consent, saveConsent])

  const openPreferenceCenter = useCallback(() => {
    setShowPreferenceCenter(true)
    setShowBanner(false)
  }, [])

  const closePreferenceCenter = useCallback(() => {
    setShowPreferenceCenter(false)
  }, [])

  const closeBanner = useCallback(() => {
    setShowBanner(false)
  }, [])

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasConsented,
        showBanner: isInitialized && showBanner,
        showPreferenceCenter,
        acceptAll,
        rejectAll,
        updateConsent,
        openPreferenceCenter,
        closePreferenceCenter,
        closeBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent(): CookieConsentContextType {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}
