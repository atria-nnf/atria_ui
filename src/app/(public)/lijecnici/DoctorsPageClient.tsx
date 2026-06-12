'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Calendar,
  Award,
  BookOpen,
  Heart,
  Star,
  Clock,
  Play,
} from 'lucide-react'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import { getImageUrl } from '@/lib/utils/image'
import VideoModal from '@/components/VideoModal'
import type { Doctor } from '@/types'

interface DoctorsPageClientProps {
  initialDoctors: Doctor[]
}

// Specialty display names
const SPECIALTY_DISPLAY_NAMES: Record<string, Record<string, string>> = {
  gynecology: {
    'hr-HR': 'Ginekologija',
    'en-US': 'Gynecology',
    'de-DE': 'Gynäkologie',
  },
  cardiology: {
    'hr-HR': 'Kardiologija',
    'en-US': 'Cardiology',
    'de-DE': 'Kardiologie',
  },
  dermatology: {
    'hr-HR': 'Dermatologija',
    'en-US': 'Dermatology',
    'de-DE': 'Dermatologie',
  },
  general: {
    'hr-HR': 'Opća medicina',
    'en-US': 'General Medicine',
    'de-DE': 'Allgemeinmedizin',
  },
  pediatrics: {
    'hr-HR': 'Pedijatrija',
    'en-US': 'Pediatrics',
    'de-DE': 'Pädiatrie',
  },
  orthopedics: {
    'hr-HR': 'Ortopedija',
    'en-US': 'Orthopedics',
    'de-DE': 'Orthopädie',
  },
}

export function DoctorsPageClient({ initialDoctors }: DoctorsPageClientProps) {
  const { locale } = useLocale()
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [hoveredDoctor, setHoveredDoctor] = useState<string | null>(null)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [selectedDoctorVideo, setSelectedDoctorVideo] = useState<string | null>(null)

  // Extract unique specialties from doctors
  const specialties = useMemo(() => {
    const specialtySet = new Set<string>()
    initialDoctors.forEach((d) => {
      const spec = getLocalizedContent(d.specialty, 'hr-HR')
      if (spec) specialtySet.add(spec)
    })

    const allLabel =
      locale === 'hr-HR'
        ? 'Svi liječnici'
        : locale === 'en-US'
        ? 'All Doctors'
        : 'Alle Ärzte'

    return [
      { id: 'all', name: allLabel, count: initialDoctors.length },
      ...Array.from(specialtySet).map((spec) => ({
        id: spec,
        name: SPECIALTY_DISPLAY_NAMES[spec]?.[locale] || spec,
        count: initialDoctors.filter((d) => getLocalizedContent(d.specialty, 'hr-HR') === spec).length,
      })),
    ]
  }, [initialDoctors, locale])

  // Filter doctors by specialty
  const filteredDoctors = useMemo(() => {
    if (selectedSpecialty === 'all') return initialDoctors
    return initialDoctors.filter((d) => getLocalizedContent(d.specialty, 'hr-HR') === selectedSpecialty)
  }, [initialDoctors, selectedSpecialty])

  // Featured doctors
  const featuredDoctors = filteredDoctors.filter((d) => d.is_featured)

  // Stats
  const stats = [
    {
      number: `${initialDoctors.length}`,
      label:
        locale === 'hr-HR'
          ? 'Specijaliziranih liječnika'
          : locale === 'en-US'
          ? 'Specialized Doctors'
          : 'Spezialisierte Ärzte',
    },
    {
      number: '15+',
      label:
        locale === 'hr-HR'
          ? 'Prosječno godina iskustva'
          : locale === 'en-US'
          ? 'Average Years of Experience'
          : 'Durchschnittliche Jahre Erfahrung',
    },
    {
      number: '15,000+',
      label:
        locale === 'hr-HR'
          ? 'Zadovoljnih pacijenata'
          : locale === 'en-US'
          ? 'Satisfied Patients'
          : 'Zufriedene Patienten',
    },
    {
      number: '4.8',
      label:
        locale === 'hr-HR'
          ? 'Prosječna ocjena'
          : locale === 'en-US'
          ? 'Average Rating'
          : 'Durchschnittliche Bewertung',
    },
  ]

  // Why our doctors items
  const whyOurDoctors = [
    {
      icon: Award,
      title:
        locale === 'hr-HR'
          ? 'Visoka stručnost'
          : locale === 'en-US'
          ? 'High Expertise'
          : 'Hohe Fachkompetenz',
      description:
        locale === 'hr-HR'
          ? 'Svi naši liječnici su specijalizirani stručnjaci s godinama iskustva'
          : locale === 'en-US'
          ? 'All our doctors are specialized experts with years of experience'
          : 'Alle unsere Ärzte sind spezialisierte Experten mit jahrelanger Erfahrung',
    },
    {
      icon: Heart,
      title:
        locale === 'hr-HR'
          ? 'Ljudski pristup'
          : locale === 'en-US'
          ? 'Human Approach'
          : 'Menschlicher Ansatz',
      description:
        locale === 'hr-HR'
          ? 'Empatija i razumijevanje su jednako važni kao i medicinska znanje'
          : locale === 'en-US'
          ? 'Empathy and understanding are just as important as medical knowledge'
          : 'Empathie und Verständnis sind genauso wichtig wie medizinisches Wissen',
    },
    {
      icon: BookOpen,
      title:
        locale === 'hr-HR'
          ? 'Kontinuirana edukacija'
          : locale === 'en-US'
          ? 'Continuous Education'
          : 'Kontinuierliche Weiterbildung',
      description:
        locale === 'hr-HR'
          ? 'Redovna usavršavanja i praćenje najnovijih medicinskih dostignuća'
          : locale === 'en-US'
          ? 'Regular training and keeping up with the latest medical advances'
          : 'Regelmäßige Schulungen und Nachverfolgung der neuesten medizinischen Fortschritte',
    },
    {
      icon: Clock,
      title:
        locale === 'hr-HR'
          ? 'Posvećeno vrijeme'
          : locale === 'en-US'
          ? 'Dedicated Time'
          : 'Zeit für Sie',
      description:
        locale === 'hr-HR'
          ? 'Dovoljno vremena za svakog pacijenta - bez žurbe'
          : locale === 'en-US'
          ? 'Enough time for each patient - without rushing'
          : 'Genug Zeit für jeden Patienten - ohne Eile',
    },
  ]

  return (
    <div className="bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
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
            <div className="text-sm tracking-widest text-blue-300 mb-6">
              {locale === 'hr-HR' ? 'NAŠ TIM' : locale === 'en-US' ? 'OUR TEAM' : 'UNSER TEAM'}
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight font-serif">
              {locale === 'hr-HR' ? (
                <>
                  Upoznajte<br />naše stručnjake
                </>
              ) : locale === 'en-US' ? (
                <>
                  Meet<br />Our Experts
                </>
              ) : (
                <>
                  Lernen Sie<br />unsere Experten kennen
                </>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {locale === 'hr-HR'
                ? 'Iskusni liječnici s ljudskim pristupom. Svaki član našeg tima donosi jedinstvenu kombinaciju stručnosti, iskustva i strasti za pomoć ljudima.'
                : locale === 'en-US'
                ? 'Experienced doctors with a human approach. Each member of our team brings a unique combination of expertise, experience, and passion for helping people.'
                : 'Erfahrene Ärzte mit menschlichem Ansatz. Jedes Mitglied unseres Teams bringt eine einzigartige Kombination aus Fachwissen, Erfahrung und Leidenschaft für die Hilfe von Menschen mit.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Specialty Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => setSelectedSpecialty(specialty.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedSpecialty === specialty.id
                    ? 'bg-orangeCTA text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {specialty.name}
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

      {/* Featured Doctors */}
      {featuredDoctors.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-orangeCTA" />
                <span className="text-sm tracking-widest text-orange-500 font-semibold">
                  {locale === 'hr-HR'
                    ? 'ISTAKNUTI LIJEČNICI'
                    : locale === 'en-US'
                    ? 'FEATURED DOCTORS'
                    : 'HERVORGEHOBENE ÄRZTE'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
                {locale === 'hr-HR'
                  ? 'Osnivačica i ravnateljica Poliklinike Atria'
                  : locale === 'en-US'
                  ? 'Founder and Director of Polyclinic Atria'
                  : 'Gründerin und Direktorin der Poliklinik Atria'}
              </h2>
            </motion.div>

            <div className="space-y-20">
              {featuredDoctors.map((doctor, index) => {
                const videoUrl = getImageUrl(doctor.video_preview)

                return (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="relative group">
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                          <img
                            src={
                              getImageUrl(doctor.profile_image) ||
                              'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop'
                            }
                            alt={doctor.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          />
                        </div>

                        {/* Video Play Button */}
                        {videoUrl && (
                          <button
                            onClick={() => {
                              setSelectedDoctorVideo(videoUrl)
                              setVideoModalOpen(true)
                            }}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                            aria-label={`Play video for ${doctor.name}`}
                          >
                            <div className="w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                              <Play className="w-8 h-8 text-orangeCTA ml-1" />
                            </div>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      {doctor.title && (
                        <div className="inline-block px-4 py-2 bg-orangeCTA text-white rounded-full text-sm font-semibold mb-6">
                          {getLocalizedContent(doctor.title, locale)}
                        </div>
                      )}

                      <h3 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{doctor.name}</h3>

                      {doctor.bio && (
                        <div
                          className="text-gray-600 text-lg leading-relaxed mb-8 prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{ __html: getLocalizedContent(doctor.bio, locale) }}
                        />
                      )}

                      {/* Quick Info */}
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {doctor.specialty && (
                          <div>
                            <div className="text-sm text-gray-500 mb-2">
                              {locale === 'hr-HR' ? 'Specijalizacija' : locale === 'en-US' ? 'Specialty' : 'Fachgebiet'}
                            </div>
                            <div className="font-semibold text-lg">{getLocalizedContent(doctor.specialty, locale)}</div>
                          </div>
                        )}
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            href={`/kontakt?doctor=${doctor.slug}`}
                            className="px-8 py-3 bg-orangeCTA text-white rounded-full font-semibold text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                          >
                            <Calendar className="w-5 h-5" />
                            {locale === 'hr-HR' ? 'Zakaži pregled' : locale === 'en-US' ? 'Schedule Appointment' : 'Termin vereinbaren'}
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Doctors Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              {locale === 'hr-HR'
                ? 'Upoznaj naš tim'
                : locale === 'en-US'
                ? 'Meet Our Team'
                : 'Lernen Sie unser Team kennen'}
            </h2>
            <p className="text-gray-600 text-lg">
              {locale === 'hr-HR'
                ? 'Liječnici i medicinske sestre koji brinu o vama'
                : locale === 'en-US'
                ? 'Doctors and nurses who care for you'
                : 'Ärzte und Krankenschwestern, die sich um Sie kümmern'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => {
              const videoUrl = getImageUrl(doctor.video_preview)

              return (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredDoctor(doctor.id)}
                  onMouseLeave={() => setHoveredDoctor(null)}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={
                        getImageUrl(doctor.profile_image) ||
                        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop'
                      }
                      alt={doctor.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Video Play Button */}
                    {videoUrl && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setSelectedDoctorVideo(videoUrl)
                          setVideoModalOpen(true)
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        aria-label={`Play video for ${doctor.name}`}
                      >
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                          <Play className="w-6 h-6 text-orangeCTA ml-1" />
                        </div>
                      </button>
                    )}

                    {/* Featured Badge */}
                    {doctor.is_featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
                          {locale === 'hr-HR' ? 'Istaknuto' : locale === 'en-US' ? 'Featured' : 'Hervorgehoben'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1 font-serif">{doctor.name}</h3>

                    {doctor.title && (
                      <p className="text-sm text-gray-600 mb-4">{getLocalizedContent(doctor.title, locale)}</p>
                    )}

                    {/* Specialty */}
                    {doctor.specialty && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                          {getLocalizedContent(doctor.specialty, locale)}
                        </span>
                      </div>
                    )}

                    {/* CTAs */}
                    <div className="flex gap-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Link
                          href={`/kontakt?doctor=${doctor.slug}`}
                          className="block py-3 bg-orangeCTA text-white rounded-xl font-semibold text-center text-sm shadow-lg hover:shadow-xl transition-all"
                        >
                          {locale === 'hr-HR' ? 'Rezerviraj' : locale === 'en-US' ? 'Book' : 'Buchen'}
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Our Doctors */}
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
                ? 'Zašto naši liječnici?'
                : locale === 'en-US'
                ? 'Why Our Doctors?'
                : 'Warum unsere Ärzte?'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {locale === 'hr-HR'
                ? 'Više od stručnosti - pristup koji stavlja pacijenta na prvo mjesto'
                : locale === 'en-US'
                ? 'More than expertise - an approach that puts the patient first'
                : 'Mehr als Fachwissen - ein Ansatz, der den Patienten in den Mittelpunkt stellt'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyOurDoctors.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="w-16 h-16 bg-orangeCTA rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
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
            {locale === 'hr-HR'
              ? 'Pronađite svog liječnika'
              : locale === 'en-US'
              ? 'Find Your Doctor'
              : 'Finden Sie Ihren Arzt'}
          </h2>
          <p className="text-2xl mb-10 text-white/90">
            {locale === 'hr-HR'
              ? 'Zakažite pregled kod stručnjaka koji odgovara vašim potrebama'
              : locale === 'en-US'
              ? 'Schedule an appointment with the specialist who fits your needs'
              : 'Vereinbaren Sie einen Termin bei dem Spezialisten, der Ihren Bedürfnissen entspricht'}
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
                {locale === 'hr-HR' ? 'Kontaktirajte nas' : locale === 'en-US' ? 'Contact Us' : 'Kontaktieren Sie uns'}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Video Modal */}
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} videoUrl={selectedDoctorVideo} />
    </div>
  )
}
