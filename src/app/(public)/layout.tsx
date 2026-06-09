import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { getServices, getContactInfo } from '@/lib/api'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [services, contactInfo] = await Promise.all([
    getServices(),
    getContactInfo(),
  ])

  return (
    <>
      <NavBar services={services} contactInfo={contactInfo} />
      <main className="bg-white flex-1">{children}</main>
      <Footer services={services} contactInfo={contactInfo} />
      <ScrollToTop />
    </>
  )
}
