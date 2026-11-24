import { Metadata } from 'next'
import { getEasyBusyPriceList, getEasyBusyServiceCategories } from '@/lib/api/easybusy'
import { CjenikPageClient } from './CjenikPageClient'

export const metadata: Metadata = {
  title: 'Cjenik',
  description:
    'Aktualni cjenik usluga Poliklinike Atria sa sidrenim cijenama i arhivom cjenika za posljednjih 15 dana.',
}

// Dynamic page - price list loaded at request time from EasyBusy
export const dynamic = 'force-dynamic'

const ARCHIVE_DAYS = 15

interface Props {
  searchParams: Promise<{ datum?: string }>
}

/** Format a date as YYYY-MM-DD in the clinic's timezone */
function toDateString(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zagreb' }).format(date)
}

export default async function CjenikPage({ searchParams }: Props) {
  const { datum } = await searchParams

  // Archive covers the previous 15 days (today = current price list)
  const archiveDates: string[] = []
  for (let i = 1; i <= ARCHIVE_DAYS; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    archiveDates.push(toDateString(d))
  }

  const selectedDate = datum && archiveDates.includes(datum) ? datum : null

  const [priceList, categories] = await Promise.all([
    getEasyBusyPriceList(selectedDate ?? undefined),
    getEasyBusyServiceCategories(),
  ])

  return (
    <CjenikPageClient
      priceList={priceList}
      categories={categories}
      selectedDate={selectedDate}
      archiveDates={archiveDates}
    />
  )
}
