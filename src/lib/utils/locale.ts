import type { Locale, LocalizedContent } from '@/types'

export const DEFAULT_LOCALE: Locale = 'hr-HR'
export const LOCALES: Locale[] = ['hr-HR', 'en-US', 'de-DE']

/**
 * Extract localized content from a JSONB field
 * Falls back to default locale if the requested locale is not available
 */
export function getLocalizedContent(
  content: LocalizedContent | null | undefined,
  locale: Locale = DEFAULT_LOCALE
): string {
  if (!content) return ''

  // Try requested locale first
  if (content[locale]) return content[locale]

  // Fall back to default locale
  if (content[DEFAULT_LOCALE]) return content[DEFAULT_LOCALE]

  // Fall back to first available locale
  const firstKey = Object.keys(content)[0] as Locale | undefined
  if (firstKey && content[firstKey]) return content[firstKey]

  return ''
}

/**
 * Create a localized content object from a string
 */
export function createLocalizedContent(
  content: string,
  locale: Locale = DEFAULT_LOCALE
): LocalizedContent {
  return { [locale]: content }
}

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale)
}

/**
 * Get locale from various sources with fallback
 */
export function getLocale(localeParam?: string): Locale {
  if (localeParam && isValidLocale(localeParam)) {
    return localeParam
  }
  return DEFAULT_LOCALE
}
