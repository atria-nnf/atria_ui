import type { Metadata } from 'next'
import { Ubuntu, Playfair_Display } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import { LocaleProvider } from '@/config/locale-context'
import { CookieConsentProvider } from '@/config/cookie-consent-context'
import { LenisProvider } from '@/components/LenisProvider'
import { CookieConsentBanner, CookiePreferenceCenter } from '@/components/cookies'

const ubuntu = Ubuntu({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Poliklinika Atria | Moderna medicina koja vas razumije',
    template: '%s | Poliklinika Atria',
  },
  description:
    'Poliklinika Atria - moderna medicina koja vas razumije. Stručni liječnici, najnovija oprema i individualan pristup svakom pacijentu.',
  keywords: [
    'poliklinika',
    'atria',
    'medicina',
    'zdravlje',
    'doktori',
    'ginekologija',
    'kardiologija',
    'dermatologija',
    'Dugo Selo',
  ],
  authors: [{ name: 'Poliklinika Atria' }],
  creator: 'Poliklinika Atria',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    alternateLocale: ['en_US', 'de_DE'],
    siteName: 'Poliklinika Atria',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="hr"
      className={`${ubuntu.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LocaleProvider>
          <CookieConsentProvider>
            <LenisProvider>
              {children}
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </LenisProvider>
            <CookieConsentBanner />
            <CookiePreferenceCenter />
          </CookieConsentProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
