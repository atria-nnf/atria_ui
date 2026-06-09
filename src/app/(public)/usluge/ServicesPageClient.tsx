'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Heart,
  Sparkles,
  Stethoscope,
  TestTube,
  Calendar,
  ArrowRight,
  Check,
  Users,
  Microscope,
  User,
  Zap,
  Building2,
  DollarSign,
  Baby,
  Activity,
  Radio,
  Droplets,
} from 'lucide-react'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import { getImageUrl } from '@/lib/utils/image'
import type { Service, ServicesPageSettings } from '@/types'

interface ServicesPageClientProps {
  initialServices: Service[]
  settings: ServicesPageSettings | null
}

// Category display names
const CATEGORY_DISPLAY_NAMES: Record<string, Record<string, string>> = {
  specialist: {
    'hr-HR': 'Specijalistički pregledi',
    'en-US': 'Specialist Examinations',
    'de-DE': 'Fachärztliche Untersuchungen',
  },
  diagnostics: {
    'hr-HR': 'Dijagnostika',
    'en-US': 'Diagnostics',
    'de-DE': 'Diagnostik',
  },
  preventive: {
    'hr-HR': 'Preventiva',
    'en-US': 'Preventive Care',
    'de-DE': 'Vorsorge',
  },
  aesthetic: {
    'hr-HR': 'Estetika',
    'en-US': 'Aesthetics',
    'de-DE': 'Ästhetik',
  },
}

// Category colors - all blue/purple
const CATEGORY_COLORS: Record<string, string> = {
  specialist: 'from-blue-600 to-indigo-600',
  diagnostics: 'from-indigo-600 to-purple-600',
  preventive: 'from-blue-500 to-indigo-500',
  aesthetic: 'from-purple-500 to-indigo-500',
}

// Category icons (fallback)
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  specialist: Heart,
  diagnostics: TestTube,
  preventive: Stethoscope,
  aesthetic: Sparkles,
}

// Service-specific icons by slug
const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  kardiologija: Heart,
  ginekologija: Baby,
  'intimno-zdravlje': Baby,
  endokrinologija: Activity,
  ultrazvuk: Radio,
  'color-doppler': Radio,
  laboratorij: TestTube,
}

// Default icon mapping for "why choose us" items
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Microscope,
  User,
  Zap,
  Building2,
  DollarSign,
  Heart,
  Stethoscope,
}

export function ServicesPageClient({ initialServices, settings }: ServicesPageClientProps) {
  const { locale } = useLocale()
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Extract unique categories from services
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(initialServices.map((s) => s.category).filter(Boolean))]
    return [
      { id: 'all', name: locale === 'hr-HR' ? 'Sve usluge' : locale === 'en-US' ? 'All Services' : 'Alle Dienste' },
      ...uniqueCategories.map((cat) => ({
        id: cat!,
        name: CATEGORY_DISPLAY_NAMES[cat!]?.[locale] || cat,
      })),
    ]
  }, [initialServices, locale])

  // Filter services by category
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return initialServices
    return initialServices.filter((service) => service.category === selectedCategory)
  }, [initialServices, selectedCategory])

  // Get icon component for service (by slug first, then category fallback)
  const getIconForService = (slug: string, category: string | null) => {
    return SERVICE_ICONS[slug] || CATEGORY_ICONS[category || ''] || Stethoscope
  }

  // Get color gradient for category (all blue/purple now)
  const getColorForCategory = () => {
    return 'from-slate-900 to-blue-950'
  }

  // Parse pricing from JSON
  const getPriceDisplay = (pricing: unknown): string | null => {
    if (!pricing) return null
    try {
      const p = pricing as { basic?: { price?: number; currency?: string } }
      if (p.basic?.price) {
        return `${p.basic.price} ${p.basic.currency || 'EUR'}`
      }
    } catch {
      return null
    }
    return null
  }

  // Parse features from pricing or other JSON field
  const getFeatures = (pricing: unknown): string[] => {
    if (!pricing) return []
    try {
      const p = pricing as { features?: string[] }
      return p.features || []
    } catch {
      return []
    }
  }

  // Default stats data
  const defaultStats = [
    { number: '8+', label: { 'hr-HR': 'Specijaliziranih usluga', 'en-US': 'Specialized Services', 'de-DE': 'Spezialisierte Dienste' } },
    { number: '5000+', label: { 'hr-HR': 'Zadovoljnih pacijenata', 'en-US': 'Satisfied Patients', 'de-DE': 'Zufriedene Patienten' } },
    { number: '10+', label: { 'hr-HR': 'Godina iskustva', 'en-US': 'Years of Experience', 'de-DE': 'Jahre Erfahrung' } },
    { number: '24/7', label: { 'hr-HR': 'Online rezervacija', 'en-US': 'Online Booking', 'de-DE': 'Online-Buchung' } },
  ]

  // Use settings stats or defaults
  const stats = useMemo(() => {
    const statsData = settings?.stats && settings.stats.length > 0 ? settings.stats : defaultStats
    return statsData.map((stat) => ({
      number: stat.number,
      label: getLocalizedContent(stat.label, locale),
    }))
  }, [settings?.stats, locale])

  // Default why choose us items
  const defaultWhyChooseUs = [
    { title: { 'hr-HR': 'Strucni tim', 'en-US': 'Expert Team', 'de-DE': 'Expertenteam' }, description: { 'hr-HR': 'Iskusni lijecnici s godinama specijalizacije i kontinuiranom edukacijom.', 'en-US': 'Experienced doctors with years of specialization and continuous education.', 'de-DE': 'Erfahrene Ärzte mit jahrelanger Spezialisierung und kontinuierlicher Weiterbildung.' }, icon: 'Users' },
    { title: { 'hr-HR': 'Moderna oprema', 'en-US': 'Modern Equipment', 'de-DE': 'Moderne Ausstattung' }, description: { 'hr-HR': 'Najsuvremenija medicinska tehnologija za preciznu dijagnostiku.', 'en-US': 'State-of-the-art medical technology for precise diagnostics.', 'de-DE': 'Modernste Medizintechnik für präzise Diagnostik.' }, icon: 'Microscope' },
    { title: { 'hr-HR': 'Personalizirani pristup', 'en-US': 'Personalized Approach', 'de-DE': 'Personalisierter Ansatz' }, description: { 'hr-HR': 'Svaki pacijent je jedinstven - tretiramo vas kao osobu, ne broj.', 'en-US': 'Every patient is unique - we treat you as a person, not a number.', 'de-DE': 'Jeder Patient ist einzigartig - wir behandeln Sie als Person, nicht als Nummer.' }, icon: 'User' },
    { title: { 'hr-HR': 'Brzi termini', 'en-US': 'Quick Appointments', 'de-DE': 'Schnelle Termine' }, description: { 'hr-HR': 'Online rezervacija 24/7 i kraci vremenski razmaci do pregleda.', 'en-US': 'Online booking 24/7 and shorter waiting times for appointments.', 'de-DE': 'Online-Buchung rund um die Uhr und kürzere Wartezeiten.' }, icon: 'Zap' },
    { title: { 'hr-HR': 'Sveobuhvatna skrb', 'en-US': 'Comprehensive Care', 'de-DE': 'Umfassende Versorgung' }, description: { 'hr-HR': 'Sve usluge na jednom mjestu - od prevencije do lijecenja.', 'en-US': 'All services in one place - from prevention to treatment.', 'de-DE': 'Alle Leistungen an einem Ort - von der Prävention bis zur Behandlung.' }, icon: 'Building2' },
    { title: { 'hr-HR': 'Transparentne cijene', 'en-US': 'Transparent Prices', 'de-DE': 'Transparente Preise' }, description: { 'hr-HR': 'Jasne cijene bez skrivenih troskova. Znate sto placate.', 'en-US': 'Clear prices with no hidden costs. You know what you pay.', 'de-DE': 'Klare Preise ohne versteckte Kosten. Sie wissen, was Sie bezahlen.' }, icon: 'DollarSign' },
  ]

  // Color mapping for why choose us items
  const ITEM_COLORS = [
    'from-blue-500 to-cyan-500',
    'from-blue-500 to-indigo-500',
    'from-blue-600 to-indigo-600',
    'from-yellow-500 to-orange-500',
    'from-green-500 to-emerald-500',
    'from-indigo-500 to-purple-500',
  ]

  // Use settings whyChooseUs or defaults
  const whyChooseUsItems = useMemo(() => {
    const items = settings?.whyChooseUs && settings.whyChooseUs.length > 0 ? settings.whyChooseUs : defaultWhyChooseUs
    return items.map((item, index) => ({
      title: getLocalizedContent(item.title, locale),
      description: getLocalizedContent(item.description, locale),
      icon: ICON_MAP[item.icon] || Stethoscope,
      color: ITEM_COLORS[index % ITEM_COLORS.length],
    }))
  }, [settings?.whyChooseUs, locale])

  // Hero text with fallbacks
  const defaultHeroTitle = { 'hr-HR': 'Sveobuhvatna\nbriga o zdravlju', 'en-US': 'Comprehensive\nHealthcare', 'de-DE': 'Umfassende\nGesundheitsversorgung' }
  const defaultHeroSubtitle = { 'hr-HR': 'Od preventivnih pregleda do specijaliziranih tretmana - sve sto vam treba za zdravlje na jednom mjestu.', 'en-US': 'From preventive examinations to specialized treatments - everything you need for your health in one place.', 'de-DE': 'Von Vorsorgeuntersuchungen bis zu spezialisierten Behandlungen - alles, was Sie für Ihre Gesundheit brauchen, an einem Ort.' }
  const heroTitle = getLocalizedContent(settings?.heroTitle, locale) || getLocalizedContent(defaultHeroTitle, locale)
  const heroSubtitle = getLocalizedContent(settings?.heroSubtitle, locale) || getLocalizedContent(defaultHeroSubtitle, locale)

  // CTA text with fallbacks
  const defaultCtaTitle = { 'hr-HR': 'Spremni za prvi korak?', 'en-US': 'Ready for the first step?', 'de-DE': 'Bereit für den ersten Schritt?' }
  const defaultCtaSubtitle = { 'hr-HR': 'Zakazite svoj pregled danas i zapocnite put prema boljem zdravlju', 'en-US': 'Schedule your examination today and start your journey to better health', 'de-DE': 'Vereinbaren Sie noch heute Ihre Untersuchung und beginnen Sie Ihren Weg zu besserer Gesundheit' }
  const ctaTitle = getLocalizedContent(settings?.ctaTitle, locale) || getLocalizedContent(defaultCtaTitle, locale)
  const ctaSubtitle = getLocalizedContent(settings?.ctaSubtitle, locale) || getLocalizedContent(defaultCtaSubtitle, locale)

  return (
    <div className="bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white py-32 overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-sm tracking-widest text-white/80 mb-6">
              {locale === 'hr-HR' ? 'NAŠE USLUGE' : locale === 'en-US' ? 'OUR SERVICES' : 'UNSERE LEISTUNGEN'}
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight font-serif whitespace-pre-line">
              {heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-orangeCTA text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl font-bold mb-2 text-orangeCTA font-serif">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              {locale === 'hr-HR' ? 'Pronađite svoju uslugu' : locale === 'en-US' ? 'Find Your Service' : 'Finden Sie Ihren Service'}
            </h2>
            <p className="text-gray-600 text-lg">
              {filteredServices.length}{' '}
              {locale === 'hr-HR' ? 'usluga dostupno' : locale === 'en-US' ? 'services available' : 'Dienste verfügbar'}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredServices.map((service, index) => {
              const ServiceIcon = getIconForService(service.slug, service.category)
              const features = getFeatures(service.pricing)
              const price = getPriceDisplay(service.pricing)

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Badge */}
                    {service.is_featured && (
                      <div className="absolute top-6 right-6 z-10">
                        <span className="px-4 py-2 bg-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
                          {locale === 'hr-HR' ? 'POPULARNO' : locale === 'en-US' ? 'POPULAR' : 'BELIEBT'}
                        </span>
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={
                          getImageUrl(service.featured_image) ||
                          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop'
                        }
                        alt={getLocalizedContent(service.name, locale)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Icon */}
                      <div
                        className={`absolute top-6 left-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${getColorForCategory()} flex items-center justify-center shadow-xl`}
                      >
                        <ServiceIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-3xl font-bold mb-2 font-serif">
                        {getLocalizedContent(service.name, locale)}
                      </h3>

                      {service.short_description && (
                        <p className="text-sm text-gray-500 mb-4 font-medium">
                          {getLocalizedContent(service.short_description, locale)}
                        </p>
                      )}

                      {service.description && (
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {getLocalizedContent(service.description, locale)}
                        </p>
                      )}

                      {/* Features */}
                      {features.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {features.slice(0, 4).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {features.length > 4 && (
                            <div className="text-sm text-gray-500 italic">
                              +{features.length - 4}{' '}
                              {locale === 'hr-HR' ? 'više usluga' : locale === 'en-US' ? 'more features' : 'weitere Funktionen'}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 mb-6 text-sm text-gray-600 pb-6 border-b border-gray-200">
                        {service.duration && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{service.duration}</span>
                          </div>
                        )}
                        {price && <div className="font-semibold text-gray-900">{price}</div>}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex gap-3">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Link
                            href={`/usluge/${service.slug}`}
                            className={`block py-3 rounded-xl font-semibold text-white text-center bg-gradient-to-r ${getColorForCategory()} hover:shadow-lg transition-all`}
                          >
                            {locale === 'hr-HR' ? 'Saznaj više' : locale === 'en-US' ? 'Learn More' : 'Mehr erfahren'}
                          </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Link
                            href="/kontakt"
                            className="block py-3 rounded-xl font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-center transition-all"
                          >
                            {locale === 'hr-HR' ? 'Rezerviraj' : locale === 'en-US' ? 'Book Now' : 'Jetzt buchen'}
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              {locale === 'hr-HR' ? 'Zašto odabrati Atriu?' : locale === 'en-US' ? 'Why Choose Atria?' : 'Warum Atria wählen?'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {locale === 'hr-HR'
                ? 'Više od klinike - partner u vašem zdravstvenom putovanju'
                : locale === 'en-US'
                ? 'More than a clinic - a partner in your health journey'
                : 'Mehr als eine Klinik - ein Partner auf Ihrem Gesundheitsweg'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUsItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-orangeCTA text-white overflow-hidden">
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
            {ctaTitle}
          </h2>
          <p className="text-2xl mb-10 text-white/90">
            {ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/kontakt"
                className="px-10 py-4 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-900 transition-all inline-flex items-center justify-center gap-2"
              >
                {locale === 'hr-HR' ? 'Zakaži termin' : locale === 'en-US' ? 'Schedule Appointment' : 'Termin vereinbaren'}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/kontakt"
                className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all inline-block"
              >
                {locale === 'hr-HR' ? 'Kontaktiraj nas' : locale === 'en-US' ? 'Contact Us' : 'Kontaktieren Sie uns'}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
