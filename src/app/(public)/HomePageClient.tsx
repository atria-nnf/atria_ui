'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import VideoModal from '@/components/VideoModal'
import { getImageUrl } from '@/lib/utils/image'
import type { Service, Doctor, Testimonial } from '@/types'

interface HomePageClientProps {
  services: Service[]
  doctors: Doctor[]
  testimonials: Testimonial[]
}

// Static data
const statsData = [
  { number: '5000+', label: 'Zadovoljnih pacijenata godišnje', delay: 0.1 },
  { number: '10+', label: 'Godina stručnog iskustva', delay: 0.2 },
  { number: '7', label: 'Specijaliziranih liječnika', delay: 0.3 },
  { number: '4.9', label: 'Prosječna ocjena', delay: 0.4 },
]

const processSteps = [
  { step: '01', title: 'Rezerviraj online', desc: 'Odaberi uslugu i termin koji ti odgovara. Potvrda odmah.' },
  { step: '02', title: 'Upoznaj doktora', desc: 'Pogledaj video predstavljanje prije posjete. Bez iznenađenja.' },
  { step: '03', title: 'Dođi na pregled', desc: 'Ugodna atmosfera, moderno okruženje. Osjeti razliku.' },
  { step: '04', title: 'Nastavi praćenje', desc: 'Rezultati u 24h. Online pristup. Kontinuirana podrška.' },
]


const galleryImages = [
  { image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=600&fit=crop', span: 'col-span-2 row-span-2' },
  { image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop', span: 'col-span-1' },
  { image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=400&fit=crop', span: 'col-span-1' },
  { image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=400&h=400&fit=crop', span: 'col-span-1' },
  { image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=400&fit=crop', span: 'col-span-1' },
  { image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=400&fit=crop', span: 'col-span-2' },
]

const blogPosts = [
  {
    id: 1,
    title: 'Važnost redovitih ginekoloških pregleda',
    excerpt: 'Saznajte zašto je redoviti ginekološki pregled ključan za očuvanje ženskog zdravlja i prevenciju bolesti.',
    category: 'Ginekologija',
    readTime: 5,
    publishedAt: '2024-01-15',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=750&fit=crop',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Kako prepoznati rane znakove srčanih problema',
    excerpt: 'Preventivni kardioški pregled može spasiti život. Pročitajte više o simptomima na koje trebate obratiti pažnju.',
    category: 'Kardiologija',
    readTime: 4,
    publishedAt: '2024-01-10',
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop',
    isFeatured: false,
  },
  {
    id: 3,
    title: 'Njega kože tijekom zimskih mjeseci',
    excerpt: 'Dermatološki savjeti za održavanje zdrave i hidrirane kože tijekom hladnih zimskih dana.',
    category: 'Dermatologija',
    readTime: 3,
    publishedAt: '2024-01-05',
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop',
    isFeatured: false,
  },
]

// Helper to get localized content
function getLocalizedContent(content: unknown, locale: string = 'hr-HR'): string {
  if (!content) return ''
  if (typeof content === 'string') return content
  if (typeof content === 'object' && content !== null) {
    return (content as Record<string, string>)[locale] || (content as Record<string, string>)['hr-HR'] || ''
  }
  return ''
}

export default function HomePageClient({ services, doctors, testimonials }: HomePageClientProps) {
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [selectedDoctorVideo, setSelectedDoctorVideo] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Transform services data for display
  const servicesData = useMemo(() => {
    return services.slice(0, 3).map((service) => ({
      id: service.id,
      name: getLocalizedContent(service.name),
      slug: service.slug,
      tagline: getLocalizedContent(service.short_description) || 'Stručna medicinska skrb',
      description: getLocalizedContent(service.description),
      image: getImageUrl(service.featured_image) || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=1000&fit=crop',
    }))
  }, [services])

  // Transform doctors data for display
  const doctorsData = useMemo(() => {
    return doctors.map((doctor) => ({
      id: doctor.id,
      fullName: doctor.name,
      title: getLocalizedContent(doctor.title) || getLocalizedContent(doctor.specialty),
      experience: '10+ godina',
      image: getImageUrl(doctor.profile_image) || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop',
      videoUrl: doctor.video_preview,
    }))
  }, [doctors])

  // Transform testimonials data for display
  const testimonialsData = useMemo(() => {
    return testimonials.slice(0, 4).map((testimonial) => ({
      id: testimonial.id,
      content: getLocalizedContent(testimonial.content),
      patientName: testimonial.author_name,
      serviceRelated: '',
      rating: testimonial.rating || 5,
    }))
  }, [testimonials])

  // Load custom fonts
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const heroTitle = 'Zdravlje.\nRedizajnirano.'
  const heroSubtitle = 'Moderna medicina koja vas razumije. Iskustvo koje pamtite.'

  return (
    <div
      ref={containerRef}
      className="bg-black text-white"
      style={{ fontFamily: 'Ubuntu, sans-serif' }}
    >
      {/* Hero - Full Screen with Parallax */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: scale1, opacity: opacity1 }}
        >
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/40 to-slate-900/60"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30"></div>
          </div>
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&h=1080&fit=crop" alt="Clinic" className="w-full h-full object-cover" />
        </motion.div>

        <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <h1
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-tight mb-4 sm:mb-6 whitespace-pre-line"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {heroTitle}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto font-light px-4">
              {heroSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center"
          >
            <Link
              href="/kontakt"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-orangeCTA text-white rounded-full font-medium hover:bg-gray-100 hover:text-black transition-all text-sm sm:text-base"
            >
              Rezerviraj termin
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Animated Numbers */}
      <section className="min-h-screen bg-white text-black flex items-center py-20">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2
              className="text-6xl md:text-8xl font-bold mb-20 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Brojevi koji
              <br />
              govore umjesto nas
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-12">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: stat.delay }}
                className="group"
              >
                <div
                  className="text-7xl font-bold mb-4 text-orangeCTA"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg leading-relaxed">{stat.label}</div>
                <motion.div
                  className="h-1 bg-orangeCTA mt-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: stat.delay + 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Magazine Style - Service Showcase */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          {servicesData.map((service, index) => {
            const isReversed = index % 2 !== 0

            return (
              <motion.div
                key={service.id}
                className={`grid md:grid-cols-2 gap-16 ${index < servicesData.length - 1 ? 'mb-32' : ''} items-center`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-200px' }}
              >
                <motion.div
                  initial={{ x: isReversed ? 100 : -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={isReversed ? 'order-1 md:order-2' : ''}
                >
                  <div className="text-sm tracking-widest text-orangeCTA mb-4">
                    0{index + 1} — {service.name.toUpperCase()}
                  </div>
                  <h3
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {service.tagline}
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">{service.description}</p>
                  <motion.div whileHover={{ x: 10 }}>
                    <Link
                      href={`/usluge/${service.slug}`}
                      className="flex items-center gap-3 text-lg group text-white"
                    >
                      <span className="border-b border-blue-400 pb-1">Saznaj više</span>
                      <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ x: isReversed ? -100 : 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative aspect-[4/5] rounded-3xl overflow-hidden group ${isReversed ? 'order-2 md:order-1' : ''}`}
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Doctor Showcase - Full Width with Swiper */}
      <section className="bg-white text-black py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="text-sm tracking-widest text-gray-500 mb-4">NAŠI STRUČNJACI</div>
            <h2 className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Upoznajte tim
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Iskusni liječnici s ljudskim pristupom. Pogledajte njihove priče.
            </p>
          </motion.div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            touchReleaseOnEdges={true}
            threshold={10}
            resistanceRatio={0}
            className="!pb-16"
          >
            {doctorsData.map((doctor, index) => (
              <SwiperSlide key={doctor.id}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                    <img
                      src={doctor.image}
                      alt={doctor.fullName}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    {doctor.videoUrl && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setSelectedDoctorVideo(doctor.videoUrl)
                          setVideoModalOpen(true)
                        }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        aria-label={`Play video for ${doctor.fullName}`}
                      >
                        <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                          <Play className="w-8 h-8 text-orangeCTA ml-1" />
                        </div>
                      </button>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-black text-sm font-medium">
                      {doctor.experience}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {doctor.fullName}
                  </h3>
                  <p className="text-gray-600">{doctor.title}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="text-sm tracking-widest text-gray-500 mb-4">PROCES</div>
            <h2 className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Kako funkcionira
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Jednostavan put do boljeg zdravlja u četiri koraka
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative group"
              >
                <div
                  className="text-8xl mb-6 opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Magazine Style */}
      <section className="bg-white text-black py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-sm tracking-widest text-gray-500 mb-4">ISKUSTVA</div>
            <h2 className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Riječi koje
              <br />
              znače više
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <div className="flex gap-2 mb-8">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-3xl text-orange-500">
                      ★
                    </span>
                  ))}
                </div>
                <p
                  className="text-3xl md:text-4xl leading-relaxed mb-8 font-light italic"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-orangeCTA"></div>
                  <div>
                    <div className="font-bold text-xl">{testimonial.patientName}</div>
                    <div className="text-gray-600">{testimonial.serviceRelated}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Image Grid */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="text-sm tracking-widest text-gray-500 mb-4">PROSTORI</div>
            <h2
              className="text-6xl md:text-8xl font-bold mb-6 text-black"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Gdje se
              <br />
              događa magija
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`${item.span} rounded-2xl overflow-hidden aspect-square cursor-pointer`}
              >
                <img
                  src={item.image}
                  alt="Clinic space"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/News Preview - Editorial Style */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-20"
          >
            <div>
              <div className="text-sm tracking-widest text-gray-500 mb-4">BLOG & VIJESTI</div>
              <h2 className="text-6xl md:text-8xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                Najnovije
                <br />
                iz Atrie
              </h2>
            </div>
            <motion.div whileHover={{ x: 10 }}>
              <Link href="/blog" className="hidden md:flex items-center gap-3 text-lg group">
                <span className="border-b border-white pb-1">Svi članci</span>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-8">
            {/* Featured Article - Large */}
            {blogPosts[0] && (
              <motion.article
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-7 group cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6">
                  <img
                    src={blogPosts[0].coverImage}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  {blogPosts[0].isFeatured && (
                    <div className="absolute top-6 left-6 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-sm text-gray-300 mb-2">
                      {new Date(blogPosts[0].publishedAt).toLocaleDateString('hr-HR')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{blogPosts[0].category}</span>
                  <span>•</span>
                  <span>{blogPosts[0].readTime} min čitanja</span>
                </div>
                <h3
                  className="text-4xl font-bold mb-4 leading-tight group-hover:text-orange-500 transition-colors"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {blogPosts[0].title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">{blogPosts[0].excerpt}</p>
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2 group/btn">
                  <span className="border-b border-white pb-1">Čitaj dalje</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </motion.div>
              </motion.article>
            )}

            {/* Side Articles - Smaller */}
            <div className="md:col-span-5 space-y-8">
              {blogPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="grid grid-cols-5 gap-6">
                    <div className="col-span-2 relative aspect-square rounded-2xl overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span className="text-orange-500">{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime} min</span>
                      </div>
                      <h4
                        className="text-xl font-bold mb-2 leading-tight group-hover:text-orange-500 transition-colors"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString('hr-HR')}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* View All Button - Mobile */}
          <motion.div whileHover={{ x: 10 }} className="md:hidden flex items-center gap-3 text-lg group mt-12 mx-auto">
            <Link href="/blog" className="flex items-center gap-3">
              <span className="border-b border-white pb-1">Svi članci</span>
              <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Interactive CTA */}
      <section className="min-h-screen bg-gradient-to-br from-orangeCTA via-orange-500 to-amber-500 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='10' stroke='%23FFF' stroke-width='1' opacity='.1'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          ></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center px-8 relative z-10"
        >
          <h2
            className="text-6xl md:text-9xl font-bold mb-8 leading-none"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Započni
            <br />
            danas
          </h2>
          <p className="text-2xl md:text-3xl mb-12 text-white/90 max-w-3xl mx-auto font-light">
            Tvoje putovanje prema boljem zdravlju počinje jednim klikom
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/kontakt"
              className="inline-block px-16 py-6 bg-black text-white rounded-full text-xl font-medium hover:bg-gray-900 transition-all"
            >
              Rezerviraj termin
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Video Modal */}
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} videoUrl={selectedDoctorVideo} />
    </div>
  )
}
