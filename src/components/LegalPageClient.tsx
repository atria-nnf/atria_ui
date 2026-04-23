'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, Calendar } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import type { LegalPageSettings } from '@/types'

interface LegalPageClientProps {
  data: LegalPageSettings | null
  pageType: 'privacy' | 'terms' | 'cookies'
}

export function LegalPageClient({ data, pageType }: LegalPageClientProps) {
  const { locale } = useLocale()

  // Page titles by type and locale
  const pageTitles = {
    privacy: {
      'hr-HR': 'Pravila privatnosti',
      'en-US': 'Privacy Policy',
      'de-DE': 'Datenschutzrichtlinie',
    },
    terms: {
      'hr-HR': 'Uvjeti korištenja',
      'en-US': 'Terms of Service',
      'de-DE': 'Nutzungsbedingungen',
    },
    cookies: {
      'hr-HR': 'Politika kolačića',
      'en-US': 'Cookie Policy',
      'de-DE': 'Cookie-Richtlinie',
    },
  }

  const backText = {
    'hr-HR': 'Natrag na početnu',
    'en-US': 'Back to home',
    'de-DE': 'Zurück zur Startseite',
  }

  const lastUpdatedText = {
    'hr-HR': 'Zadnje ažurirano',
    'en-US': 'Last updated',
    'de-DE': 'Zuletzt aktualisiert',
  }

  const defaultContent = {
    privacy: {
      'hr-HR': `# Pravila privatnosti

## 1. Uvod

Poliklinika Atria ("mi", "nas" ili "naša") poštuje vašu privatnost i obvezuje se zaštititi vaše osobne podatke. Ova pravila privatnosti objašnjavaju kako prikupljamo, koristimo i štitimo vaše osobne podatke.

## 2. Podaci koje prikupljamo

Možemo prikupljati sljedeće vrste podataka:
- Kontaktne podatke (ime, email, telefon)
- Medicinske podatke potrebne za pružanje usluga
- Podatke o korištenju web stranice

## 3. Kako koristimo vaše podatke

Vaše podatke koristimo za:
- Pružanje medicinskih usluga
- Komunikaciju s vama
- Poboljšanje naših usluga
- Ispunjavanje zakonskih obveza

## 4. Vaša prava

Imate pravo na:
- Pristup vašim osobnim podacima
- Ispravak netočnih podataka
- Brisanje podataka
- Ograničenje obrade
- Prijenos podataka

## 5. Kontakt

Za sva pitanja o privatnosti, kontaktirajte nas na info@atria.hr.`,
      'en-US': `# Privacy Policy

## 1. Introduction

Poliklinika Atria ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your personal data.

## 2. Data We Collect

We may collect the following types of data:
- Contact information (name, email, phone)
- Medical data necessary for providing services
- Website usage data

## 3. How We Use Your Data

We use your data to:
- Provide medical services
- Communicate with you
- Improve our services
- Fulfill legal obligations

## 4. Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate data
- Delete data
- Restrict processing
- Data portability

## 5. Contact

For any privacy questions, contact us at info@atria.hr.`,
      'de-DE': `# Datenschutzrichtlinie

## 1. Einführung

Poliklinika Atria ("wir", "uns" oder "unser") respektiert Ihre Privatsphäre und verpflichtet sich, Ihre persönlichen Daten zu schützen.

## 2. Daten, die wir erheben

Wir können folgende Arten von Daten erheben:
- Kontaktdaten (Name, E-Mail, Telefon)
- Medizinische Daten
- Website-Nutzungsdaten

## 3. Kontakt

Bei Fragen zum Datenschutz kontaktieren Sie uns unter info@atria.hr.`,
    },
    terms: {
      'hr-HR': `# Uvjeti korištenja

## 1. Opće odredbe

Korištenjem web stranice Poliklinike Atria prihvaćate ove uvjete korištenja.

## 2. Usluge

Poliklinika Atria pruža medicinske usluge u skladu sa svim primjenjivim zakonima i propisima.

## 3. Intelektualno vlasništvo

Sav sadržaj na ovoj stranici zaštićen je autorskim pravima.

## 4. Ograničenje odgovornosti

Informacije na ovoj stranici služe isključivo u informativne svrhe i ne zamjenjuju profesionalni medicinski savjet.

## 5. Izmjene uvjeta

Zadržavamo pravo izmjene ovih uvjeta u bilo kojem trenutku.

## 6. Kontakt

Za pitanja o uvjetima korištenja, kontaktirajte nas na info@atria.hr.`,
      'en-US': `# Terms of Service

## 1. General Provisions

By using the Poliklinika Atria website, you accept these terms of service.

## 2. Services

Poliklinika Atria provides medical services in accordance with all applicable laws and regulations.

## 3. Intellectual Property

All content on this site is protected by copyright.

## 4. Limitation of Liability

Information on this site is for informational purposes only and does not replace professional medical advice.

## 5. Changes to Terms

We reserve the right to modify these terms at any time.

## 6. Contact

For questions about terms of service, contact us at info@atria.hr.`,
      'de-DE': `# Nutzungsbedingungen

## 1. Allgemeine Bestimmungen

Mit der Nutzung der Website von Poliklinika Atria akzeptieren Sie diese Nutzungsbedingungen.

## 2. Dienstleistungen

Poliklinika Atria erbringt medizinische Dienstleistungen gemäß allen geltenden Gesetzen und Vorschriften.

## 3. Kontakt

Bei Fragen zu den Nutzungsbedingungen kontaktieren Sie uns unter info@atria.hr.`,
    },
    cookies: {
      'hr-HR': `# Politika kolačića

## 1. Što su kolačići?

Kolačići su male tekstualne datoteke koje se pohranjuju na vašem uređaju kada posjetite web stranicu.

## 2. Vrste kolačića koje koristimo

### Nužni kolačići
Ovi kolačići su potrebni za funkcioniranje web stranice.

### Analitički kolačići
Koristimo analitičke kolačiće za razumijevanje načina korištenja naše stranice.

### Funkcionalni kolačići
Ovi kolačići omogućuju dodatne funkcionalnosti poput personalizacije.

## 3. Upravljanje kolačićima

Možete upravljati postavkama kolačića u svom pregledniku.

## 4. Kontakt

Za pitanja o kolačićima, kontaktirajte nas na info@atria.hr.`,
      'en-US': `# Cookie Policy

## 1. What Are Cookies?

Cookies are small text files stored on your device when you visit a website.

## 2. Types of Cookies We Use

### Necessary Cookies
These cookies are required for the website to function.

### Analytics Cookies
We use analytics cookies to understand how our site is used.

### Functional Cookies
These cookies enable additional functionalities such as personalization.

## 3. Managing Cookies

You can manage cookie settings in your browser.

## 4. Contact

For questions about cookies, contact us at info@atria.hr.`,
      'de-DE': `# Cookie-Richtlinie

## 1. Was sind Cookies?

Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen.

## 2. Arten von Cookies, die wir verwenden

### Notwendige Cookies
Diese Cookies sind für das Funktionieren der Website erforderlich.

### Analyse-Cookies
Wir verwenden Analyse-Cookies, um zu verstehen, wie unsere Website genutzt wird.

## 3. Kontakt

Bei Fragen zu Cookies kontaktieren Sie uns unter info@atria.hr.`,
    },
  }

  const title = data?.title
    ? getLocalizedContent(data.title, locale)
    : pageTitles[pageType][locale]

  const content = data?.content
    ? getLocalizedContent(data.content, locale)
    : defaultContent[pageType][locale]

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white text-black font-sans min-h-screen">
      {/* Back Button */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>{backText[locale]}</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Header */}
      <header className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-serif">
              {title}
            </h1>

            {data?.lastUpdated && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>
                  {lastUpdatedText[locale]}: {formatDate(data.lastUpdated)}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline"
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </motion.div>
      </div>
    </div>
  )
}
