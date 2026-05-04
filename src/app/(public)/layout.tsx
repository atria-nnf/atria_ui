import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { getServices } from '@/lib/api'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const services = await getServices()

  return (
    <>
      <NavBar services={services} />
      <main className="bg-white flex-1">{children}</main>
      <Footer services={services} />
      <ScrollToTop />
    </>
  )
}
