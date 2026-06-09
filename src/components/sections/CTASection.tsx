'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BsArrowRight } from 'react-icons/bs'
import type { ContactInfo } from '@/types'

interface CTASectionProps {
  contactInfo?: ContactInfo
}

export function CTASection({ contactInfo }: CTASectionProps) {
  const email = contactInfo?.email || 'info@atria.hr'
  const phone = contactInfo?.phone || '+385 1 123 4567'
  const phoneHref = `tel:${phone.replace(/\s/g, '')}`
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/ctaBackground.webp"
          alt="Poliklinika Atria"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-brand-color/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-6 text-white font-serif"
        >
          Naručite se na pregled
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
        >
          Naš tim stručnjaka je tu za vas. Zakažite pregled i prepustite svoje
          zdravlje u sigurne ruke.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/kontakt">
            <button className="group bg-white text-brand-color px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all flex items-center gap-2">
              Naručite se
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/usluge">
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-brand-color transition-all">
              Pregledajte usluge
            </button>
          </Link>
        </motion.div>

        {/* Quick Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-12 border-t border-white/20"
        >
          <p className="text-white/70 mb-4">Ili nas kontaktirajte direktno</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-white">
            <a
              href={`mailto:${email}`}
              className="hover:text-white/80 transition-colors"
            >
              {email}
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <a
              href={phoneHref}
              className="hover:text-white/80 transition-colors"
            >
              {phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
