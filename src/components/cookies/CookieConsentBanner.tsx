'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Settings } from 'lucide-react'
import { useCookieConsent } from '@/config/cookie-consent-context'
import { useLocale } from '@/config/locale-context'

const translations = {
  'hr-HR': {
    title: 'Koristimo kolačiće',
    description:
      'Koristimo kolačiće kako bismo poboljšali vaše iskustvo na našoj web stranici. Neki kolačići su neophodni za rad stranice, dok nam drugi pomažu razumjeti kako koristite stranicu.',
    acceptAll: 'Prihvati sve',
    rejectAll: 'Samo nužni',
    customize: 'Prilagodi',
    privacyLink: 'Saznajte više u našoj',
    privacyPolicy: 'politici privatnosti',
  },
  'en-US': {
    title: 'We use cookies',
    description:
      'We use cookies to improve your experience on our website. Some cookies are essential for the site to function, while others help us understand how you use the site.',
    acceptAll: 'Accept all',
    rejectAll: 'Essential only',
    customize: 'Customize',
    privacyLink: 'Learn more in our',
    privacyPolicy: 'privacy policy',
  },
  'de-DE': {
    title: 'Wir verwenden Cookies',
    description:
      'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Einige Cookies sind für das Funktionieren der Website unerlässlich, während andere uns helfen zu verstehen, wie Sie die Website nutzen.',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Nur notwendige',
    customize: 'Anpassen',
    privacyLink: 'Erfahren Sie mehr in unserer',
    privacyPolicy: 'Datenschutzerklärung',
  },
}

export function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectAll, openPreferenceCenter } = useCookieConsent()
  const { locale } = useLocale()

  const t = translations[locale] || translations['hr-HR']

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200/50 overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orangeCTA to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t.description}{' '}
                    <a
                      href="/pravila-privatnosti"
                      className="text-orangeCTA hover:underline font-medium"
                    >
                      {t.privacyLink} {t.privacyPolicy}
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={acceptAll}
                  className="flex-1 px-6 py-3 bg-orangeCTA hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
                >
                  {t.acceptAll}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={rejectAll}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {t.rejectAll}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openPreferenceCenter}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  {t.customize}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
