'use client'
import { useState, useEffect } from 'react'
import { getSetting, updateSetting } from '@/lib/api/admin/settings'
import { Input } from '@/components/admin/ui/Input'
import { Button } from '@/components/admin/ui/Button'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { ImageUpload } from '@/components/admin/ui/ImageUpload'
import { Save, Building2, Phone, FileText, Plus, X, GripVertical, Image as ImageIcon, Briefcase } from 'lucide-react'
import type { HomepageStat, HomepageProcessStep, HomepageGalleryImage, ServicesPageStat, ServicesPageWhyItem, AboutUsStat, AboutUsValue, AboutUsMilestone, Locale } from '@/types'

type Tab = 'contact' | 'homepage' | 'services' | 'about'

const emptyLocalized = (): Record<Locale, string> => ({ 'hr-HR': '', 'en-US': '', 'de-DE': '' })

// Available icons for items
const ICON_OPTIONS = [
  { value: 'Users', label: 'Tim' },
  { value: 'Microscope', label: 'Mikroskop' },
  { value: 'User', label: 'Osoba' },
  { value: 'Zap', label: 'Munja' },
  { value: 'Building2', label: 'Zgrada' },
  { value: 'DollarSign', label: 'Novac' },
  { value: 'Heart', label: 'Srce' },
  { value: 'Stethoscope', label: 'Stetoskop' },
  { value: 'Target', label: 'Meta' },
  { value: 'Lightbulb', label: 'Žarulja' },
  { value: 'Shield', label: 'Štit' },
  { value: 'Award', label: 'Nagrada' },
]

// Available colors for value items
const COLOR_OPTIONS = [
  { value: 'from-blue-500 to-blue-600', label: 'Plava' },
  { value: 'from-orangeCTA to-orange-600', label: 'Narančasta' },
  { value: 'from-amber-500 to-amber-600', label: 'Žuta' },
  { value: 'from-purple-500 to-purple-600', label: 'Ljubičasta' },
  { value: 'from-green-500 to-green-600', label: 'Zelena' },
  { value: 'from-red-500 to-red-600', label: 'Crvena' },
  { value: 'from-indigo-500 to-indigo-600', label: 'Indigo' },
  { value: 'from-cyan-500 to-cyan-600', label: 'Cyan' },
]

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('contact')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  // Contact Info
  const [contact, setContact] = useState({ clinicName: '', phone: '', email: '', address: '', city: '', postalCode: '' })

  // Homepage
  const [heroTitle, setHeroTitle] = useState<Record<string, string>>(emptyLocalized())
  const [heroSubtitle, setHeroSubtitle] = useState<Record<string, string>>(emptyLocalized())
  const [heroBackgroundImage, setHeroBackgroundImage] = useState('')
  const [ctaButtonText, setCtaButtonText] = useState<Record<string, string>>(emptyLocalized())
  const [stats, setStats] = useState<HomepageStat[]>([])
  const [processSteps, setProcessSteps] = useState<HomepageProcessStep[]>([])
  const [galleryImages, setGalleryImages] = useState<HomepageGalleryImage[]>([])

  // Services Page
  const [servicesHeroTitle, setServicesHeroTitle] = useState<Record<string, string>>(emptyLocalized())
  const [servicesHeroSubtitle, setServicesHeroSubtitle] = useState<Record<string, string>>(emptyLocalized())
  const [servicesStats, setServicesStats] = useState<ServicesPageStat[]>([])
  const [servicesWhyChooseUs, setServicesWhyChooseUs] = useState<ServicesPageWhyItem[]>([])
  const [servicesCtaTitle, setServicesCtaTitle] = useState<Record<string, string>>(emptyLocalized())
  const [servicesCtaSubtitle, setServicesCtaSubtitle] = useState<Record<string, string>>(emptyLocalized())

  // About Us Page
  const [aboutHeroTitle, setAboutHeroTitle] = useState<Record<string, string>>(emptyLocalized())
  const [aboutHeroSubtitle, setAboutHeroSubtitle] = useState<Record<string, string>>(emptyLocalized())
  const [aboutStats, setAboutStats] = useState<AboutUsStat[]>([])
  const [aboutStoryTitle, setAboutStoryTitle] = useState<Record<string, string>>(emptyLocalized())
  const [aboutStoryParagraph1, setAboutStoryParagraph1] = useState<Record<string, string>>(emptyLocalized())
  const [aboutStoryParagraph2, setAboutStoryParagraph2] = useState<Record<string, string>>(emptyLocalized())
  const [aboutStoryImage, setAboutStoryImage] = useState('')
  const [aboutMilestones, setAboutMilestones] = useState<AboutUsMilestone[]>([])
  const [aboutValues, setAboutValues] = useState<AboutUsValue[]>([])
  const [aboutCtaTitle, setAboutCtaTitle] = useState<Record<string, string>>(emptyLocalized())
  const [aboutCtaSubtitle, setAboutCtaSubtitle] = useState<Record<string, string>>(emptyLocalized())

  useEffect(() => {
    const load = async () => {
      const [contactData, homepageData, servicesData, aboutData] = await Promise.all([
        getSetting('contact_info'),
        getSetting('homepage'),
        getSetting('services_page'),
        getSetting('about_us')
      ])
      if (contactData) setContact(contactData)
      if (homepageData) {
        setHeroTitle(homepageData.heroTitle || emptyLocalized())
        setHeroSubtitle(homepageData.heroSubtitle || emptyLocalized())
        setHeroBackgroundImage(homepageData.heroBackgroundImage || '')
        setCtaButtonText(homepageData.ctaButtonText || emptyLocalized())
        setStats(homepageData.stats || [])
        setProcessSteps(homepageData.processSteps || [])
        setGalleryImages(homepageData.galleryImages || [])
      }
      if (servicesData) {
        setServicesHeroTitle(servicesData.heroTitle || emptyLocalized())
        setServicesHeroSubtitle(servicesData.heroSubtitle || emptyLocalized())
        setServicesStats(servicesData.stats || [])
        setServicesWhyChooseUs(servicesData.whyChooseUs || [])
        setServicesCtaTitle(servicesData.ctaTitle || emptyLocalized())
        setServicesCtaSubtitle(servicesData.ctaSubtitle || emptyLocalized())
      }
      if (aboutData) {
        setAboutHeroTitle(aboutData.heroTitle || emptyLocalized())
        setAboutHeroSubtitle(aboutData.heroSubtitle || emptyLocalized())
        setAboutStats(aboutData.stats || [])
        setAboutStoryTitle(aboutData.storyTitle || emptyLocalized())
        setAboutStoryParagraph1(aboutData.storyParagraph1 || emptyLocalized())
        setAboutStoryParagraph2(aboutData.storyParagraph2 || emptyLocalized())
        setAboutStoryImage(aboutData.storyImage || '')
        setAboutMilestones(aboutData.milestones || [])
        setAboutValues(aboutData.values || [])
        setAboutCtaTitle(aboutData.ctaTitle || emptyLocalized())
        setAboutCtaSubtitle(aboutData.ctaSubtitle || emptyLocalized())
      }
    }
    load()
  }, [])

  const save = async () => {
    setLoading(true)
    setSaved(false)
    if (tab === 'contact') await updateSetting('contact_info', contact)
    if (tab === 'homepage') await updateSetting('homepage', {
      heroTitle,
      heroSubtitle,
      heroBackgroundImage,
      ctaButtonText,
      stats,
      processSteps,
      galleryImages,
    })
    if (tab === 'services') await updateSetting('services_page', {
      heroTitle: servicesHeroTitle,
      heroSubtitle: servicesHeroSubtitle,
      stats: servicesStats,
      whyChooseUs: servicesWhyChooseUs,
      ctaTitle: servicesCtaTitle,
      ctaSubtitle: servicesCtaSubtitle,
    })
    if (tab === 'about') await updateSetting('about_us', {
      heroTitle: aboutHeroTitle,
      heroSubtitle: aboutHeroSubtitle,
      stats: aboutStats,
      storyTitle: aboutStoryTitle,
      storyParagraph1: aboutStoryParagraph1,
      storyParagraph2: aboutStoryParagraph2,
      storyImage: aboutStoryImage,
      milestones: aboutMilestones,
      values: aboutValues,
      ctaTitle: aboutCtaTitle,
      ctaSubtitle: aboutCtaSubtitle,
    })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Homepage Stats handlers
  const addStat = () => {
    setStats([...stats, { number: '', label: emptyLocalized() }])
  }
  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index))
  }
  const updateStat = (index: number, field: 'number' | 'label', value: string | Record<Locale, string>) => {
    const newStats = [...stats]
    if (field === 'number') {
      newStats[index].number = value as string
    } else {
      newStats[index].label = value as Record<Locale, string>
    }
    setStats(newStats)
  }

  // Process steps handlers
  const addProcessStep = () => {
    const stepNum = String(processSteps.length + 1).padStart(2, '0')
    setProcessSteps([...processSteps, { step: stepNum, title: emptyLocalized(), description: emptyLocalized() }])
  }
  const removeProcessStep = (index: number) => {
    setProcessSteps(processSteps.filter((_, i) => i !== index))
  }
  const updateProcessStep = (index: number, field: 'step' | 'title' | 'description', value: string | Record<Locale, string>) => {
    const newSteps = [...processSteps]
    if (field === 'step') {
      newSteps[index].step = value as string
    } else if (field === 'title') {
      newSteps[index].title = value as Record<Locale, string>
    } else {
      newSteps[index].description = value as Record<Locale, string>
    }
    setProcessSteps(newSteps)
  }

  // Gallery handlers
  const addGalleryImage = () => {
    setGalleryImages([...galleryImages, { image: '', span: 'col-span-1' }])
  }
  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
  }
  const updateGalleryImage = (index: number, field: 'image' | 'span', value: string) => {
    const newImages = [...galleryImages]
    if (field === 'image') {
      newImages[index].image = value
    } else {
      newImages[index].span = value as HomepageGalleryImage['span']
    }
    setGalleryImages(newImages)
  }

  // Services Page Stats handlers
  const addServicesStat = () => {
    setServicesStats([...servicesStats, { number: '', label: emptyLocalized() }])
  }
  const removeServicesStat = (index: number) => {
    setServicesStats(servicesStats.filter((_, i) => i !== index))
  }
  const updateServicesStat = (index: number, field: 'number' | 'label', value: string | Record<Locale, string>) => {
    const newStats = [...servicesStats]
    if (field === 'number') {
      newStats[index].number = value as string
    } else {
      newStats[index].label = value as Record<Locale, string>
    }
    setServicesStats(newStats)
  }

  // Services Page Why Choose Us handlers
  const addWhyItem = () => {
    setServicesWhyChooseUs([...servicesWhyChooseUs, { title: emptyLocalized(), description: emptyLocalized(), icon: 'Heart' }])
  }
  const removeWhyItem = (index: number) => {
    setServicesWhyChooseUs(servicesWhyChooseUs.filter((_, i) => i !== index))
  }
  const updateWhyItem = (index: number, field: 'title' | 'description' | 'icon', value: string | Record<Locale, string>) => {
    const newItems = [...servicesWhyChooseUs]
    if (field === 'icon') {
      newItems[index].icon = value as string
    } else if (field === 'title') {
      newItems[index].title = value as Record<Locale, string>
    } else {
      newItems[index].description = value as Record<Locale, string>
    }
    setServicesWhyChooseUs(newItems)
  }

  // About Us Stats handlers
  const addAboutStat = () => {
    setAboutStats([...aboutStats, { number: '', label: emptyLocalized() }])
  }
  const removeAboutStat = (index: number) => {
    setAboutStats(aboutStats.filter((_, i) => i !== index))
  }
  const updateAboutStat = (index: number, field: 'number' | 'label', value: string | Record<Locale, string>) => {
    const newStats = [...aboutStats]
    if (field === 'number') {
      newStats[index].number = value as string
    } else {
      newStats[index].label = value as Record<Locale, string>
    }
    setAboutStats(newStats)
  }

  // About Us Milestones handlers
  const addMilestone = () => {
    setAboutMilestones([...aboutMilestones, { year: '', event: emptyLocalized() }])
  }
  const removeMilestone = (index: number) => {
    setAboutMilestones(aboutMilestones.filter((_, i) => i !== index))
  }
  const updateMilestone = (index: number, field: 'year' | 'event', value: string | Record<Locale, string>) => {
    const newMilestones = [...aboutMilestones]
    if (field === 'year') {
      newMilestones[index].year = value as string
    } else {
      newMilestones[index].event = value as Record<Locale, string>
    }
    setAboutMilestones(newMilestones)
  }

  // About Us Values handlers
  const addAboutValue = () => {
    setAboutValues([...aboutValues, { title: emptyLocalized(), description: emptyLocalized(), icon: 'Heart', color: 'from-blue-500 to-blue-600' }])
  }
  const removeAboutValue = (index: number) => {
    setAboutValues(aboutValues.filter((_, i) => i !== index))
  }
  const updateAboutValue = (index: number, field: 'title' | 'description' | 'icon' | 'color', value: string | Record<Locale, string>) => {
    const newValues = [...aboutValues]
    if (field === 'icon' || field === 'color') {
      newValues[index][field] = value as string
    } else {
      newValues[index][field] = value as Record<Locale, string>
    }
    setAboutValues(newValues)
  }

  const tabs = [
    { id: 'contact' as Tab, label: 'Kontakt', icon: Phone },
    { id: 'homepage' as Tab, label: 'Pocetna', icon: Building2 },
    { id: 'services' as Tab, label: 'Usluge', icon: Briefcase },
    { id: 'about' as Tab, label: 'O nama', icon: FileText },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Postavke</h1>
          <p className="text-gray-600 mt-1">Upravljajte postavkama stranice</p>
        </div>
        <Button onClick={save} loading={loading}>
          <Save className="w-4 h-4" />
          {saved ? 'Spremljeno!' : 'Spremi'}
        </Button>
      </div>

      <div className="flex gap-2 border-b overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 -mb-px transition-colors whitespace-nowrap ${
              tab === t.id ? 'border-orangeCTA text-orangeCTA' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {tab === 'contact' && (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <Input label="Naziv klinike" value={contact.clinicName} onChange={e => setContact({ ...contact, clinicName: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Telefon" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />
              <Input label="Email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />
            </div>
            <Input label="Adresa" value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Grad" value={contact.city} onChange={e => setContact({ ...contact, city: e.target.value })} />
              <Input label="Postanski broj" value={contact.postalCode} onChange={e => setContact({ ...contact, postalCode: e.target.value })} />
            </div>
          </div>
        )}

        {tab === 'homepage' && (
          <>
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Hero sekcija</h2>
              <LocalizedInput label="Hero naslov" name="heroTitle" value={heroTitle} onChange={setHeroTitle} type="textarea" rows={2} />
              <LocalizedInput label="Hero podnaslov" name="heroSubtitle" value={heroSubtitle} onChange={setHeroSubtitle} type="textarea" rows={2} />
              <ImageUpload
                label="Hero pozadinska slika"
                value={heroBackgroundImage}
                onChange={setHeroBackgroundImage}
                bucket="images"
                folder="homepage"
                aspectRatio="video"
                hint="Preporucena velicina: 1920x1080"
              />
              <LocalizedInput label="CTA tekst gumba" name="ctaButtonText" value={ctaButtonText} onChange={setCtaButtonText} placeholder="Rezerviraj termin" />
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Statistike</h2>
                <Button type="button" variant="outline" onClick={addStat}>
                  <Plus className="w-4 h-4" /> Dodaj
                </Button>
              </div>
              {stats.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Nema statistika. Kliknite "Dodaj" za dodavanje.</p>
              )}
              {stats.map((stat, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <GripVertical className="w-4 h-4" />
                      <span className="text-sm font-medium">Statistika {index + 1}</span>
                    </div>
                    <button type="button" onClick={() => removeStat(index)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <Input label="Broj/Vrijednost" value={stat.number} onChange={(e) => updateStat(index, 'number', e.target.value)} placeholder="5000+" />
                  <LocalizedInput label="Oznaka" name={`stat-label-${index}`} value={stat.label} onChange={(value) => updateStat(index, 'label', value)} placeholder="Zadovoljnih pacijenata" />
                </div>
              ))}
            </div>

            {/* Process Steps Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Kako funkcionira (koraci)</h2>
                <Button type="button" variant="outline" onClick={addProcessStep}>
                  <Plus className="w-4 h-4" /> Dodaj
                </Button>
              </div>
              {processSteps.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Nema koraka. Kliknite "Dodaj" za dodavanje.</p>
              )}
              {processSteps.map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <GripVertical className="w-4 h-4" />
                      <span className="text-sm font-medium">Korak {index + 1}</span>
                    </div>
                    <button type="button" onClick={() => removeProcessStep(index)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <Input label="Broj koraka" value={step.step} onChange={(e) => updateProcessStep(index, 'step', e.target.value)} placeholder="01" />
                  <LocalizedInput label="Naslov" name={`step-title-${index}`} value={step.title} onChange={(value) => updateProcessStep(index, 'title', value)} placeholder="Rezerviraj online" />
                  <LocalizedInput label="Opis" name={`step-desc-${index}`} value={step.description} onChange={(value) => updateProcessStep(index, 'description', value)} type="textarea" rows={2} placeholder="Odaberi uslugu i termin koji ti odgovara." />
                </div>
              ))}
            </div>

            {/* Gallery Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Galerija</h2>
                <Button type="button" variant="outline" onClick={addGalleryImage}>
                  <Plus className="w-4 h-4" /> Dodaj
                </Button>
              </div>
              {galleryImages.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Nema slika u galeriji. Kliknite "Dodaj" za dodavanje.</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((img, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Slika {index + 1}</span>
                      </div>
                      <button type="button" onClick={() => removeGalleryImage(index)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <ImageUpload label="Slika" value={img.image} onChange={(value) => updateGalleryImage(index, 'image', value)} bucket="images" folder="gallery" aspectRatio="square" />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Velicina</label>
                      <select value={img.span} onChange={(e) => updateGalleryImage(index, 'span', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orangeCTA/50">
                        <option value="col-span-1">Mala (1x1)</option>
                        <option value="col-span-2">Siroka (2x1)</option>
                        <option value="col-span-2 row-span-2">Velika (2x2)</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'services' && (
          <>
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Hero sekcija</h2>
              <LocalizedInput label="Naslov" name="servicesHeroTitle" value={servicesHeroTitle} onChange={setServicesHeroTitle} type="textarea" rows={2} placeholder="Sveobuhvatna\nbriga o zdravlju" />
              <LocalizedInput label="Podnaslov" name="servicesHeroSubtitle" value={servicesHeroSubtitle} onChange={setServicesHeroSubtitle} type="textarea" rows={2} />
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Statistike</h2>
                <Button type="button" variant="outline" onClick={addServicesStat}>
                  <Plus className="w-4 h-4" /> Dodaj
                </Button>
              </div>
              {servicesStats.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Nema statistika. Kliknite "Dodaj" za dodavanje.</p>
              )}
              {servicesStats.map((stat, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <GripVertical className="w-4 h-4" />
                      <span className="text-sm font-medium">Statistika {index + 1}</span>
                    </div>
                    <button type="button" onClick={() => removeServicesStat(index)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <Input label="Broj/Vrijednost" value={stat.number} onChange={(e) => updateServicesStat(index, 'number', e.target.value)} placeholder="8+" />
                  <LocalizedInput label="Oznaka" name={`services-stat-label-${index}`} value={stat.label} onChange={(value) => updateServicesStat(index, 'label', value)} placeholder="Specijaliziranih usluga" />
                </div>
              ))}
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Zasto odabrati nas</h2>
                <Button type="button" variant="outline" onClick={addWhyItem}>
                  <Plus className="w-4 h-4" /> Dodaj
                </Button>
              </div>
              {servicesWhyChooseUs.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Nema stavki. Kliknite "Dodaj" za dodavanje.</p>
              )}
              {servicesWhyChooseUs.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <GripVertical className="w-4 h-4" />
                      <span className="text-sm font-medium">Stavka {index + 1}</span>
                    </div>
                    <button type="button" onClick={() => removeWhyItem(index)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ikona</label>
                    <select value={item.icon} onChange={(e) => updateWhyItem(index, 'icon', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orangeCTA/50">
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <LocalizedInput label="Naslov" name={`why-title-${index}`} value={item.title} onChange={(value) => updateWhyItem(index, 'title', value)} placeholder="Strucni tim" />
                  <LocalizedInput label="Opis" name={`why-desc-${index}`} value={item.description} onChange={(value) => updateWhyItem(index, 'description', value)} type="textarea" rows={2} placeholder="Iskusni lijecnici s godinama specijalizacije..." />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">CTA sekcija</h2>
              <LocalizedInput label="Naslov" name="servicesCtaTitle" value={servicesCtaTitle} onChange={setServicesCtaTitle} placeholder="Spremni za prvi korak?" />
              <LocalizedInput label="Podnaslov" name="servicesCtaSubtitle" value={servicesCtaSubtitle} onChange={setServicesCtaSubtitle} type="textarea" rows={2} placeholder="Zakazite svoj pregled danas..." />
            </div>
          </>
        )}

        {tab === 'about' && (
          <>
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Hero sekcija</h2>
              <LocalizedInput label="Naslov" name="aboutHeroTitle" value={aboutHeroTitle} onChange={setAboutHeroTitle} type="textarea" rows={2} placeholder="Više od\nklinike" />
              <LocalizedInput label="Podnaslov" name="aboutHeroSubtitle" value={aboutHeroSubtitle} onChange={setAboutHeroSubtitle} type="textarea" rows={2} />
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Statistike</h2>
                <Button type="button" variant="outline" onClick={addAboutStat}>
                  <Plus className="w-4 h-4" /> Dodaj
                </Button>
              </div>
              {aboutStats.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Nema statistika. Kliknite "Dodaj" za dodavanje.</p>
              )}
              {aboutStats.map((stat, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <GripVertical className="w-4 h-4" />
                      <span className="text-sm font-medium">Statistika {index + 1}</span>
                    </div>
                    <button type="button" onClick={() => removeAboutStat(index)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <Input label="Broj/Vrijednost" value={stat.number} onChange={(e) => updateAboutStat(index, 'number', e.target.value)} placeholder="10+" />
                  <LocalizedInput label="Oznaka" name={`about-stat-label-${index}`} value={stat.label} onChange={(value) => updateAboutStat(index, 'label', value)} placeholder="Godina iskustva" />
                </div>
              ))}
            </div>

            {/* Our Story Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Naša priča</h2>
              <LocalizedInput label="Naslov sekcije" name="aboutStoryTitle" value={aboutStoryTitle} onChange={setAboutStoryTitle} placeholder="Posvećeni vašem zdravlju od samog početka" />
              <LocalizedInput label="Prvi paragraf" name="aboutStoryParagraph1" value={aboutStoryParagraph1} onChange={setAboutStoryParagraph1} type="textarea" rows={3} />
              <LocalizedInput label="Drugi paragraf" name="aboutStoryParagraph2" value={aboutStoryParagraph2} onChange={setAboutStoryParagraph2} type="textarea" rows={3} />
              <ImageUpload
                label="Slika"
                value={aboutStoryImage}
                onChange={setAboutStoryImage}
                bucket="images"
                folder="about"
                aspectRatio="video"
                hint="Preporučena veličina: 800x600"
              />
            </div>

            {/* Timeline/Milestones Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Vremenski tijek (Timeline)</h2>
                <Button type="button" variant="outline" onClick={addMilestone}>
                  <Plus className="w-4 h-4" /> Dodaj
                </Button>
              </div>
              {aboutMilestones.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Nema događaja. Kliknite "Dodaj" za dodavanje.</p>
              )}
              {aboutMilestones.map((milestone, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <GripVertical className="w-4 h-4" />
                      <span className="text-sm font-medium">Događaj {index + 1}</span>
                    </div>
                    <button type="button" onClick={() => removeMilestone(index)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <Input label="Godina" value={milestone.year} onChange={(e) => updateMilestone(index, 'year', e.target.value)} placeholder="2014" />
                  <LocalizedInput label="Događaj" name={`milestone-event-${index}`} value={milestone.event} onChange={(value) => updateMilestone(index, 'event', value)} placeholder="Osnivanje poliklinike" />
                </div>
              ))}
            </div>

            {/* Values Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Naše vrijednosti</h2>
                <Button type="button" variant="outline" onClick={addAboutValue}>
                  <Plus className="w-4 h-4" /> Dodaj
                </Button>
              </div>
              {aboutValues.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Nema vrijednosti. Kliknite "Dodaj" za dodavanje.</p>
              )}
              {aboutValues.map((value, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <GripVertical className="w-4 h-4" />
                      <span className="text-sm font-medium">Vrijednost {index + 1}</span>
                    </div>
                    <button type="button" onClick={() => removeAboutValue(index)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ikona</label>
                      <select value={value.icon} onChange={(e) => updateAboutValue(index, 'icon', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orangeCTA/50">
                        {ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Boja</label>
                      <select value={value.color} onChange={(e) => updateAboutValue(index, 'color', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orangeCTA/50">
                        {COLOR_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <LocalizedInput label="Naslov" name={`value-title-${index}`} value={value.title} onChange={(v) => updateAboutValue(index, 'title', v)} placeholder="Izvrsnost" />
                  <LocalizedInput label="Opis" name={`value-desc-${index}`} value={value.description} onChange={(v) => updateAboutValue(index, 'description', v)} type="textarea" rows={2} placeholder="Težimo najvišim standardima..." />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">CTA sekcija</h2>
              <LocalizedInput label="Naslov" name="aboutCtaTitle" value={aboutCtaTitle} onChange={setAboutCtaTitle} placeholder="Postanite dio naše priče" />
              <LocalizedInput label="Podnaslov" name="aboutCtaSubtitle" value={aboutCtaSubtitle} onChange={setAboutCtaSubtitle} type="textarea" rows={2} placeholder="Zakažite svoj prvi pregled..." />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
