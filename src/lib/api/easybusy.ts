/**
 * EasyBusy B2B REST API integration
 * Fetches the clinic's official price list with anchor prices (sidrene cijene)
 * Docs: https://easybusy.notion.site/API-grupa-Cjenik-usluga-1045c94a9b24801da871ef0ec37c90b4
 */

const EASYBUSY_BASE_URL = 'https://api-b2b.easybusy.software/v2'

export interface EasyBusyPriceListItem {
  serviceId: number
  serviceName: string
  serviceCategoryId: number | null
  category: string | null
  languageCode: string
  unitPrice: number
  vatPercent: number | null
  unitPriceAfterVat: number
  anchorUnitPrice: number | null
  anchorVatPercent: number | null
  anchorUnitPriceAfterVat: number | null
  anchorPriceDate: string | null
  currencyCode: string
}

export interface EasyBusyServiceCategory {
  serviceCategoryId: number
  code: string | null
  name: string
  sortRank: number
}

async function easyBusyFetch<T>(path: string): Promise<T | null> {
  const apiKey = process.env.EASYBUSY_API_KEY
  if (!apiKey) {
    console.error('EASYBUSY_API_KEY is not set')
    return null
  }

  try {
    const response = await fetch(`${EASYBUSY_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error(`EasyBusy API error ${response.status} for ${path}`)
      return null
    }

    return (await response.json()) as T
  } catch (err) {
    console.error(`Error fetching EasyBusy ${path}:`, err)
    return null
  }
}

/**
 * Fetch the price list, optionally for a past date (archive, last 15 days)
 */
export async function getEasyBusyPriceList(forDate?: string): Promise<EasyBusyPriceListItem[]> {
  const query = forDate ? `?forDate=${forDate}` : ''
  return (await easyBusyFetch<EasyBusyPriceListItem[]>(`/price-list${query}`)) ?? []
}

/**
 * Fetch service categories (sorted by sortRank, then name)
 */
export async function getEasyBusyServiceCategories(): Promise<EasyBusyServiceCategory[]> {
  return (await easyBusyFetch<EasyBusyServiceCategory[]>('/service-categories')) ?? []
}

/**
 * Fetch the machine-readable price list export (.xml or .csv), optionally for a past date.
 * Required by the sidrena cijena regulation (NN 101/2026) — the price list must be
 * publicly available on the website in a machine-readable format.
 */
export async function getEasyBusyPriceListExport(
  format: 'xml' | 'csv',
  forDate?: string
): Promise<string | null> {
  const apiKey = process.env.EASYBUSY_API_KEY
  if (!apiKey) {
    console.error('EASYBUSY_API_KEY is not set')
    return null
  }

  const query = forDate ? `?forDate=${forDate}` : ''
  try {
    const response = await fetch(`${EASYBUSY_BASE_URL}/export-price-list/${format}${query}`, {
      headers: { 'X-API-KEY': apiKey },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error(`EasyBusy export API error ${response.status} for ${format}`)
      return null
    }

    return await response.text()
  } catch (err) {
    console.error(`Error fetching EasyBusy ${format} export:`, err)
    return null
  }
}
