'use client'
import { useState, useEffect } from 'react'
import { getSetting, updateSetting } from '@/lib/api/admin/settings'
import { Input } from '@/components/admin/ui/Input'
import { Button } from '@/components/admin/ui/Button'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { Save, Building2, Phone, MapPin, FileText } from 'lucide-react'

type Tab = 'contact' | 'homepage' | 'about' | 'legal'

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('contact')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  // Contact Info
  const [contact, setContact] = useState({ clinicName: '', phone: '', email: '', address: '', city: '', postalCode: '' })

  // Homepage
  const [heroTitle, setHeroTitle] = useState<Record<string, string>>({ 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [heroSubtitle, setHeroSubtitle] = useState<Record<string, string>>({ 'hr-HR': '', 'en-US': '', 'de-DE': '' })

  // About
  const [aboutTitle, setAboutTitle] = useState<Record<string, string>>({ 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [aboutContent, setAboutContent] = useState<Record<string, string>>({ 'hr-HR': '', 'en-US': '', 'de-DE': '' })

  useEffect(() => {
    const load = async () => {
      const [contactData, homepageData, aboutData] = await Promise.all([
        getSetting('contact_info'),
        getSetting('homepage'),
        getSetting('about_us')
      ])
      if (contactData) setContact(contactData)
      if (homepageData) { setHeroTitle(homepageData.heroTitle || {}); setHeroSubtitle(homepageData.heroSubtitle || {}) }
      if (aboutData) { setAboutTitle(aboutData.title || {}); setAboutContent(aboutData.content || {}) }
    }
    load()
  }, [])

  const save = async () => {
    setLoading(true)
    setSaved(false)
    if (tab === 'contact') await updateSetting('contact_info', contact)
    if (tab === 'homepage') await updateSetting('homepage', { heroTitle, heroSubtitle })
    if (tab === 'about') await updateSetting('about_us', { title: aboutTitle, content: aboutContent })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'contact' as Tab, label: 'Kontakt', icon: Phone },
    { id: 'homepage' as Tab, label: 'Početna', icon: Building2 },
    { id: 'about' as Tab, label: 'O nama', icon: FileText },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Postavke</h1><p className="text-gray-600 mt-1">Upravljajte postavkama stranice</p></div>
        <Button onClick={save} loading={loading}><Save className="w-4 h-4" />{saved ? 'Spremljeno!' : 'Spremi'}</Button>
      </div>

      <div className="flex gap-2 border-b">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2 border-b-2 -mb-px transition-colors ${tab === t.id ? 'border-brand-color text-brand-color' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {tab === 'contact' && (
          <>
            <Input label="Naziv klinike" value={contact.clinicName} onChange={e => setContact({ ...contact, clinicName: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Telefon" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />
              <Input label="Email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />
            </div>
            <Input label="Adresa" value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Grad" value={contact.city} onChange={e => setContact({ ...contact, city: e.target.value })} />
              <Input label="Poštanski broj" value={contact.postalCode} onChange={e => setContact({ ...contact, postalCode: e.target.value })} />
            </div>
          </>
        )}
        {tab === 'homepage' && (
          <>
            <LocalizedInput label="Hero naslov" name="heroTitle" value={heroTitle} onChange={setHeroTitle} />
            <LocalizedInput label="Hero podnaslov" name="heroSubtitle" value={heroSubtitle} onChange={setHeroSubtitle} type="textarea" rows={3} />
          </>
        )}
        {tab === 'about' && (
          <>
            <LocalizedInput label="Naslov" name="aboutTitle" value={aboutTitle} onChange={setAboutTitle} />
            <LocalizedInput label="Sadržaj" name="aboutContent" value={aboutContent} onChange={setAboutContent} type="textarea" rows={10} />
          </>
        )}
      </div>
    </div>
  )
}
