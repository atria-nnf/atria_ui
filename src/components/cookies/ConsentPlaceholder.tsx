'use client'

import { motion } from 'framer-motion'
import { MapPin, Play, Cookie } from 'lucide-react'
import { useCookieConsent } from '@/config/cookie-consent-context'
import { useLocale } from '@/config/locale-context'

type PlaceholderVariant = 'map' | 'video'

interface ConsentPlaceholderProps {
  variant: PlaceholderVariant
  className?: string
}

const translations = {
  'hr-HR': {
    map: {
      title: 'Google Maps je blokiran',
      description:
        'Morate prihvatiti marketinške kolačiće kako biste vidjeli kartu s našom lokacijom.',
      button: 'Prilagodi postavke kolačića',
    },
    video: {
      title: 'YouTube video je blokiran',
      description: 'Morate prihvatiti marketinške kolačiće kako biste gledali ovaj video.',
      button: 'Prilagodi postavke kolačića',
    },
  },
  'en-US': {
    map: {
      title: 'Google Maps is blocked',
      description: 'You need to accept marketing cookies to see the map with our location.',
      button: 'Adjust Cookie Settings',
    },
    video: {
      title: 'YouTube video is blocked',
      description: 'You need to accept marketing cookies to watch this video.',
      button: 'Adjust Cookie Settings',
    },
  },
  'de-DE': {
    map: {
      title: 'Google Maps ist blockiert',
      description:
        'Sie müssen Marketing-Cookies akzeptieren, um die Karte mit unserem Standort zu sehen.',
      button: 'Cookie-Einstellungen anpassen',
    },
    video: {
      title: 'YouTube-Video ist blockiert',
      description: 'Sie müssen Marketing-Cookies akzeptieren, um dieses Video anzusehen.',
      button: 'Cookie-Einstellungen anpassen',
    },
  },
}

const variantIcons = {
  map: MapPin,
  video: Play,
}

const variantGradients = {
  map: 'from-blue-500 to-blue-600',
  video: 'from-red-500 to-red-600',
}

export function ConsentPlaceholder({ variant, className = '' }: ConsentPlaceholderProps) {
  const { openPreferenceCenter } = useCookieConsent()
  const { locale } = useLocale()

  const t = translations[locale]?.[variant] || translations['hr-HR'][variant]
  const Icon = variantIcons[variant]
  const gradient = variantGradients[variant]

  return (
    <div
      className={`relative w-full h-full min-h-[300px] bg-gray-100 rounded-2xl flex items-center justify-center ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.3) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center px-8 py-10 max-w-md"
      >
        {/* Icon */}
        <div
          className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Text */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{t.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{t.description}</p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={openPreferenceCenter}
          className="inline-flex items-center gap-2 px-6 py-3 bg-orangeCTA hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
        >
          <Cookie className="w-4 h-4" />
          {t.button}
        </motion.button>
      </motion.div>
    </div>
  )
}
