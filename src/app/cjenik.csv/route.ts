import { NextRequest } from 'next/server'
import { getEasyBusyPriceListExport } from '@/lib/api/easybusy'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Machine-readable price list in CSV, publicly accessible as required by the
 * sidrena cijena regulation (NN 101/2026). Supports ?datum=YYYY-MM-DD for archive.
 */
export async function GET(request: NextRequest) {
  const datum = request.nextUrl.searchParams.get('datum')
  const forDate = datum && DATE_RE.test(datum) ? datum : undefined

  const csv = await getEasyBusyPriceListExport('csv', forDate)
  if (csv === null) {
    return new Response('Cjenik nije dostupan', { status: 503 })
  }

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `inline; filename="cjenik${forDate ? `_${forDate}` : ''}.csv"`,
    },
  })
}
