'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Archive, ArrowLeft, CalendarDays, FileDown } from 'lucide-react'
import { useLocale } from '@/config/locale-context'
import type { Locale } from '@/types'
import type { EasyBusyPriceListItem, EasyBusyServiceCategory } from '@/lib/api/easybusy'

interface CjenikPageClientProps {
  priceList: EasyBusyPriceListItem[]
  categories: EasyBusyServiceCategory[]
  selectedDate: string | null
  archiveDates: string[]
}

const UI_TEXT: Record<string, Record<Locale, string>> = {
  heroTitle: {
    'hr-HR': 'Cjenik usluga',
    'en-US': 'Price List',
    'de-DE': 'Preisliste',
  },
  heroSubtitle: {
    'hr-HR': 'Transparentne cijene svih naših usluga sa sidrenim cijenama, bez skrivenih troškova.',
    'en-US': 'Transparent prices for all our services with anchor prices, no hidden costs.',
    'de-DE': 'Transparente Preise für alle unsere Leistungen mit Ankerpreisen, ohne versteckte Kosten.',
  },
  all: { 'hr-HR': 'Sve', 'en-US': 'All', 'de-DE': 'Alle' },
  other: { 'hr-HR': 'Ostalo', 'en-US': 'Other', 'de-DE': 'Sonstiges' },
  service: { 'hr-HR': 'Usluga', 'en-US': 'Service', 'de-DE': 'Leistung' },
  price: { 'hr-HR': 'Cijena', 'en-US': 'Price', 'de-DE': 'Preis' },
  anchorPrice: {
    'hr-HR': 'Sidrena cijena',
    'en-US': 'Anchor price',
    'de-DE': 'Ankerpreis',
  },
  anchorFrom: { 'hr-HR': 'od', 'en-US': 'from', 'de-DE': 'ab' },
  currentPriceList: {
    'hr-HR': 'Aktualni cjenik',
    'en-US': 'Current price list',
    'de-DE': 'Aktuelle Preisliste',
  },
  archiveLabel: {
    'hr-HR': 'Arhiva cjenika',
    'en-US': 'Price list archive',
    'de-DE': 'Preislisten-Archiv',
  },
  archiveViewing: {
    'hr-HR': 'Pregledavate arhivirani cjenik važeći na dan',
    'en-US': 'You are viewing the archived price list valid on',
    'de-DE': 'Sie sehen die archivierte Preisliste gültig am',
  },
  backToCurrent: {
    'hr-HR': 'Natrag na aktualni cjenik',
    'en-US': 'Back to current price list',
    'de-DE': 'Zurück zur aktuellen Preisliste',
  },
  emptyList: {
    'hr-HR': 'Cjenik trenutno nije dostupan. Molimo pokušajte kasnije ili nas kontaktirajte.',
    'en-US': 'The price list is currently unavailable. Please try again later or contact us.',
    'de-DE': 'Die Preisliste ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns.',
  },
  download: {
    'hr-HR': 'Preuzmi cjenik',
    'en-US': 'Download price list',
    'de-DE': 'Preisliste herunterladen',
  },
  footnote: {
    'hr-HR':
      '* Cijene su izražene u eurima (EUR). Sidrena cijena je najniža cijena usluge koju je poliklinika primjenjivala u posljednjih 30 dana, sukladno Zakonu o zaštiti potrošača.',
    'en-US':
      '* Prices are in euros (EUR). The anchor price is the lowest price applied in the last 30 days, in accordance with the Croatian Consumer Protection Act.',
    'de-DE':
      '* Preise sind in Euro (EUR) angegeben. Der Ankerpreis ist der niedrigste Preis der letzten 30 Tage gemäß dem kroatischen Verbraucherschutzgesetz.',
  },
}

const INTL_LOCALE: Record<Locale, string> = {
  'hr-HR': 'hr-HR',
  'en-US': 'en-US',
  'de-DE': 'de-DE',
}

export function CjenikPageClient({
  priceList,
  categories,
  selectedDate,
  archiveDates,
}: CjenikPageClientProps) {
  const { locale } = useLocale()
  const router = useRouter()
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const t = (key: keyof typeof UI_TEXT) => UI_TEXT[key][locale] || UI_TEXT[key]['hr-HR']

  const formatPrice = (value: number, currencyCode: string) =>
    new Intl.NumberFormat(INTL_LOCALE[locale], {
      style: 'currency',
      currency: currencyCode || 'EUR',
    }).format(value)

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat(INTL_LOCALE[locale], {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format(new Date(`${dateString}T12:00:00`))

  // Group price list items by category, ordered by category sortRank
  const groups = useMemo(() => {
    const byCategoryId = new Map<number | null, EasyBusyPriceListItem[]>()
    for (const item of priceList) {
      const key = item.serviceCategoryId ?? null
      const list = byCategoryId.get(key) || []
      list.push(item)
      byCategoryId.set(key, list)
    }

    const ordered: { categoryId: number | null; name: string; items: EasyBusyPriceListItem[] }[] = []
    for (const category of categories) {
      const items = byCategoryId.get(category.serviceCategoryId)
      if (items && items.length > 0) {
        ordered.push({
          categoryId: category.serviceCategoryId,
          name: category.name.trim(),
          items,
        })
        byCategoryId.delete(category.serviceCategoryId)
      }
    }
    // Categories not returned by /service-categories (or uncategorized items) go last
    for (const [categoryId, items] of byCategoryId) {
      ordered.push({
        categoryId,
        name: items[0]?.category?.trim() || UI_TEXT.other[locale],
        items,
      })
    }
    return ordered
  }, [priceList, categories, locale])

  const visibleGroups =
    selectedCategoryId === null
      ? groups
      : groups.filter((group) => group.categoryId === selectedCategoryId)

  const handleDateChange = (value: string) => {
    setSelectedCategoryId(null)
    router.push(value ? `/cjenik?datum=${value}` : '/cjenik')
  }

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
        <div className="relative max-w-7xl mx-auto px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold font-serif mb-6"
          >
            {t('heroTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            {t('heroSubtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          {/* Archive selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            <label
              htmlFor="cjenik-datum"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600"
            >
              <CalendarDays className="w-4 h-4" />
              {t('archiveLabel')}
            </label>
            <select
              id="cjenik-datum"
              value={selectedDate ?? ''}
              onChange={(e) => handleDateChange(e.target.value)}
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orangeCTA/40 cursor-pointer"
            >
              <option value="">{t('currentPriceList')}</option>
              {archiveDates.map((date) => (
                <option key={date} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
            <span className="hidden sm:block w-px h-5 bg-gray-200" />
            <span className="inline-flex items-center gap-2 text-sm text-gray-600">
              <FileDown className="w-4 h-4" />
              {t('download')}:
              <a
                href={selectedDate ? `/cjenik.xml?datum=${selectedDate}` : '/cjenik.xml'}
                className="font-medium text-orangeCTA hover:underline"
              >
                XML
              </a>
              <a
                href={selectedDate ? `/cjenik.csv?datum=${selectedDate}` : '/cjenik.csv'}
                className="font-medium text-orangeCTA hover:underline"
              >
                CSV
              </a>
            </span>
          </motion.div>

          {/* Archive notice */}
          {selectedDate && (
            <div className="max-w-3xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-50 border border-amber-200 rounded-xl px-6 py-4">
              <p className="text-sm text-amber-900 flex items-center gap-2">
                <Archive className="w-4 h-4 flex-shrink-0" />
                {t('archiveViewing')} {formatDate(selectedDate)}
              </p>
              <button
                onClick={() => handleDateChange('')}
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-900 hover:text-amber-700 whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('backToCurrent')}
              </button>
            </div>
          )}

          {/* Category filter chips */}
          {groups.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {[{ categoryId: null as number | null, name: t('all') }, ...groups].map((chip) => {
                const isActive = selectedCategoryId === chip.categoryId
                return (
                  <button
                    key={chip.categoryId ?? 'all'}
                    onClick={() => setSelectedCategoryId(chip.categoryId)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-orangeCTA text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    {chip.name}
                  </button>
                )
              })}
            </motion.div>
          )}

          {/* Price list grouped by category */}
          {priceList.length === 0 ? (
            <p className="text-center text-gray-500 py-16">{t('emptyList')}</p>
          ) : (
            <div className="max-w-5xl mx-auto space-y-10">
              {visibleGroups.map((group) => (
                <motion.div
                  key={group.categoryId ?? 'other'}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold font-serif mb-4">{group.name}</h2>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Header row */}
                    <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-6 px-6 py-3 bg-gray-100/70 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      <span>{t('service')}</span>
                      <span className="w-40 text-right">{t('anchorPrice')}*</span>
                      <span className="w-28 text-right">{t('price')}</span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {group.items.map((item) => {
                        const currentPrice = item.unitPriceAfterVat ?? item.unitPrice
                        const anchorPrice = item.anchorUnitPriceAfterVat ?? item.anchorUnitPrice
                        return (
                          <div
                            key={item.serviceId}
                            className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-1 sm:gap-6 px-6 py-4 hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900">
                              {item.serviceName.trim()}
                            </span>
                            <span className="sm:w-40 text-sm text-gray-500 sm:text-right sm:self-center">
                              <span className="sm:hidden">{t('anchorPrice')}*: </span>
                              {anchorPrice != null ? formatPrice(anchorPrice, item.currencyCode) : '—'}
                              {item.anchorPriceDate && (
                                <span className="text-xs text-gray-400">
                                  {' '}
                                  ({t('anchorFrom')} {formatDate(item.anchorPriceDate)})
                                </span>
                              )}
                            </span>
                            <span className="sm:w-28 text-lg font-bold text-orangeCTA sm:text-right sm:self-center">
                              {formatPrice(currentPrice, item.currencyCode)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-12 max-w-3xl mx-auto">
            {t('footnote')}
          </p>
        </div>
      </section>
    </div>
  )
}
