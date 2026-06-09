'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Target, Heart, Lightbulb, Shield, ArrowRight, Users, Microscope, User, Zap, Building2, DollarSign, Stethoscope, Award } from 'lucide-react'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import { getImageUrl } from '@/lib/utils/image'
import type { Doctor, AboutUsSettings } from '@/types'

// Icon mapping
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Heart,
  Lightbulb,
  Shield,
  Users,
  Microscope,
  User,
  Zap,
  Building2,
  DollarSign,
  Stethoscope,
  Award,
}

interface AboutUsPageClientProps {
  aboutData: AboutUsSettings | null
  doctors: Doctor[]
}

export function AboutUsPageClient({ aboutData, doctors }: AboutUsPageClientProps) {
  const { locale } = useLocale()

  // Default values
  const defaultValues = [
    {
      icon: 'Target',
      title: { 'hr-HR': 'Izvrsnost', 'en-US': 'Excellence', 'de-DE': 'Exzellenz' },
      description: { 'hr-HR': 'Težimo najvišim standardima u svakom aspektu našeg rada.', 'en-US': 'We strive for the highest standards in every aspect of our work.', 'de-DE': 'Wir streben nach höchsten Standards in jedem Aspekt unserer Arbeit.' },
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: 'Heart',
      title: { 'hr-HR': 'Empatija', 'en-US': 'Empathy', 'de-DE': 'Empathie' },
      description: { 'hr-HR': 'Svaki pacijent je jedinstven i zaslužuje osobnu pažnju i razumijevanje.', 'en-US': 'Every patient is unique and deserves personal attention and understanding.', 'de-DE': 'Jeder Patient ist einzigartig und verdient persönliche Aufmerksamkeit und Verständnis.' },
      color: 'from-orangeCTA to-orange-600',
    },
    {
      icon: 'Lightbulb',
      title: { 'hr-HR': 'Inovacija', 'en-US': 'Innovation', 'de-DE': 'Innovation' },
      description: { 'hr-HR': 'Kontinuirano usvajamo najnovije medicinske tehnologije i metode.', 'en-US': 'We continuously adopt the latest medical technologies and methods.', 'de-DE': 'Wir übernehmen kontinuierlich die neuesten medizinischen Technologien und Methoden.' },
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: 'Shield',
      title: { 'hr-HR': 'Povjerenje', 'en-US': 'Trust', 'de-DE': 'Vertrauen' },
      description: { 'hr-HR': 'Gradimo dugoročne odnose temeljene na povjerenju i transparentnosti.', 'en-US': 'We build long-term relationships based on trust and transparency.', 'de-DE': 'Wir bauen langfristige Beziehungen auf, die auf Vertrauen und Transparenz basieren.' },
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const defaultStats = [
    { number: '10+', label: { 'hr-HR': 'Godina iskustva', 'en-US': 'Years of Experience', 'de-DE': 'Jahre Erfahrung' } },
    { number: '15,000+', label: { 'hr-HR': 'Zadovoljnih pacijenata', 'en-US': 'Satisfied Patients', 'de-DE': 'Zufriedene Patienten' } },
    { number: '20+', label: { 'hr-HR': 'Medicinskih usluga', 'en-US': 'Medical Services', 'de-DE': 'Medizinische Leistungen' } },
    { number: '7', label: { 'hr-HR': 'Stručnih liječnika', 'en-US': 'Expert Doctors', 'de-DE': 'Fachärzte' } },
  ]

  const defaultMilestones = [
    { year: '2014', event: { 'hr-HR': 'Osnivanje poliklinike', 'en-US': 'Clinic founded', 'de-DE': 'Gründung der Klinik' } },
    { year: '2016', event: { 'hr-HR': 'Proširenje tima i usluga', 'en-US': 'Team and services expansion', 'de-DE': 'Erweiterung des Teams und der Dienste' } },
    { year: '2019', event: { 'hr-HR': 'Moderna dijagnostička oprema', 'en-US': 'Modern diagnostic equipment', 'de-DE': 'Moderne Diagnosegeräte' } },
    { year: '2022', event: { 'hr-HR': 'Renovacija i proširenje', 'en-US': 'Renovation and expansion', 'de-DE': 'Renovierung und Erweiterung' } },
  ]

  // Hero text with fallbacks
  const defaultHeroTitle = { 'hr-HR': 'Više od\nklinike', 'en-US': 'More than\na clinic', 'de-DE': 'Mehr als\neine Klinik' }
  const defaultHeroSubtitle = { 'hr-HR': 'Mjesto gdje se moderna medicina susreće s ljudskim pristupom. Vaše zdravlje je naša misija.', 'en-US': 'Where modern medicine meets a human approach. Your health is our mission.', 'de-DE': 'Wo moderne Medizin auf einen menschlichen Ansatz trifft. Ihre Gesundheit ist unsere Mission.' }
  const heroTitle = getLocalizedContent(aboutData?.heroTitle, locale) || getLocalizedContent(defaultHeroTitle, locale)
  const heroSubtitle = getLocalizedContent(aboutData?.heroSubtitle, locale) || getLocalizedContent(defaultHeroSubtitle, locale)

  // Stats with fallbacks
  const stats = useMemo(() => {
    const statsData = aboutData?.stats && aboutData.stats.length > 0 ? aboutData.stats : defaultStats
    return statsData.map((stat) => ({
      number: stat.number,
      label: getLocalizedContent(stat.label, locale),
    }))
  }, [aboutData?.stats, locale])

  // Story section with fallbacks
  const defaultStoryTitle = { 'hr-HR': 'Posvećeni vašem zdravlju od samog početka', 'en-US': 'Dedicated to your health from the very beginning', 'de-DE': 'Von Anfang an Ihrer Gesundheit verpflichtet' }
  const defaultStoryParagraph1 = { 'hr-HR': 'Poliklinika Atria osnovana je s jasnom vizijom: pružiti vrhunsku medicinsku skrb u toplom i pristupačnom okruženju. Vjerujemo da svaki pacijent zaslužuje osobnu pažnju i najviše standarde zdravstvene zaštite.', 'en-US': 'Atria Polyclinic was founded with a clear vision: to provide top-quality medical care in a warm and welcoming environment. We believe every patient deserves personal attention and the highest standards of healthcare.', 'de-DE': 'Die Poliklinik Atria wurde mit einer klaren Vision gegründet: erstklassige medizinische Versorgung in einer warmen und einladenden Umgebung zu bieten.' }
  const defaultStoryParagraph2 = { 'hr-HR': 'Naš tim iskusnih liječnika i medicinskog osoblja svakodnevno radi na tome da vam pružimo najbolju moguću skrb, kombinirajući najnovije medicinske tehnologije s ljudskim pristupom.', 'en-US': 'Our team of experienced doctors and medical staff works every day to provide you with the best possible care, combining the latest medical technologies with a human approach.', 'de-DE': 'Unser Team aus erfahrenen Ärzten und medizinischem Personal arbeitet täglich daran, Ihnen die bestmögliche Versorgung zu bieten.' }
  const storyTitle = getLocalizedContent(aboutData?.storyTitle, locale) || getLocalizedContent(defaultStoryTitle, locale)
  const storyParagraph1 = getLocalizedContent(aboutData?.storyParagraph1, locale) || getLocalizedContent(defaultStoryParagraph1, locale)
  const storyParagraph2 = getLocalizedContent(aboutData?.storyParagraph2, locale) || getLocalizedContent(defaultStoryParagraph2, locale)
  const storyImage = getImageUrl(aboutData?.storyImage) || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop'

  // Milestones with fallbacks
  const milestones = useMemo(() => {
    const milestonesData = aboutData?.milestones && aboutData.milestones.length > 0 ? aboutData.milestones : defaultMilestones
    return milestonesData.map((m) => ({
      year: m.year,
      event: getLocalizedContent(m.event, locale),
    }))
  }, [aboutData?.milestones, locale])

  // Values with fallbacks
  const values = useMemo(() => {
    const valuesData = aboutData?.values && aboutData.values.length > 0 ? aboutData.values : defaultValues
    return valuesData.map((v) => ({
      icon: ICON_MAP[v.icon] || Heart,
      title: getLocalizedContent(v.title, locale),
      description: getLocalizedContent(v.description, locale),
      color: v.color,
    }))
  }, [aboutData?.values, locale])

  // CTA with fallbacks
  const defaultCtaTitle = { 'hr-HR': 'Postanite dio naše priče', 'en-US': 'Become part of our story', 'de-DE': 'Werden Sie Teil unserer Geschichte' }
  const defaultCtaSubtitle = { 'hr-HR': 'Zakažite svoj prvi pregled i doživite razliku', 'en-US': 'Schedule your first appointment and experience the difference', 'de-DE': 'Vereinbaren Sie Ihren ersten Termin und erleben Sie den Unterschied' }
  const ctaTitle = getLocalizedContent(aboutData?.ctaTitle, locale) || getLocalizedContent(defaultCtaTitle, locale)
  const ctaSubtitle = getLocalizedContent(aboutData?.ctaSubtitle, locale) || getLocalizedContent(defaultCtaSubtitle, locale)

  return (
    <div className="bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="text-sm tracking-widest text-blue-300 mb-6">
              {locale === 'hr-HR' ? 'O NAMA' : locale === 'en-US' ? 'ABOUT US' : 'ÜBER UNS'}
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight font-serif whitespace-pre-line">
              {heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              {heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
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

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-orangeCTA" />
                <span className="text-sm tracking-widest text-orange-500 font-semibold">
                  {locale === 'hr-HR' ? 'NAŠA PRIČA' : locale === 'en-US' ? 'OUR STORY' : 'UNSERE GESCHICHTE'}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                {storyTitle}
              </h2>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {storyParagraph1}
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                {storyParagraph2}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={storyImage}
                  alt="Atria Polyclinic"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Timeline */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <h4 className="font-bold mb-4">{locale === 'hr-HR' ? 'Naš put' : locale === 'en-US' ? 'Our Journey' : 'Unser Weg'}</h4>
                <div className="space-y-3">
                  {milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-sm font-bold text-orange-500">{m.year}</span>
                      <span className="text-sm text-gray-600">{m.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              {locale === 'hr-HR' ? 'Naše vrijednosti' : locale === 'en-US' ? 'Our Values' : 'Unsere Werte'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {locale === 'hr-HR'
                ? 'Principi koji nas vode u svakodnevnom radu'
                : locale === 'en-US'
                ? 'The principles that guide us in our daily work'
                : 'Die Prinzipien, die uns in unserer täglichen Arbeit leiten'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-6`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {doctors.length > 0 && (
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
                {locale === 'hr-HR' ? 'Naš tim' : locale === 'en-US' ? 'Our Team' : 'Unser Team'}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {locale === 'hr-HR'
                  ? 'Upoznajte stručnjake koji brinu o vašem zdravlju'
                  : locale === 'en-US'
                  ? 'Meet the experts who care for your health'
                  : 'Lernen Sie die Experten kennen, die sich um Ihre Gesundheit kümmern'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {doctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={
                        getImageUrl(doctor.profile_image) ||
                        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop'
                      }
                      alt={doctor.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 font-serif">{doctor.name}</h3>
                    {doctor.title && <p className="text-gray-600">{getLocalizedContent(doctor.title, locale)}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/lijecnici"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-orangeCTA text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {locale === 'hr-HR' ? 'Svi liječnici' : locale === 'en-US' ? 'All Doctors' : 'Alle Ärzte'}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-orangeCTA text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-8 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            {ctaTitle}
          </h2>
          <p className="text-xl mb-10 text-white/90">
            {ctaSubtitle}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/kontakt"
              className="inline-block px-12 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-900 transition-all"
            >
              {locale === 'hr-HR' ? 'Kontaktirajte nas' : locale === 'en-US' ? 'Contact Us' : 'Kontaktieren Sie uns'}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
