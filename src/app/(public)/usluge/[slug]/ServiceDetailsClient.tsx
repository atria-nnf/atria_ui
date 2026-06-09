'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Heart,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  User,
  AlertCircle,
  Star,
  TestTube,
  Stethoscope,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import { getImageUrl } from '@/lib/utils/image'
import type { Service, Doctor, Testimonial, Post, FAQ } from '@/types'

interface ServiceDetailsClientProps {
  service: Service
  doctors: Doctor[]
  testimonials: Testimonial[]
  relatedPosts: Post[]
  faqs: FAQ[]
}

// Category icons
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  specialist: Heart,
  diagnostics: TestTube,
  preventive: Stethoscope,
  aesthetic: Sparkles,
}

// Category colors
const CATEGORY_COLORS: Record<string, string> = {
  specialist: 'from-blue-600 to-indigo-600',
  diagnostics: 'from-blue-500 to-cyan-500',
  preventive: 'from-indigo-500 to-purple-500',
  aesthetic: 'from-blue-600 to-indigo-600',
}

export function ServiceDetailsClient({
  service,
  doctors,
  testimonials,
  relatedPosts,
  faqs,
}: ServiceDetailsClientProps) {
  const { locale } = useLocale()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const ServiceIcon = CATEGORY_ICONS[service.category || ''] || Heart
  const categoryColor = CATEGORY_COLORS[service.category || ''] || 'from-gray-500 to-gray-600'

  // Parse pricing list items
  type PricingItem = {
    title: Record<string, string>
    description: Record<string, string>
    price: number
  }

  const getPricingList = (pricing: unknown): PricingItem[] => {
    if (!pricing) return []
    try {
      const p = pricing as { items?: PricingItem[] }
      return Array.isArray(p.items) ? p.items : []
    } catch {
      return []
    }
  }

  const pricingList = getPricingList(service.pricing)

  // Parse pricing for packages (legacy)
  const getPricing = (pricing: unknown) => {
    if (!pricing) return null
    try {
      return pricing as {
        basic?: { price?: number; currency?: string; description?: Record<string, string> }
        standard?: { price?: number; currency?: string; description?: Record<string, string> }
        premium?: { price?: number; currency?: string; description?: Record<string, string> }
        features?: string[]
      }
    } catch {
      return null
    }
  }

  const pricing = getPricing(service.pricing)

  // Parse partner logos
  const partnerLogos: { url: string; name?: string }[] = (() => {
    if (!service.partner_logos) return []
    try {
      const logos = service.partner_logos as { url: string; name?: string }[]
      return Array.isArray(logos) ? logos : []
    } catch {
      return []
    }
  })()

  // Parse steps from service data or use defaults
  const defaultSteps = [
    {
      title: { 'hr-HR': 'Priprema', 'en-US': 'Preparation', 'de-DE': 'Vorbereitung' },
      description: {
        'hr-HR': 'Nema posebne pripreme. Preporučujemo doći 10 minuta ranije kako biste ispunili potrebnu dokumentaciju.',
        'en-US': 'No special preparation needed. We recommend arriving 10 minutes early to complete the necessary documentation.',
        'de-DE': 'Keine besondere Vorbereitung erforderlich. Wir empfehlen, 10 Minuten früher zu kommen.',
      },
    },
    {
      title: { 'hr-HR': 'Razgovor', 'en-US': 'Consultation', 'de-DE': 'Gespräch' },
      description: {
        'hr-HR': 'Liječnik će s vama razgovarati o vašem zdravlju, medicinskoj povijesti i eventualnim simptomima.',
        'en-US': 'The doctor will discuss your health, medical history and any symptoms with you.',
        'de-DE': 'Der Arzt wird mit Ihnen über Ihre Gesundheit, Krankengeschichte und eventuelle Symptome sprechen.',
      },
    },
    {
      title: { 'hr-HR': 'Pregled', 'en-US': 'Examination', 'de-DE': 'Untersuchung' },
      description: {
        'hr-HR': 'Profesionalan i brižan pregled u udobnom okruženju s najsuvremenijom opremom.',
        'en-US': 'Professional and caring examination in a comfortable environment with state-of-the-art equipment.',
        'de-DE': 'Professionelle und fürsorgliche Untersuchung in angenehmer Umgebung mit modernster Ausstattung.',
      },
    },
    {
      title: { 'hr-HR': 'Rezultati i plan', 'en-US': 'Results & Plan', 'de-DE': 'Ergebnisse & Plan' },
      description: {
        'hr-HR': 'Detaljan razgovor o nalazu, odgovori na sva pitanja i plan daljnjeg postupanja.',
        'en-US': 'Detailed discussion of findings, answers to all questions and a plan for further action.',
        'de-DE': 'Ausführliche Besprechung der Befunde, Antworten auf alle Fragen und ein Plan für das weitere Vorgehen.',
      },
    },
  ]

  const serviceSteps = (() => {
    if (!service.steps) return null
    try {
      const steps = service.steps as { title: Record<string, string>; description: Record<string, string> }[]
      return Array.isArray(steps) && steps.length > 0 ? steps : null
    } catch {
      return null
    }
  })()

  const whatToExpect = (serviceSteps || defaultSteps).map((step, index) => ({
    step: String(index + 1),
    title: getLocalizedContent(step.title, locale),
    description: getLocalizedContent(step.description, locale),
  }))

  return (
    <div className="bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              {/* Icon */}
              <div
                className="w-20 h-20 rounded-2xl bg-orangeCTA flex items-center justify-center mb-6 shadow-2xl"
              >
                <ServiceIcon className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight font-serif">
                {getLocalizedContent(service.name, locale)}
              </h1>

              {service.short_description && (
                <p className="text-2xl text-gray-300 mb-6">{getLocalizedContent(service.short_description, locale)}</p>
              )}

              {service.description && (
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">{getLocalizedContent(service.description, locale)}</p>
              )}

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#booking"
                    className="block px-8 py-4 bg-orangeCTA text-white rounded-full font-semibold text-center shadow-xl hover:shadow-2xl transition-all"
                  >
                    {locale === 'hr-HR' ? 'Zakaži termin' : locale === 'en-US' ? 'Schedule Appointment' : 'Termin vereinbaren'}
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={
                    getImageUrl(service.featured_image) ||
                    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=800&fit=crop'
                  }
                  alt={getLocalizedContent(service.name, locale)}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-gray-50 border-y border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2 font-serif">{service.duration || '30-60 min'}</div>
              <div className="text-gray-600">{locale === 'hr-HR' ? 'Trajanje' : locale === 'en-US' ? 'Duration' : 'Dauer'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 font-serif">
                {pricing?.basic?.price ? `Od ${pricing.basic.price}€` : 'Od 250€'}
              </div>
              <div className="text-gray-600">{locale === 'hr-HR' ? 'Cijena' : locale === 'en-US' ? 'Price' : 'Preis'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 font-serif">{doctors.length}+</div>
              <div className="text-gray-600">{locale === 'hr-HR' ? 'Stručnjaka' : locale === 'en-US' ? 'Specialists' : 'Spezialisten'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 font-serif">24/7</div>
              <div className="text-gray-600">
                {locale === 'hr-HR' ? 'Online rezervacija' : locale === 'en-US' ? 'Online Booking' : 'Online-Buchung'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              {locale === 'hr-HR' ? 'Što očekivati' : locale === 'en-US' ? 'What to Expect' : 'Was Sie erwartet'}
            </h2>
            <p className="text-gray-600 text-lg">
              {locale === 'hr-HR'
                ? 'Vaš pregled, korak po korak'
                : locale === 'en-US'
                ? 'Your examination, step by step'
                : 'Ihre Untersuchung, Schritt für Schritt'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {whatToExpect.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColor} flex items-center justify-center mb-6 text-white text-2xl font-bold shadow-lg`}
                >
                  {step.step}
                </div>

                <h3 className="text-xl font-bold mb-3 font-serif">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>

                {index < whatToExpect.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing List */}
      {pricingList.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
                {locale === 'hr-HR' ? 'Cjenik' : locale === 'en-US' ? 'Pricing' : 'Preisliste'}
              </h2>
              <p className="text-gray-600 text-lg">
                {locale === 'hr-HR'
                  ? 'Transparentne cijene bez skrivenih troškova'
                  : locale === 'en-US'
                  ? 'Transparent prices with no hidden costs'
                  : 'Transparente Preise ohne versteckte Kosten'}
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {pricingList.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center justify-between p-6 ${
                      index !== pricingList.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {getLocalizedContent(item.title, locale)}
                      </h3>
                      {getLocalizedContent(item.description, locale) && (
                        <p className="text-sm text-gray-500 mt-1">
                          {getLocalizedContent(item.description, locale)}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 text-right">
                      <span className="text-2xl font-bold text-orangeCTA">{item.price}€</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                {locale === 'hr-HR'
                  ? '* Cijene su izražene u eurima (EUR). Za više informacija kontaktirajte nas.'
                  : locale === 'en-US'
                  ? '* Prices are in euros (EUR). Contact us for more information.'
                  : '* Preise sind in Euro (EUR) angegeben. Kontaktieren Sie uns für weitere Informationen.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Our Doctors */}
      {doctors.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
                {locale === 'hr-HR' ? 'Naši stručnjaci' : locale === 'en-US' ? 'Our Specialists' : 'Unsere Spezialisten'}
              </h2>
              <p className="text-gray-600 text-lg">
                {locale === 'hr-HR'
                  ? 'Iskusni liječnici s ljudskim pristupom'
                  : locale === 'en-US'
                  ? 'Experienced doctors with a human approach'
                  : 'Erfahrene Ärzte mit menschlichem Ansatz'}
              </p>
            </motion.div>

            <div className="space-y-20 max-w-5xl mx-auto">
              {doctors.slice(0, 3).map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col md:flex-row gap-10 items-center group"
                >
                  {/* Image with accent */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-4 bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
                    <div className="relative w-72 aspect-[3/4] rounded-2xl overflow-hidden">
                      <img
                        src={
                          getImageUrl(doctor.profile_image) ||
                          'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
                        }
                        alt={doctor.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {doctor.specialty && (
                      <div className="inline-flex items-center gap-2 text-sm text-orangeCTA font-medium mb-3">
                        <span className="w-8 h-px bg-orangeCTA" />
                        <span>{getLocalizedContent(doctor.specialty, locale)}</span>
                      </div>
                    )}
                    <h3 className="text-4xl font-bold mb-3 font-serif">{doctor.name}</h3>
                    {doctor.title && (
                      <p className="text-gray-500 text-lg mb-4 italic">{getLocalizedContent(doctor.title, locale)}</p>
                    )}
                    {doctor.bio && (
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {getLocalizedContent(doctor.bio, locale)}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partner Logos */}
      {partnerLogos.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 font-serif">
                {locale === 'hr-HR'
                  ? 'Naši partneri'
                  : locale === 'en-US'
                  ? 'Our Partners'
                  : 'Unsere Partner'}
              </h2>
              <p className="text-gray-600">
                {locale === 'hr-HR'
                  ? 'Surađujemo s vodećim organizacijama'
                  : locale === 'en-US'
                  ? 'We collaborate with leading organizations'
                  : 'Wir arbeiten mit führenden Organisationen zusammen'}
              </p>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {partnerLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src={getImageUrl(logo.url) || logo.url}
                    alt={logo.name || 'Partner'}
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
                {locale === 'hr-HR'
                  ? 'Što kažu naši pacijenti'
                  : locale === 'en-US'
                  ? 'What Our Patients Say'
                  : 'Was unsere Patienten sagen'}
              </h2>
              <p className="text-gray-600 text-lg">
                {locale === 'hr-HR'
                  ? 'Stvarna iskustva od stvarnih ljudi'
                  : locale === 'en-US'
                  ? 'Real experiences from real people'
                  : 'Echte Erfahrungen von echten Menschen'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  {testimonial.rating && (
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{getLocalizedContent(testimonial.content, locale)}"
                  </p>
                  <div className="font-bold">{testimonial.author_name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Blog Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
                {locale === 'hr-HR'
                  ? 'Povezani članci'
                  : locale === 'en-US'
                  ? 'Related Articles'
                  : 'Verwandte Artikel'}
              </h2>
              <p className="text-gray-600 text-lg">
                {locale === 'hr-HR'
                  ? 'Saznajte više o ovoj usluzi'
                  : locale === 'en-US'
                  ? 'Learn more about this service'
                  : 'Erfahren Sie mehr über diesen Service'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  >
                    {post.featured_image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={getImageUrl(post.featured_image) || ''}
                          alt={getLocalizedContent(post.title, locale)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {post.category && (
                        <div className="text-sm text-orangeCTA font-medium mb-2">
                          {post.category}
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-3 font-serif group-hover:text-orangeCTA transition-colors">
                        {getLocalizedContent(post.title, locale)}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {getLocalizedContent(post.excerpt, locale)}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:text-orangeCTA transition-colors">
                        {locale === 'hr-HR' ? 'Pročitaj više' : locale === 'en-US' ? 'Read more' : 'Mehr lesen'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              {locale === 'hr-HR'
                ? 'Često postavljana pitanja'
                : locale === 'en-US'
                ? 'Frequently Asked Questions'
                : 'Häufig gestellte Fragen'}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-left text-lg">{getLocalizedContent(faq.question, locale)}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6"
                    >
                      <p className="text-gray-600 leading-relaxed">{getLocalizedContent(faq.answer, locale)}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                {locale === 'hr-HR'
                  ? 'Nema dostupnih pitanja za ovu uslugu.'
                  : locale === 'en-US'
                  ? 'No questions available for this service.'
                  : 'Keine Fragen für diesen Service verfügbar.'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="booking"
        className="relative py-32 bg-orangeCTA text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='10' stroke='%23FFF' stroke-width='1' opacity='.1'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-8 text-center relative z-10"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-serif">
            {locale === 'hr-HR'
              ? 'Spremni za prvi korak?'
              : locale === 'en-US'
              ? 'Ready for the first step?'
              : 'Bereit für den ersten Schritt?'}
          </h2>
          <p className="text-2xl mb-10 text-white/90">
            {locale === 'hr-HR'
              ? `Zakažite svoj ${getLocalizedContent(service.name, locale).toLowerCase()} danas`
              : locale === 'en-US'
              ? `Schedule your ${getLocalizedContent(service.name, locale).toLowerCase()} today`
              : `Vereinbaren Sie noch heute Ihren ${getLocalizedContent(service.name, locale)}`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/kontakt"
                className="px-10 py-4 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-900 transition-all inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {locale === 'hr-HR' ? 'Zakaži termin' : locale === 'en-US' ? 'Schedule Appointment' : 'Termin vereinbaren'}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/kontakt"
                className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all inline-block"
              >
                {locale === 'hr-HR' ? 'Postavite pitanje' : locale === 'en-US' ? 'Ask a Question' : 'Stellen Sie eine Frage'}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
