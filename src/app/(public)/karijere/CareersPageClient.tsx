'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Heart,
  Users,
  TrendingUp,
  Award,
  Send,
  ChevronDown,
  Search,
  Calendar,
  Mail,
} from 'lucide-react'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import type { JobPosting } from '@/types'

interface CareersPageClientProps {
  jobs: JobPosting[]
}

export function CareersPageClient({ jobs }: CareersPageClientProps) {
  const { locale } = useLocale()
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedJob, setExpandedJob] = useState<string | null>(null)

  // Translations
  const t = {
    'hr-HR': {
      careers: 'KARIJERE',
      joinTeam: 'Pridružite se',
      ourTeam: 'našem timu',
      heroSubtitle: 'Gradimo budućnost zdravstva zajedno. Tražimo passionate profesionalce koji dijele našu viziju.',
      openPositions: 'otvorenih pozicija',
      openPosition: 'otvorena pozicija',
      searchPlaceholder: 'Pretraži pozicije...',
      allPositions: 'Sve pozicije',
      allTypes: 'Svi tipovi',
      fullTime: 'Puno radno vrijeme',
      partTime: 'Nepuno radno vrijeme',
      contract: 'Ugovor',
      apply: 'Prijavi se',
      showDetails: 'Vidi detalje',
      hideDetails: 'Sakrij detalje',
      responsibilities: 'Odgovornosti',
      requirements: 'Zahtjevi',
      benefits: 'Beneficije',
      noResults: 'Nema rezultata',
      noResultsDesc: 'Pokušajte s drugim filterima ili pojmovima za pretragu',
      whyWorkAtAtria: 'Zašto raditi u Atriji',
      whyWorkSubtitle: 'Više od posla - mjesto gdje rastete i doprinosite',
      ourValues: 'Naše vrijednosti',
      noPositionCta: 'Ne vidite svoju poziciju?',
      spontaneousApplication: 'Pošaljite nam spontanu prijavu - uvijek tražimo talente!',
      posted: 'Objavljeno',
      featured: 'FEATURED',
      urgent: 'HITNO',
      today: 'Danas',
      yesterday: 'Jučer',
      daysAgo: 'dana prije',
      weekAgo: 'tjedan prije',
      weeksAgo: 'tjedna prije',
      monthAgo: 'mjesec prije',
      monthsAgo: 'mjeseca prije',
      // Empty state
      noOpenPositions: 'Trenutno nemamo otvorenih pozicija',
      noOpenPositionsDesc: 'Ali uvijek tražimo talentirane profesionalce koji dijele našu viziju. Pošaljite nam spontanu prijavu i bit ćete prvi obaviješteni kada se otvori pozicija koja vam odgovara.',
      spontaneousApplicationTitle: 'Spontana prijava',
      nameField: 'Ime i prezime',
      emailField: 'Email adresa',
      phoneField: 'Telefon',
      interestedPosition: 'Pozicija koja vas zanima',
      medicalTeam: 'Medicinski tim',
      nursingTeam: 'Sestrinski tim',
      administration: 'Administracija',
      other: 'Ostalo',
      aboutYourself: 'Kratko o sebi i zašto želite raditi u Atriji...',
      attachCv: 'Priložite svoj životopis (CV)',
      cvFormats: 'PDF, DOC, DOCX - Max 5MB',
      sendApplication: 'Pošalji prijavu',
      contactDirectly: 'Ili nas kontaktirajte direktno',
      whyWorkWithUs: 'Zašto raditi s nama',
      bePartOf: 'Budite dio',
      buildingFuture: 'Gradimo budućnost zdravstva zajedno',
    },
    'en-US': {
      careers: 'CAREERS',
      joinTeam: 'Join',
      ourTeam: 'our team',
      heroSubtitle: 'Building the future of healthcare together. We are looking for passionate professionals who share our vision.',
      openPositions: 'open positions',
      openPosition: 'open position',
      searchPlaceholder: 'Search positions...',
      allPositions: 'All positions',
      allTypes: 'All types',
      fullTime: 'Full-time',
      partTime: 'Part-time',
      contract: 'Contract',
      apply: 'Apply',
      showDetails: 'Show details',
      hideDetails: 'Hide details',
      responsibilities: 'Responsibilities',
      requirements: 'Requirements',
      benefits: 'Benefits',
      noResults: 'No results',
      noResultsDesc: 'Try different filters or search terms',
      whyWorkAtAtria: 'Why work at Atria',
      whyWorkSubtitle: 'More than a job - a place where you grow and contribute',
      ourValues: 'Our values',
      noPositionCta: "Don't see your position?",
      spontaneousApplication: 'Send us a spontaneous application - we are always looking for talent!',
      posted: 'Posted',
      featured: 'FEATURED',
      urgent: 'URGENT',
      today: 'Today',
      yesterday: 'Yesterday',
      daysAgo: 'days ago',
      weekAgo: 'week ago',
      weeksAgo: 'weeks ago',
      monthAgo: 'month ago',
      monthsAgo: 'months ago',
      noOpenPositions: 'Currently no open positions',
      noOpenPositionsDesc: 'But we are always looking for talented professionals who share our vision. Send us a spontaneous application and you will be the first to know when a position opens up.',
      spontaneousApplicationTitle: 'Spontaneous application',
      nameField: 'Full name',
      emailField: 'Email address',
      phoneField: 'Phone',
      interestedPosition: 'Position you are interested in',
      medicalTeam: 'Medical team',
      nursingTeam: 'Nursing team',
      administration: 'Administration',
      other: 'Other',
      aboutYourself: 'Tell us about yourself and why you want to work at Atria...',
      attachCv: 'Attach your resume (CV)',
      cvFormats: 'PDF, DOC, DOCX - Max 5MB',
      sendApplication: 'Send application',
      contactDirectly: 'Or contact us directly',
      whyWorkWithUs: 'Why work with us',
      bePartOf: 'Be part of',
      buildingFuture: 'Building the future of healthcare together',
    },
    'de-DE': {
      careers: 'KARRIERE',
      joinTeam: 'Werden Sie Teil',
      ourTeam: 'unseres Teams',
      heroSubtitle: 'Wir gestalten gemeinsam die Zukunft des Gesundheitswesens. Wir suchen leidenschaftliche Fachleute, die unsere Vision teilen.',
      openPositions: 'offene Stellen',
      openPosition: 'offene Stelle',
      searchPlaceholder: 'Stellen suchen...',
      allPositions: 'Alle Stellen',
      allTypes: 'Alle Typen',
      fullTime: 'Vollzeit',
      partTime: 'Teilzeit',
      contract: 'Vertrag',
      apply: 'Bewerben',
      showDetails: 'Details anzeigen',
      hideDetails: 'Details ausblenden',
      responsibilities: 'Verantwortlichkeiten',
      requirements: 'Anforderungen',
      benefits: 'Vorteile',
      noResults: 'Keine Ergebnisse',
      noResultsDesc: 'Versuchen Sie andere Filter oder Suchbegriffe',
      whyWorkAtAtria: 'Warum bei Atria arbeiten',
      whyWorkSubtitle: 'Mehr als ein Job - ein Ort, an dem Sie wachsen und beitragen',
      ourValues: 'Unsere Werte',
      noPositionCta: 'Ihre Position nicht gefunden?',
      spontaneousApplication: 'Senden Sie uns eine Initiativbewerbung - wir suchen immer Talente!',
      posted: 'Veröffentlicht',
      featured: 'FEATURED',
      urgent: 'DRINGEND',
      today: 'Heute',
      yesterday: 'Gestern',
      daysAgo: 'Tagen',
      weekAgo: 'Woche',
      weeksAgo: 'Wochen',
      monthAgo: 'Monat',
      monthsAgo: 'Monaten',
      noOpenPositions: 'Derzeit keine offenen Stellen',
      noOpenPositionsDesc: 'Aber wir suchen immer talentierte Fachleute, die unsere Vision teilen. Senden Sie uns eine Initiativbewerbung und Sie werden als Erster informiert.',
      spontaneousApplicationTitle: 'Initiativbewerbung',
      nameField: 'Vollständiger Name',
      emailField: 'E-Mail-Adresse',
      phoneField: 'Telefon',
      interestedPosition: 'Gewünschte Position',
      medicalTeam: 'Medizinisches Team',
      nursingTeam: 'Pflegeteam',
      administration: 'Verwaltung',
      other: 'Sonstiges',
      aboutYourself: 'Erzählen Sie uns von sich und warum Sie bei Atria arbeiten möchten...',
      attachCv: 'Lebenslauf anhängen',
      cvFormats: 'PDF, DOC, DOCX - Max 5MB',
      sendApplication: 'Bewerbung senden',
      contactDirectly: 'Oder kontaktieren Sie uns direkt',
      whyWorkWithUs: 'Warum mit uns arbeiten',
      bePartOf: 'Werden Sie Teil',
      buildingFuture: 'Wir gestalten gemeinsam die Zukunft des Gesundheitswesens',
    },
  }[locale]

  // Department names
  const getDepartmentName = (dept: string) => {
    const names: Record<string, Record<string, string>> = {
      'hr-HR': {
        medical: 'Medicinski tim',
        nursing: 'Sestrinski tim',
        admin: 'Administracija',
        technical: 'Tehnički tim',
        support: 'Podrška',
      },
      'en-US': {
        medical: 'Medical team',
        nursing: 'Nursing team',
        admin: 'Administration',
        technical: 'Technical team',
        support: 'Support',
      },
      'de-DE': {
        medical: 'Medizinisches Team',
        nursing: 'Pflegeteam',
        admin: 'Verwaltung',
        technical: 'Technisches Team',
        support: 'Support',
      },
    }
    return names[locale][dept] || dept.charAt(0).toUpperCase() + dept.slice(1)
  }

  // Job type names
  const getJobTypeName = (type: string | null) => {
    if (!type) return ''
    const names: Record<string, string> = {
      'full-time': t.fullTime,
      'part-time': t.partTime,
      contract: t.contract,
    }
    return names[type] || type
  }

  // Format posted date
  const formatPostedDate = (dateString: string | null) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return t.today
    if (diffDays === 1) return t.yesterday
    if (diffDays < 7) return `${diffDays} ${t.daysAgo}`
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} ${Math.floor(diffDays / 7) === 1 ? t.weekAgo : t.weeksAgo}`
    if (diffDays < 365)
      return `${Math.floor(diffDays / 30)} ${Math.floor(diffDays / 30) === 1 ? t.monthAgo : t.monthsAgo}`
    return dateString
  }

  // Build departments from jobs
  const departments = useMemo(() => {
    const depts = [{ id: 'all', name: t.allPositions, count: jobs.length }]

    const uniqueDepts = [...new Set(jobs.map((job) => job.department).filter(Boolean))]
    uniqueDepts.forEach((dept) => {
      if (dept) {
        depts.push({
          id: dept,
          name: getDepartmentName(dept),
          count: jobs.filter((job) => job.department === dept).length,
        })
      }
    })

    return depts
  }, [jobs, locale])

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title = getLocalizedContent(job.title, locale)
      const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment
      const matchesType = selectedType === 'all' || job.employment_type === selectedType
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesDepartment && matchesType && matchesSearch
    })
  }, [jobs, selectedDepartment, selectedType, searchQuery, locale])

  // Benefits data
  const benefits = [
    {
      icon: Heart,
      title: locale === 'hr-HR' ? 'Zdravlje i wellness' : locale === 'en-US' ? 'Health & Wellness' : 'Gesundheit & Wellness',
      description:
        locale === 'hr-HR'
          ? 'Privatno zdravstveno osiguranje za vas i vašu obitelj'
          : locale === 'en-US'
            ? 'Private health insurance for you and your family'
            : 'Private Krankenversicherung für Sie und Ihre Familie',
    },
    {
      icon: TrendingUp,
      title: locale === 'hr-HR' ? 'Razvoj karijere' : locale === 'en-US' ? 'Career Development' : 'Karriereentwicklung',
      description:
        locale === 'hr-HR'
          ? 'Kontinuirana edukacija, konferencije i profesionalni razvoj'
          : locale === 'en-US'
            ? 'Continuous education, conferences, and professional development'
            : 'Kontinuierliche Weiterbildung, Konferenzen und berufliche Entwicklung',
    },
    {
      icon: Users,
      title: locale === 'hr-HR' ? 'Timska kultura' : locale === 'en-US' ? 'Team Culture' : 'Teamkultur',
      description:
        locale === 'hr-HR'
          ? 'Podržavajući tim koji cijeni svačiji doprinos'
          : locale === 'en-US'
            ? 'Supportive team that values everyone\'s contribution'
            : 'Ein unterstützendes Team, das jeden Beitrag schätzt',
    },
    {
      icon: Award,
      title: locale === 'hr-HR' ? 'Konkurentna plaća' : locale === 'en-US' ? 'Competitive Salary' : 'Wettbewerbsfähiges Gehalt',
      description:
        locale === 'hr-HR'
          ? 'Iznadprosječne plaće i bonusi za performanse'
          : locale === 'en-US'
            ? 'Above-average salaries and performance bonuses'
            : 'Überdurchschnittliche Gehälter und Leistungsprämien',
    },
    {
      icon: Clock,
      title: 'Work-life balance',
      description:
        locale === 'hr-HR'
          ? 'Fleksibilno radno vrijeme i razumijevanje za privatni život'
          : locale === 'en-US'
            ? 'Flexible working hours and understanding for private life'
            : 'Flexible Arbeitszeiten und Verständnis für das Privatleben',
    },
    {
      icon: Briefcase,
      title: locale === 'hr-HR' ? 'Moderno radno mjesto' : locale === 'en-US' ? 'Modern Workplace' : 'Moderner Arbeitsplatz',
      description:
        locale === 'hr-HR'
          ? 'Najsuvremenija oprema i udoban radni prostor'
          : locale === 'en-US'
            ? 'State-of-the-art equipment and comfortable workspace'
            : 'Modernste Ausstattung und komfortabler Arbeitsplatz',
    },
  ]

  // Values data
  const values = [
    {
      title: locale === 'hr-HR' ? 'Izvrsnost' : locale === 'en-US' ? 'Excellence' : 'Exzellenz',
      description:
        locale === 'hr-HR'
          ? 'Težimo najvišim standardima u svemu što radimo'
          : locale === 'en-US'
            ? 'We strive for the highest standards in everything we do'
            : 'Wir streben nach höchsten Standards in allem, was wir tun',
    },
    {
      title: locale === 'hr-HR' ? 'Empatija' : locale === 'en-US' ? 'Empathy' : 'Empathie',
      description:
        locale === 'hr-HR'
          ? 'Brinemo o pacijentima i jedni o drugima'
          : locale === 'en-US'
            ? 'We care about patients and each other'
            : 'Wir kümmern uns um Patienten und umeinander',
    },
    {
      title: locale === 'hr-HR' ? 'Inovacija' : locale === 'en-US' ? 'Innovation' : 'Innovation',
      description:
        locale === 'hr-HR'
          ? 'Prihvaćamo nove pristupe i tehnologije'
          : locale === 'en-US'
            ? 'We embrace new approaches and technologies'
            : 'Wir begrüßen neue Ansätze und Technologien',
    },
    {
      title: locale === 'hr-HR' ? 'Integritet' : locale === 'en-US' ? 'Integrity' : 'Integrität',
      description:
        locale === 'hr-HR'
          ? 'Djelujemo s poštenjem i transparentnošću'
          : locale === 'en-US'
            ? 'We act with honesty and transparency'
            : 'Wir handeln mit Ehrlichkeit und Transparenz',
    },
  ]

  // Empty state component
  if (jobs.length === 0) {
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
              <div className="text-sm tracking-widest text-blue-300 mb-6">{t.careers}</div>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight font-serif">
                {t.bePartOf}
                <br />
                {t.ourTeam}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">{t.buildingFuture}</p>
            </motion.div>
          </div>
        </section>

        {/* No Jobs Available */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Briefcase className="w-16 h-16 text-gray-400" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">{t.noOpenPositions}</h2>

              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">{t.noOpenPositionsDesc}</p>

              {/* Spontaneous Application Form */}
              <div className="bg-gray-50 rounded-3xl p-10 max-w-2xl mx-auto mb-16">
                <h3 className="text-2xl font-bold mb-6 font-serif">{t.spontaneousApplicationTitle}</h3>

                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={t.nameField}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder={t.emailField}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <input
                    type="tel"
                    placeholder={t.phoneField}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />

                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors appearance-none bg-white">
                    <option value="">{t.interestedPosition}</option>
                    <option value="medical">{t.medicalTeam}</option>
                    <option value="nursing">{t.nursingTeam}</option>
                    <option value="admin">{t.administration}</option>
                    <option value="other">{t.other}</option>
                  </select>

                  <textarea
                    rows={5}
                    placeholder={t.aboutYourself}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Mail className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">{t.attachCv}</p>
                    <p className="text-sm text-gray-500">{t.cvFormats}</p>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-orangeCTA text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {t.sendApplication}
                  </motion.button>
                </form>
              </div>

              {/* Alternative Contact */}
              <div className="bg-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
                <h4 className="font-bold text-lg mb-4">{t.contactDirectly}</h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                  <a href="mailto:karijere@atria.hr" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Mail className="w-4 h-4" />
                    karijere@atria.hr
                  </a>
                  <span className="hidden sm:inline text-gray-400">|</span>
                  <span className="text-gray-600">LinkedIn: Poliklinika Atria</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{t.whyWorkWithUs}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-orangeCTA rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Main component with jobs
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
            <div className="text-sm tracking-widest text-blue-300 mb-6">{t.careers}</div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight font-serif">
              {t.joinTeam}
              <br />
              {t.ourTeam}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">{t.heroSubtitle}</p>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Briefcase className="w-5 h-5" />
              <span className="font-semibold">
                {jobs.length} {jobs.length === 1 ? t.openPosition : t.openPositions}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Department Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedDepartment === dept.id
                      ? 'bg-orangeCTA text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="space-y-6">
            {filteredJobs.map((job, index) => {
              const title = getLocalizedContent(job.title, locale)
              const description = getLocalizedContent(job.description, locale)
              const location = getLocalizedContent(job.location, locale)
              const requirements = job.requirements as string[] | null
              const jobBenefits = job.benefits as string[] | null

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100"
                >
                  {/* Job Header */}
                  <div className="p-8 cursor-pointer" onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex-1">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {job.employment_type && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                              {getJobTypeName(job.employment_type)}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl font-bold mb-3 group-hover:text-orange-500 transition-colors font-serif">{title}</h3>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-600">
                          {location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{location}</span>
                            </div>
                          )}
                          {job.salary_range && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary_range}</span>
                            </div>
                          )}
                          {job.created_at && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {t.posted} {formatPostedDate(job.created_at)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Short Description */}
                        {description && <p className="text-gray-600 mt-4 leading-relaxed">{description}</p>}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex lg:flex-col gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 lg:flex-none px-8 py-3 bg-orangeCTA text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                        >
                          {t.apply}
                        </motion.button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors">
                          {expandedJob === job.id ? t.hideDetails : t.showDetails}
                          <ChevronDown className={`w-5 h-5 transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 bg-gray-50"
                      >
                        <div className="p-8 grid md:grid-cols-2 gap-8">
                          {/* Requirements */}
                          {requirements && requirements.length > 0 && (
                            <div>
                              <h4 className="font-bold text-lg mb-4">{t.requirements}</h4>
                              <ul className="space-y-2">
                                {requirements.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-gray-700">
                                    <span className="text-blue-500 mt-1">✓</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Benefits */}
                          {jobBenefits && jobBenefits.length > 0 && (
                            <div>
                              <h4 className="font-bold text-lg mb-4">{t.benefits}</h4>
                              <ul className="space-y-2">
                                {jobBenefits.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-gray-700">
                                    <span className="text-green-500 mt-1">★</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.noResults}</h3>
              <p className="text-gray-600">{t.noResultsDesc}</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{t.whyWorkAtAtria}</h2>
            <p className="text-gray-600 text-lg">{t.whyWorkSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-orangeCTA rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{t.ourValues}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className="text-6xl font-bold mb-4 text-orangeCTA font-serif"
                >
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-serif">{t.noPositionCta}</h2>
          <p className="text-2xl mb-10 text-white/90">{t.spontaneousApplication}</p>
          <motion.a
            href="mailto:karijere@atria.hr"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-10 py-4 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-900 transition-all"
          >
            <Mail className="w-5 h-5" />
            karijere@atria.hr
          </motion.a>
        </motion.div>
      </section>
    </div>
  )
}
