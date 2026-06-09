'use client'

import { motion } from 'framer-motion'
import {
  Car,
  Accessibility,
  Clock,
  Phone,
  MapPin,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ContactInfo } from '@/types'

interface Amenity {
  icon: LucideIcon
  text: string
}

const amenities: Amenity[] = [
  {
    icon: Car,
    text: 'Besplatni parking',
  },
  {
    icon: Accessibility,
    text: 'Pristup za invalide',
  },
  {
    icon: Clock,
    text: 'Radno vrijeme: Pon-Pet 8-20h',
  },
  {
    icon: Phone,
    text: 'Telefonsko narucivanje',
  },
]

const workingHours = [
  { day: 'Ponedjeljak - Petak', hours: '08:00 - 20:00' },
  { day: 'Subota', hours: '09:00 - 14:00' },
  { day: 'Nedjelja', hours: 'Zatvoreno' },
]

interface LocationSectionProps {
  contactInfo?: ContactInfo
}

export function LocationSection({ contactInfo }: LocationSectionProps) {
  const address = contactInfo?.address || 'Trg kralja Tomislava 1'
  const postalCode = contactInfo?.postalCode || '10370'
  const city = contactInfo?.city || 'Dugo Selo'
  const clinicName = contactInfo?.clinicName || 'Poliklinika Atria'
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-brand-color/10 rounded-full text-sm font-medium text-brand-color mb-6">
              Lokacija
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight font-serif">
              Posjetite nas u {city}
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {clinicName} smjestena je u centru grada {city}, s odlicnom
              prometnom povezanoscu i besplatnim parkingom za nase
              pacijente.
            </p>

            {/* Address */}
            <div className="flex items-start gap-3 mb-8 p-4 bg-gray-50 rounded-xl">
              <MapPin className="w-6 h-6 text-brand-color flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-gray-900">
                  {address}
                </p>
                <p className="text-gray-600">{postalCode} {city}, Hrvatska</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Radno vrijeme
              </h3>
              <div className="space-y-2">
                {workingHours.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-700">{item.day}</span>
                    <span className="font-semibold text-gray-900">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Dodatne pogodnosti
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {amenities.map((amenity, index) => {
                  const Icon = amenity.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                    >
                      <Icon className="w-5 h-5 text-brand-color" />
                      <span className="text-sm font-medium text-gray-700">
                        {amenity.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right - Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl h-[600px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44493.5711845768!2d16.119063106998336!3d45.814298470552195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47667aba94930067%3A0x11e28535ece6bde!2sPoliklinika%20Atria!5e0!3m2!1shr!2shr!4v1780995760985!5m2!1shr!2shr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${clinicName} Location`}
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
