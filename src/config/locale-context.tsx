'use client'

import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import type { Locale } from '@/types'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | null>(null)

const STORAGE_KEY = 'locale'
const DEFAULT_LOCALE: Locale = 'hr-HR'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  // Load locale from localStorage on mount (after hydration)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && ['hr-HR', 'en-US', 'de-DE'].includes(stored)) {
      setLocaleState(stored)
    }
  }, [])

  // Persist locale to localStorage
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
  }

  // Render immediately with default locale to prevent hydration flash
  // The useEffect will update to stored locale after mount
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
