import { Metadata } from 'next'
import { getAboutUsPage, getFeaturedDoctors } from '@/lib/api'
import { AboutUsPageClient } from './AboutUsPageClient'

export const metadata: Metadata = {
  title: 'O nama',
  description:
    'Saznajte više o Poliklinici Atria - naša misija, vizija, vrijednosti i tim stručnjaka.',
}

export default async function AboutUsPage() {
  const [aboutData, doctors] = await Promise.all([
    getAboutUsPage(),
    getFeaturedDoctors(),
  ])

  return <AboutUsPageClient aboutData={aboutData} doctors={doctors.slice(0, 3)} />
}
