'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, BarChart3, Target, Settings } from 'lucide-react'
import { useCookieConsent } from '@/config/cookie-consent-context'
import { useLocale } from '@/config/locale-context'
import type { CookieConsent } from '@/lib/cookies/consent-types'

const translations = {
  'hr-HR': {
    title: 'Postavke kolačića',
    description:
      'Upravljajte svojim preferencijama kolačića. Možete uključiti ili isključiti različite vrste kolačića ispod.',
    save: 'Spremi postavke',
    acceptAll: 'Prihvati sve',
    categories: {
      essential: {
        title: 'Nužni kolačići',
        description:
          'Ovi kolačići su neophodni za rad web stranice i ne mogu se isključiti. Uključuju kolačiće za upravljanje sesijom i sigurnost.',
      },
      functional: {
        title: 'Funkcionalni kolačići',
        description:
          'Ovi kolačići omogućuju napredne funkcionalnosti i personalizaciju, poput pamćenja vaših jezičnih postavki.',
      },
      analytics: {
        title: 'Analitički kolačići',
        description:
          'Ovi kolačići nam pomažu razumjeti kako posjetitelji koriste našu web stranicu, što nam omogućuje poboljšanje korisničkog iskustva.',
      },
      marketing: {
        title: 'Marketinški kolačići',
        description:
          'Ovi kolačići omogućuju prikaz sadržaja trećih strana kao što su Google Maps i YouTube videozapisi na našoj stranici.',
      },
    },
  },
  'en-US': {
    title: 'Cookie Preferences',
    description:
      'Manage your cookie preferences. You can enable or disable different types of cookies below.',
    save: 'Save Preferences',
    acceptAll: 'Accept All',
    categories: {
      essential: {
        title: 'Essential Cookies',
        description:
          'These cookies are necessary for the website to function and cannot be disabled. They include session management and security cookies.',
      },
      functional: {
        title: 'Functional Cookies',
        description:
          'These cookies enable enhanced functionality and personalization, such as remembering your language preferences.',
      },
      analytics: {
        title: 'Analytics Cookies',
        description:
          'These cookies help us understand how visitors use our website, allowing us to improve the user experience.',
      },
      marketing: {
        title: 'Marketing Cookies',
        description:
          'These cookies enable third-party content such as Google Maps and YouTube videos to be displayed on our site.',
      },
    },
  },
  'de-DE': {
    title: 'Cookie-Einstellungen',
    description:
      'Verwalten Sie Ihre Cookie-Einstellungen. Sie können verschiedene Arten von Cookies unten aktivieren oder deaktivieren.',
    save: 'Einstellungen speichern',
    acceptAll: 'Alle akzeptieren',
    categories: {
      essential: {
        title: 'Notwendige Cookies',
        description:
          'Diese Cookies sind für das Funktionieren der Website notwendig und können nicht deaktiviert werden. Sie umfassen Sitzungsverwaltung und Sicherheits-Cookies.',
      },
      functional: {
        title: 'Funktionale Cookies',
        description:
          'Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung, wie das Speichern Ihrer Spracheinstellungen.',
      },
      analytics: {
        title: 'Analytische Cookies',
        description:
          'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen, und ermöglichen uns, die Benutzererfahrung zu verbessern.',
      },
      marketing: {
        title: 'Marketing-Cookies',
        description:
          'Diese Cookies ermöglichen die Anzeige von Drittanbieterinhalten wie Google Maps und YouTube-Videos auf unserer Website.',
      },
    },
  },
}

const categoryIcons = {
  essential: Shield,
  functional: Settings,
  analytics: BarChart3,
  marketing: Target,
}

interface ToggleSwitchProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  disabled?: boolean
}

function ToggleSwitch({ enabled, onChange, disabled = false }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orangeCTA focus:ring-offset-2 ${
        enabled ? 'bg-orangeCTA' : 'bg-gray-300'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

export function CookiePreferenceCenter() {
  const { showPreferenceCenter, closePreferenceCenter, consent, updateConsent, acceptAll } =
    useCookieConsent()
  const { locale } = useLocale()

  const [localConsent, setLocalConsent] = useState<CookieConsent>(consent)

  // Sync local state with consent when modal opens
  useEffect(() => {
    if (showPreferenceCenter) {
      setLocalConsent(consent)
    }
  }, [showPreferenceCenter, consent])

  const t = translations[locale] || translations['hr-HR']

  const handleSave = () => {
    updateConsent(localConsent)
  }

  const handleAcceptAll = () => {
    acceptAll()
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showPreferenceCenter) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showPreferenceCenter])

  const categories: Array<{ key: keyof CookieConsent; disabled: boolean }> = [
    { key: 'essential', disabled: true },
    { key: 'functional', disabled: false },
    { key: 'analytics', disabled: false },
    { key: 'marketing', disabled: false },
  ]

  return (
    <AnimatePresence>
      {showPreferenceCenter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={closePreferenceCenter}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
              <button
                onClick={closePreferenceCenter}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-160px)]">
              <p className="text-gray-600 mb-6">{t.description}</p>

              {/* Cookie Categories */}
              <div className="space-y-4">
                {categories.map(({ key, disabled }) => {
                  const Icon = categoryIcons[key]
                  const categoryText = t.categories[key]

                  return (
                    <div
                      key={key}
                      className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{categoryText.title}</h3>
                              {disabled && (
                                <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">
                                  {locale === 'hr-HR'
                                    ? 'Uvijek uključeno'
                                    : locale === 'en-US'
                                    ? 'Always on'
                                    : 'Immer aktiv'}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{categoryText.description}</p>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={localConsent[key]}
                          onChange={(enabled) =>
                            setLocalConsent((prev) => ({ ...prev, [key]: enabled }))
                          }
                          disabled={disabled}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-orangeCTA hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
              >
                {t.save}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAcceptAll}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                {t.acceptAll}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
