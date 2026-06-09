'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Calendar,
  MessageSquare,
  AlertCircle,
} from 'lucide-react'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import type { Service, ContactInfo, FAQ } from '@/types'

interface ContactPageClientProps {
  contactInfo: ContactInfo
  services: Service[]
  faqs: FAQ[]
}

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export function ContactPageClient({ contactInfo, services, faqs }: ContactPageClientProps) {
  const { locale } = useLocale()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })

        setTimeout(() => {
          setIsSuccess(false)
        }, 5000)
      } else {
        setFormError(
          locale === 'hr-HR'
            ? 'Greška pri slanju poruke. Molimo pokušajte ponovno.'
            : locale === 'en-US'
            ? 'Error sending message. Please try again.'
            : 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.'
        )
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      setFormError(
        locale === 'hr-HR'
          ? 'Greška pri slanju poruke. Molimo pokušajte ponovno.'
          : locale === 'en-US'
          ? 'Error sending message. Please try again.'
          : 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Contact methods
  const contactMethods = [
    {
      icon: Phone,
      title: locale === 'hr-HR' ? 'Telefon' : locale === 'en-US' ? 'Phone' : 'Telefon',
      details: [contactInfo.phone],
      action: locale === 'hr-HR' ? 'Nazovi nas' : locale === 'en-US' ? 'Call us' : 'Rufen Sie uns an',
      href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Mail,
      title: 'Email',
      details: [contactInfo.email],
      action: locale === 'hr-HR' ? 'Pošalji email' : locale === 'en-US' ? 'Send email' : 'E-Mail senden',
      href: `mailto:${contactInfo.email}`,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: MapPin,
      title: locale === 'hr-HR' ? 'Lokacija' : locale === 'en-US' ? 'Location' : 'Standort',
      details: [contactInfo.address, `${contactInfo.postalCode} ${contactInfo.city}`],
      action: locale === 'hr-HR' ? 'Otvori mapu' : locale === 'en-US' ? 'Open map' : 'Karte öffnen',
      href: '#map',
      color: 'from-orangeCTA to-orange-600',
    },
    {
      icon: Calendar,
      title: locale === 'hr-HR' ? 'Rezervacija' : locale === 'en-US' ? 'Booking' : 'Buchung',
      details: ['Online booking', locale === 'hr-HR' ? 'Dostupno 24/7' : locale === 'en-US' ? 'Available 24/7' : '24/7 verfügbar'],
      action: locale === 'hr-HR' ? 'Zakaži termin' : locale === 'en-US' ? 'Schedule appointment' : 'Termin vereinbaren',
      href: '/kontakt',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  // Working hours
  const workingHours = [
    {
      day: locale === 'hr-HR' ? 'Ponedjeljak - Petak' : locale === 'en-US' ? 'Monday - Friday' : 'Montag - Freitag',
      hours: '8:00 - 20:00',
    },
    {
      day: locale === 'hr-HR' ? 'Subota' : locale === 'en-US' ? 'Saturday' : 'Samstag',
      hours: '9:00 - 14:00',
    },
    {
      day: locale === 'hr-HR' ? 'Nedjelja' : locale === 'en-US' ? 'Sunday' : 'Sonntag',
      hours: locale === 'hr-HR' ? 'Zatvoreno' : locale === 'en-US' ? 'Closed' : 'Geschlossen',
    },
  ]

  // Service names for dropdown
  const serviceNames = services.map((s) => getLocalizedContent(s.name, locale))

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
            className="text-center max-w-3xl mx-auto"
          >
            <div className="text-sm tracking-widest text-blue-300 mb-6">
              {locale === 'hr-HR' ? 'KONTAKTIRAJTE NAS' : locale === 'en-US' ? 'CONTACT US' : 'KONTAKTIEREN SIE UNS'}
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight font-serif">
              {locale === 'hr-HR' ? (
                <>Tu smo<br />za vas</>
              ) : locale === 'en-US' ? (
                <>We're here<br />for you</>
              ) : (
                <>Wir sind<br />für Sie da</>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {locale === 'hr-HR'
                ? 'Imate pitanja? Trebate savjet? Želite zakazati pregled? Kontaktirajte nas - odgovorit ćemo vam u najkraćem roku.'
                : locale === 'en-US'
                ? 'Have questions? Need advice? Want to schedule an appointment? Contact us - we will respond as soon as possible.'
                : 'Haben Sie Fragen? Brauchen Sie Beratung? Möchten Sie einen Termin vereinbaren? Kontaktieren Sie uns - wir werden Ihnen schnellstmöglich antworten.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <method.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3">{method.title}</h3>

                <div className="space-y-1 mb-6">
                  {method.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:gap-4 transition-all">
                  {method.action}
                  <span className="text-lg">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <h2 className="text-5xl font-bold mb-4 font-serif">
                  {locale === 'hr-HR' ? 'Pošaljite poruku' : locale === 'en-US' ? 'Send a Message' : 'Nachricht senden'}
                </h2>
                <p className="text-gray-600 text-lg">
                  {locale === 'hr-HR'
                    ? 'Popunite formu ispod i javit ćemo vam se u roku od 24 sata.'
                    : locale === 'en-US'
                    ? 'Fill out the form below and we will get back to you within 24 hours.'
                    : 'Füllen Sie das Formular aus und wir werden uns innerhalb von 24 Stunden bei Ihnen melden.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'hr-HR' ? 'Ime i prezime' : locale === 'en-US' ? 'Full Name' : 'Vollständiger Name'}{' '}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder={locale === 'hr-HR' ? 'Vaše ime i prezime' : locale === 'en-US' ? 'Your full name' : 'Ihr vollständiger Name'}
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {locale === 'hr-HR' ? 'Telefon' : locale === 'en-US' ? 'Phone' : 'Telefon'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="+385 91 234 5678"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'hr-HR' ? 'Odaberite uslugu' : locale === 'en-US' ? 'Select Service' : 'Dienst auswählen'}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors appearance-none bg-white"
                  >
                    <option value="">
                      {locale === 'hr-HR' ? '-- Odaberite uslugu --' : locale === 'en-US' ? '-- Select service --' : '-- Dienst auswählen --'}
                    </option>
                    {serviceNames.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'hr-HR' ? 'Poruka' : locale === 'en-US' ? 'Message' : 'Nachricht'}{' '}
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder={
                      locale === 'hr-HR'
                        ? 'Kako vam možemo pomoći?'
                        : locale === 'en-US'
                        ? 'How can we help you?'
                        : 'Wie können wir Ihnen helfen?'
                    }
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-lg font-semibold text-white flex items-center justify-center gap-3 transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-orangeCTA hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {locale === 'hr-HR' ? 'Šalje se...' : locale === 'en-US' ? 'Sending...' : 'Wird gesendet...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {locale === 'hr-HR' ? 'Pošalji poruku' : locale === 'en-US' ? 'Send Message' : 'Nachricht senden'}
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p className="text-green-700 font-medium">
                      {locale === 'hr-HR'
                        ? 'Poruka uspješno poslana! Javit ćemo vam se uskoro.'
                        : locale === 'en-US'
                        ? 'Message sent successfully! We will get back to you soon.'
                        : 'Nachricht erfolgreich gesendet! Wir werden uns bald bei Ihnen melden.'}
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                    <p className="text-rose-700 font-medium">{formError}</p>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Working Hours */}
              <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif">
                    {locale === 'hr-HR' ? 'Radno vrijeme' : locale === 'en-US' ? 'Working Hours' : 'Öffnungszeiten'}
                  </h3>
                </div>

                <div className="space-y-4">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0">
                      <span className="text-gray-300">{schedule.day}</span>
                      <span className="font-semibold">{schedule.hours}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Quick Info Cards */}
              <div className="grid gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">
                        {locale === 'hr-HR' ? 'Brz odgovor' : locale === 'en-US' ? 'Quick Response' : 'Schnelle Antwort'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {locale === 'hr-HR'
                          ? 'Prosječno vrijeme odgovora je manje od 2 sata tokom radnog vremena.'
                          : locale === 'en-US'
                          ? 'Average response time is less than 2 hours during working hours.'
                          : 'Die durchschnittliche Antwortzeit beträgt weniger als 2 Stunden während der Arbeitszeiten.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">
                        {locale === 'hr-HR' ? 'Online rezervacija' : locale === 'en-US' ? 'Online Booking' : 'Online-Buchung'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {locale === 'hr-HR'
                          ? 'Zakažite svoj termin online bilo kada - dostupno 24/7.'
                          : locale === 'en-US'
                          ? 'Schedule your appointment online anytime - available 24/7.'
                          : 'Vereinbaren Sie Ihren Termin jederzeit online - rund um die Uhr verfügbar.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-6">
                <h4 className="font-bold text-rose-900 mb-3">
                  {locale === 'hr-HR' ? 'Hitni slučajevi' : locale === 'en-US' ? 'Emergencies' : 'Notfälle'}
                </h4>
                <p className="text-sm text-rose-700 mb-4">
                  {locale === 'hr-HR'
                    ? 'Za hitne medicinske slučajeve nazovite:'
                    : locale === 'en-US'
                    ? 'For medical emergencies, call:'
                    : 'Für medizinische Notfälle rufen Sie an:'}
                </p>
                <a
                  href="tel:112"
                  className="inline-flex items-center gap-2 text-2xl font-bold text-rose-600 hover:text-rose-700 transition-colors"
                >
                  <Phone className="w-6 h-6" />
                  112
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 font-serif">
              {locale === 'hr-HR' ? 'Posjetite nas' : locale === 'en-US' ? 'Visit Us' : 'Besuchen Sie uns'}
            </h2>
            <p className="text-xl text-gray-600">
              {locale === 'hr-HR'
                ? `Lako nas pronađite u ${contactInfo.city}`
                : locale === 'en-US'
                ? `Find us easily in ${contactInfo.city}`
                : `Finden Sie uns einfach in ${contactInfo.city}`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44493.5711845768!2d16.119063106998336!3d45.814298470552195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47667aba94930067%3A0x11e28535ece6bde!2sPoliklinika%20Atria!5e0!3m2!1shr!2shr!4v1780995760985!5m2!1shr!2shr"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          {/* Directions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 mt-12"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold mb-3">
                {locale === 'hr-HR' ? '🚗 Automobilom' : locale === 'en-US' ? '🚗 By Car' : '🚗 Mit dem Auto'}
              </h4>
              <p className="text-sm text-gray-600">
                {locale === 'hr-HR'
                  ? 'Besplatan parking dostupan ispred zgrade. 10 min od autoceste.'
                  : locale === 'en-US'
                  ? 'Free parking available in front of the building. 10 min from highway.'
                  : 'Kostenlose Parkplätze vor dem Gebäude. 10 Min. von der Autobahn.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold mb-3">
                {locale === 'hr-HR' ? '🚌 Javni prijevoz' : locale === 'en-US' ? '🚌 Public Transport' : '🚌 Öffentliche Verkehrsmittel'}
              </h4>
              <p className="text-sm text-gray-600">
                {locale === 'hr-HR'
                  ? 'Autobus 273 od Glavnog kolodvora. Stanica "Dugo Selo Centar".'
                  : locale === 'en-US'
                  ? 'Bus 273 from the Main Station. Stop "Dugo Selo Center".'
                  : 'Bus 273 vom Hauptbahnhof. Haltestelle "Dugo Selo Zentrum".'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold mb-3">
                {locale === 'hr-HR' ? '♿ Pristupačnost' : locale === 'en-US' ? '♿ Accessibility' : '♿ Barrierefreiheit'}
              </h4>
              <p className="text-sm text-gray-600">
                {locale === 'hr-HR'
                  ? 'Zgrada je potpuno pristupačna osobama s invaliditetom.'
                  : locale === 'en-US'
                  ? 'The building is fully accessible to people with disabilities.'
                  : 'Das Gebäude ist vollständig barrierefrei zugänglich.'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 font-serif">
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-bold text-lg mb-2">{getLocalizedContent(faq.question, locale)}</h4>
                  <p className="text-gray-600">{getLocalizedContent(faq.answer, locale)}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                {locale === 'hr-HR'
                  ? 'Nema dostupnih pitanja.'
                  : locale === 'en-US'
                  ? 'No questions available.'
                  : 'Keine Fragen verfügbar.'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orangeCTA py-20 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-8 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            {locale === 'hr-HR'
              ? 'Spremni za sljedeći korak?'
              : locale === 'en-US'
              ? 'Ready for the next step?'
              : 'Bereit für den nächsten Schritt?'}
          </h2>
          <p className="text-xl mb-10 text-white/90">
            {locale === 'hr-HR'
              ? 'Zakažite svoj pregled danas i započnite put prema boljem zdravlju'
              : locale === 'en-US'
              ? 'Schedule your appointment today and start your journey to better health'
              : 'Vereinbaren Sie noch heute Ihren Termin und beginnen Sie Ihren Weg zu besserer Gesundheit'}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/usluge"
              className="inline-block px-12 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-900 transition-all"
            >
              {locale === 'hr-HR' ? 'Pogledaj usluge' : locale === 'en-US' ? 'View Services' : 'Dienste ansehen'}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
