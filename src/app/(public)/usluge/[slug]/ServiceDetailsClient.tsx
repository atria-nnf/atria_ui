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
} from 'lucide-react'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import { getImageUrl } from '@/lib/utils/image'
import type { Service, Doctor, Testimonial } from '@/types'

interface ServiceDetailsClientProps {
  service: Service
  doctors: Doctor[]
  testimonials: Testimonial[]
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
  specialist: 'from-pink-500 to-rose-500',
  diagnostics: 'from-blue-500 to-cyan-500',
  preventive: 'from-indigo-500 to-purple-500',
  aesthetic: 'from-rose-500 to-pink-500',
}

export function ServiceDetailsClient({
  service,
  doctors,
  testimonials,
}: ServiceDetailsClientProps) {
  const { locale } = useLocale()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const ServiceIcon = CATEGORY_ICONS[service.category || ''] || Heart
  const categoryColor = CATEGORY_COLORS[service.category || ''] || 'from-gray-500 to-gray-600'

  // Parse pricing for packages
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

  // Static content - packages
  const packages = [
    {
      id: 'basic',
      name: locale === 'hr-HR' ? 'Osnovni pregled' : locale === 'en-US' ? 'Basic Examination' : 'Grunduntersuchung',
      price: pricing?.basic?.price ? `${pricing.basic.price}${pricing.basic.currency || '€'}` : '250€',
      duration: '30 min',
      description: locale === 'hr-HR' ? 'Rutinski pregled' : locale === 'en-US' ? 'Routine examination' : 'Routineuntersuchung',
      features:
        locale === 'hr-HR'
          ? ['Pregled', 'Konzultacija', 'Preporuke za daljnje postupanje', 'Osnovni savjeti']
          : locale === 'en-US'
          ? ['Examination', 'Consultation', 'Recommendations for further treatment', 'Basic advice']
          : ['Untersuchung', 'Beratung', 'Empfehlungen für weitere Behandlung', 'Grundlegende Ratschläge'],
    },
    {
      id: 'complete',
      name: locale === 'hr-HR' ? 'Kompletan pregled' : locale === 'en-US' ? 'Complete Examination' : 'Vollständige Untersuchung',
      price: pricing?.standard?.price ? `${pricing.standard.price}${pricing.standard.currency || '€'}` : '450€',
      duration: '45 min',
      description: locale === 'hr-HR' ? 'Sveobuhvatan pregled' : locale === 'en-US' ? 'Comprehensive examination' : 'Umfassende Untersuchung',
      features:
        locale === 'hr-HR'
          ? ['Sve iz osnovnog', 'Ultrazvuk', 'Laboratorijske pretrage', 'Detaljan pisani nalaz', 'Praćenje rezultata']
          : locale === 'en-US'
          ? ['Everything from basic', 'Ultrasound', 'Laboratory tests', 'Detailed written findings', 'Results monitoring']
          : ['Alles vom Basis', 'Ultraschall', 'Labortests', 'Detaillierte schriftliche Befunde', 'Ergebnisüberwachung'],
      popular: true,
    },
    {
      id: 'premium',
      name: locale === 'hr-HR' ? 'Premium paket' : locale === 'en-US' ? 'Premium Package' : 'Premium-Paket',
      price: pricing?.premium?.price ? `${pricing.premium.price}${pricing.premium.currency || '€'}` : '850€',
      duration: locale === 'hr-HR' ? 'Kompletno praćenje' : locale === 'en-US' ? 'Complete follow-up' : 'Komplette Nachsorge',
      description: locale === 'hr-HR' ? 'Kompletna skrb' : locale === 'en-US' ? 'Complete care' : 'Vollständige Betreuung',
      features:
        locale === 'hr-HR'
          ? ['Svi pregledi', 'Sve laboratorijske pretrage', 'Savjetovanje', 'Priprema', '24/7 dostupnost liječnika']
          : locale === 'en-US'
          ? ['All examinations', 'All laboratory tests', 'Counseling', 'Preparation', '24/7 doctor availability']
          : ['Alle Untersuchungen', 'Alle Labortests', 'Beratung', 'Vorbereitung', '24/7 Arztverfügbarkeit'],
    },
  ]

  // Static content - What to expect
  const whatToExpect = [
    {
      step: '1',
      title: locale === 'hr-HR' ? 'Priprema' : locale === 'en-US' ? 'Preparation' : 'Vorbereitung',
      description:
        locale === 'hr-HR'
          ? 'Nema posebne pripreme. Preporučujemo doći 10 minuta ranije kako biste ispunili potrebnu dokumentaciju.'
          : locale === 'en-US'
          ? 'No special preparation needed. We recommend arriving 10 minutes early to complete the necessary documentation.'
          : 'Keine besondere Vorbereitung erforderlich. Wir empfehlen, 10 Minuten früher zu kommen.',
    },
    {
      step: '2',
      title: locale === 'hr-HR' ? 'Razgovor' : locale === 'en-US' ? 'Consultation' : 'Gespräch',
      description:
        locale === 'hr-HR'
          ? 'Liječnik će s vama razgovarati o vašem zdravlju, medicinskoj povijesti i eventualnim simptomima.'
          : locale === 'en-US'
          ? 'The doctor will discuss your health, medical history and any symptoms with you.'
          : 'Der Arzt wird mit Ihnen über Ihre Gesundheit, Krankengeschichte und eventuelle Symptome sprechen.',
    },
    {
      step: '3',
      title: locale === 'hr-HR' ? 'Pregled' : locale === 'en-US' ? 'Examination' : 'Untersuchung',
      description:
        locale === 'hr-HR'
          ? 'Profesionalan i brižan pregled u udobnom okruženju s najsuvremenijom opremom.'
          : locale === 'en-US'
          ? 'Professional and caring examination in a comfortable environment with state-of-the-art equipment.'
          : 'Professionelle und fürsorgliche Untersuchung in angenehmer Umgebung mit modernster Ausstattung.',
    },
    {
      step: '4',
      title: locale === 'hr-HR' ? 'Rezultati i plan' : locale === 'en-US' ? 'Results & Plan' : 'Ergebnisse & Plan',
      description:
        locale === 'hr-HR'
          ? 'Detaljan razgovor o nalazu, odgovori na sva pitanja i plan daljnjeg postupanja.'
          : locale === 'en-US'
          ? 'Detailed discussion of findings, answers to all questions and a plan for further action.'
          : 'Ausführliche Besprechung der Befunde, Antworten auf alle Fragen und ein Plan für das weitere Vorgehen.',
    },
  ]

  // Static content - FAQs
  const faqs = [
    {
      question:
        locale === 'hr-HR'
          ? 'Koliko često trebam dolaziti na pregled?'
          : locale === 'en-US'
          ? 'How often should I come for an examination?'
          : 'Wie oft sollte ich zur Untersuchung kommen?',
      answer:
        locale === 'hr-HR'
          ? 'Preporučujemo godišnje kontrolne preglede. Ako imate specifične zdravstvene probleme, pregledi mogu biti češći prema preporuci vašeg liječnika.'
          : locale === 'en-US'
          ? 'We recommend annual check-ups. If you have specific health issues, examinations may be more frequent as recommended by your doctor.'
          : 'Wir empfehlen jährliche Vorsorgeuntersuchungen. Bei spezifischen Gesundheitsproblemen können häufigere Untersuchungen erforderlich sein.',
    },
    {
      question:
        locale === 'hr-HR'
          ? 'Trebam li uputnicu?'
          : locale === 'en-US'
          ? 'Do I need a referral?'
          : 'Brauche ich eine Überweisung?',
      answer:
        locale === 'hr-HR'
          ? 'Uputnica nije potrebna. Možete se naručiti direktno kod nas telefonom ili online.'
          : locale === 'en-US'
          ? 'No referral is needed. You can book directly with us by phone or online.'
          : 'Keine Überweisung erforderlich. Sie können direkt bei uns telefonisch oder online buchen.',
    },
    {
      question:
        locale === 'hr-HR'
          ? 'Što trebam ponijeti na prvi pregled?'
          : locale === 'en-US'
          ? 'What should I bring to my first appointment?'
          : 'Was sollte ich zum ersten Termin mitbringen?',
      answer:
        locale === 'hr-HR'
          ? 'Donesite vašu zdravstvenu iskaznicu, prethodne medicinske nalaze (ako ih imate), i popis lijekova koje uzimate.'
          : locale === 'en-US'
          ? 'Bring your health card, previous medical records (if any), and a list of medications you are taking.'
          : 'Bringen Sie Ihre Gesundheitskarte, frühere medizinische Befunde (falls vorhanden) und eine Liste der Medikamente, die Sie einnehmen, mit.',
    },
    {
      question:
        locale === 'hr-HR'
          ? 'Kada dobijem rezultate?'
          : locale === 'en-US'
          ? 'When will I get my results?'
          : 'Wann erhalte ich meine Ergebnisse?',
      answer:
        locale === 'hr-HR'
          ? 'Osnovni nalazi dostupni su odmah nakon pregleda. Laboratorijske pretrage obično su gotove u roku od 7-10 dana.'
          : locale === 'en-US'
          ? 'Basic findings are available immediately after the examination. Laboratory tests are usually ready within 7-10 days.'
          : 'Grundlegende Befunde sind sofort nach der Untersuchung verfügbar. Labortests sind in der Regel innerhalb von 7-10 Tagen fertig.',
    },
  ]

  return (
    <div className="bg-white text-black font-sans">
      {/* Back Button */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/usluge" className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span>{locale === 'hr-HR' ? 'Natrag na usluge' : locale === 'en-US' ? 'Back to services' : 'Zurück zu den Diensten'}</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white overflow-hidden">
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
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${categoryColor} flex items-center justify-center mb-6 shadow-2xl`}
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

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#booking"
                    className={`block px-8 py-4 bg-gradient-to-r ${categoryColor} text-white rounded-full font-semibold text-center shadow-xl hover:shadow-2xl transition-all`}
                  >
                    {locale === 'hr-HR' ? 'Zakaži termin' : locale === 'en-US' ? 'Schedule Appointment' : 'Termin vereinbaren'}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#packages"
                    className="block px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-semibold text-center hover:bg-white/20 transition-all"
                  >
                    {locale === 'hr-HR' ? 'Pogledaj cijene' : locale === 'en-US' ? 'View Prices' : 'Preise ansehen'}
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

      {/* Packages */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              {locale === 'hr-HR' ? 'Odaberite svoj paket' : locale === 'en-US' ? 'Choose Your Package' : 'Wählen Sie Ihr Paket'}
            </h2>
            <p className="text-gray-600 text-lg">
              {locale === 'hr-HR'
                ? 'Prilagođeni paketi za različite potrebe'
                : locale === 'en-US'
                ? 'Tailored packages for different needs'
                : 'Maßgeschneiderte Pakete für verschiedene Bedürfnisse'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl p-8 transition-all ${
                  pkg.popular ? 'shadow-2xl border-2 border-orange-500 scale-105' : 'shadow-lg hover:shadow-xl'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full text-sm font-bold shadow-lg">
                      {locale === 'hr-HR' ? 'NAJPOPULARNIJE' : locale === 'en-US' ? 'MOST POPULAR' : 'AM BELIEBTESTEN'}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 font-serif">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{pkg.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold font-serif">{pkg.price}</span>
                  </div>
                  <div className="text-gray-600 mt-2">{pkg.duration}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-full font-semibold transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {locale === 'hr-HR' ? 'Odaberi paket' : locale === 'en-US' ? 'Select Package' : 'Paket auswählen'}
                </motion.button>
              </motion.div>
            ))}
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

      {/* Our Doctors */}
      {doctors.length > 0 && (
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {doctors.slice(0, 3).map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={
                        getImageUrl(doctor.profile_image) ||
                        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
                      }
                      alt={doctor.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 font-serif">{doctor.name}</h3>
                    {doctor.title && <p className="text-gray-600 mb-4">{getLocalizedContent(doctor.title, locale)}</p>}
                    {doctor.specialty && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{getLocalizedContent(doctor.specialty, locale)}</span>
                      </div>
                    )}
                  </div>
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
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
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
                  <span className="font-bold text-left text-lg">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-6"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="booking"
        className="relative py-32 bg-gradient-to-br from-orange-500 via-rose-500 to-pink-500 text-white overflow-hidden"
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
