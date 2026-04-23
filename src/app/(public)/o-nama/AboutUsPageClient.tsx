'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Target, Heart, Lightbulb, Shield, Check, ArrowRight } from 'lucide-react'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import { getImageUrl } from '@/lib/utils/image'
import type { Doctor, AboutUsSettings } from '@/types'

interface AboutUsPageClientProps {
  aboutData: AboutUsSettings | null
  doctors: Doctor[]
}

export function AboutUsPageClient({ aboutData, doctors }: AboutUsPageClientProps) {
  const { locale } = useLocale()

  // Default values
  const values = [
    {
      icon: Target,
      title: locale === 'hr-HR' ? 'Izvrsnost' : locale === 'en-US' ? 'Excellence' : 'Exzellenz',
      description:
        locale === 'hr-HR'
          ? 'Težimo najvišim standardima u svakom aspektu našeg rada.'
          : locale === 'en-US'
          ? 'We strive for the highest standards in every aspect of our work.'
          : 'Wir streben nach höchsten Standards in jedem Aspekt unserer Arbeit.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Heart,
      title: locale === 'hr-HR' ? 'Empatija' : locale === 'en-US' ? 'Empathy' : 'Empathie',
      description:
        locale === 'hr-HR'
          ? 'Svaki pacijent je jedinstven i zaslužuje osobnu pažnju i razumijevanje.'
          : locale === 'en-US'
          ? 'Every patient is unique and deserves personal attention and understanding.'
          : 'Jeder Patient ist einzigartig und verdient persönliche Aufmerksamkeit und Verständnis.',
      color: 'from-rose-500 to-rose-600',
    },
    {
      icon: Lightbulb,
      title: locale === 'hr-HR' ? 'Inovacija' : locale === 'en-US' ? 'Innovation' : 'Innovation',
      description:
        locale === 'hr-HR'
          ? 'Kontinuirano usvajamo najnovije medicinske tehnologije i metode.'
          : locale === 'en-US'
          ? 'We continuously adopt the latest medical technologies and methods.'
          : 'Wir übernehmen kontinuierlich die neuesten medizinischen Technologien und Methoden.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: Shield,
      title: locale === 'hr-HR' ? 'Povjerenje' : locale === 'en-US' ? 'Trust' : 'Vertrauen',
      description:
        locale === 'hr-HR'
          ? 'Gradimo dugoročne odnose temeljene na povjerenju i transparentnosti.'
          : locale === 'en-US'
          ? 'We build long-term relationships based on trust and transparency.'
          : 'Wir bauen langfristige Beziehungen auf, die auf Vertrauen und Transparenz basieren.',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const stats = [
    { number: '10+', label: locale === 'hr-HR' ? 'Godina iskustva' : locale === 'en-US' ? 'Years of Experience' : 'Jahre Erfahrung' },
    { number: '15,000+', label: locale === 'hr-HR' ? 'Zadovoljnih pacijenata' : locale === 'en-US' ? 'Satisfied Patients' : 'Zufriedene Patienten' },
    { number: '20+', label: locale === 'hr-HR' ? 'Medicinskih usluga' : locale === 'en-US' ? 'Medical Services' : 'Medizinische Leistungen' },
    { number: '7', label: locale === 'hr-HR' ? 'Stručnih liječnika' : locale === 'en-US' ? 'Expert Doctors' : 'Fachärzte' },
  ]

  const milestones = [
    { year: '2014', event: locale === 'hr-HR' ? 'Osnivanje poliklinike' : locale === 'en-US' ? 'Clinic founded' : 'Gründung der Klinik' },
    { year: '2016', event: locale === 'hr-HR' ? 'Proširenje tima i usluga' : locale === 'en-US' ? 'Team and services expansion' : 'Erweiterung des Teams und der Dienste' },
    { year: '2019', event: locale === 'hr-HR' ? 'Moderna dijagnostička oprema' : locale === 'en-US' ? 'Modern diagnostic equipment' : 'Moderne Diagnosegeräte' },
    { year: '2022', event: locale === 'hr-HR' ? 'Renovacija i proširenje' : locale === 'en-US' ? 'Renovation and expansion' : 'Renovierung und Erweiterung' },
  ]

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
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight font-serif">
              {locale === 'hr-HR' ? (
                <>Više od<br />klinike</>
              ) : locale === 'en-US' ? (
                <>More than<br />a clinic</>
              ) : (
                <>Mehr als<br />eine Klinik</>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              {locale === 'hr-HR'
                ? 'Mjesto gdje se moderna medicina susreće s ljudskim pristupom. Vaše zdravlje je naša misija.'
                : locale === 'en-US'
                ? 'Where modern medicine meets a human approach. Your health is our mission.'
                : 'Wo moderne Medizin auf einen menschlichen Ansatz trifft. Ihre Gesundheit ist unsere Mission.'}
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
                <div className="text-5xl font-bold mb-2 bg-gradient-to-br from-orange-500 to-rose-500 bg-clip-text text-transparent font-serif">
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
                <div className="h-px w-12 bg-gradient-to-r from-orange-500 to-rose-500" />
                <span className="text-sm tracking-widest text-orange-500 font-semibold">
                  {locale === 'hr-HR' ? 'NAŠA PRIČA' : locale === 'en-US' ? 'OUR STORY' : 'UNSERE GESCHICHTE'}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                {locale === 'hr-HR'
                  ? 'Posvećeni vašem zdravlju od samog početka'
                  : locale === 'en-US'
                  ? 'Dedicated to your health from the very beginning'
                  : 'Von Anfang an Ihrer Gesundheit verpflichtet'}
              </h2>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {locale === 'hr-HR'
                  ? 'Poliklinika Atria osnovana je s jasnom vizijom: pružiti vrhunsku medicinsku skrb u toplom i pristupačnom okruženju. Vjerujemo da svaki pacijent zaslužuje osobnu pažnju i najviše standarde zdravstvene zaštite.'
                  : locale === 'en-US'
                  ? 'Atria Polyclinic was founded with a clear vision: to provide top-quality medical care in a warm and welcoming environment. We believe every patient deserves personal attention and the highest standards of healthcare.'
                  : 'Die Poliklinik Atria wurde mit einer klaren Vision gegründet: erstklassige medizinische Versorgung in einer warmen und einladenden Umgebung zu bieten.'}
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                {locale === 'hr-HR'
                  ? 'Naš tim iskusnih liječnika i medicinskog osoblja svakodnevno radi na tome da vam pružimo najbolju moguću skrb, kombinirajući najnovije medicinske tehnologije s ljudskim pristupom.'
                  : locale === 'en-US'
                  ? 'Our team of experienced doctors and medical staff works every day to provide you with the best possible care, combining the latest medical technologies with a human approach.'
                  : 'Unser Team aus erfahrenen Ärzten und medizinischem Personal arbeitet täglich daran, Ihnen die bestmögliche Versorgung zu bieten.'}
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
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop"
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
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
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
      <section className="py-32 bg-gradient-to-br from-orange-500 via-rose-500 to-pink-500 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-8 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            {locale === 'hr-HR'
              ? 'Postanite dio naše priče'
              : locale === 'en-US'
              ? 'Become part of our story'
              : 'Werden Sie Teil unserer Geschichte'}
          </h2>
          <p className="text-xl mb-10 text-white/90">
            {locale === 'hr-HR'
              ? 'Zakažite svoj prvi pregled i doživite razliku'
              : locale === 'en-US'
              ? 'Schedule your first appointment and experience the difference'
              : 'Vereinbaren Sie Ihren ersten Termin und erleben Sie den Unterschied'}
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
