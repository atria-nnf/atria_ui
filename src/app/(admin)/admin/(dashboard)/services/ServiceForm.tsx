'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/admin/ui/Input'
import { MultiSelect } from '@/components/admin/ui/MultiSelect'
import { Button } from '@/components/admin/ui/Button'
import { Switch } from '@/components/admin/ui/Switch'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { ImageUpload } from '@/components/admin/ui/ImageUpload'
import { createService, updateService } from '@/lib/api/admin/services'
import type { Service } from '@/types'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'
import Link from 'next/link'

const serviceSchema = z.object({
  slug: z.string().min(1, 'Slug je obavezan').regex(/^[a-z0-9-]+$/, 'Slug može sadržavati samo mala slova, brojeve i crtice'),
  categories: z.array(z.string()).optional(),
  duration: z.string().optional(),
  icon: z.string().optional(),
  featured_image: z.string().optional(),
  is_featured: z.boolean(),
  order_index: z.number(),
})

type ServiceFormData = z.infer<typeof serviceSchema>

interface ServiceFormProps {
  service?: Service
  isEditing?: boolean
}

const categoryOptions = [
  { value: 'specialist', label: 'Specijalistički pregledi' },
  { value: 'diagnostics', label: 'Dijagnostika' },
  { value: 'preventive', label: 'Preventiva' },
  { value: 'aesthetic', label: 'Estetika' },
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[čć]/g, 'c')
    .replace(/[đ]/g, 'd')
    .replace(/[š]/g, 's')
    .replace(/[ž]/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function ServiceForm({ service, isEditing }: ServiceFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Localized fields state
  const [name, setName] = useState<Record<string, string>>(
    service?.name || { 'hr-HR': '', 'en-US': '', 'de-DE': '' }
  )
  const [shortDescription, setShortDescription] = useState<Record<string, string>>(
    service?.short_description || { 'hr-HR': '', 'en-US': '', 'de-DE': '' }
  )
  const [description, setDescription] = useState<Record<string, string>>(
    service?.description || { 'hr-HR': '', 'en-US': '', 'de-DE': '' }
  )

  // Featured image state
  const [featuredImage, setFeaturedImage] = useState(service?.featured_image || '')

  // Categories state (multi-select)
  const [categories, setCategories] = useState<string[]>(
    service?.categories || (service?.category ? [service.category] : [])
  )

  // Partner logos state
  const [partnerLogos, setPartnerLogos] = useState<{ url: string; name: string }[]>(
    (service?.partner_logos as { url: string; name: string }[]) || []
  )
  const [newLogoUrl, setNewLogoUrl] = useState('')
  const [newLogoName, setNewLogoName] = useState('')

  const addPartnerLogo = () => {
    if (newLogoUrl.trim()) {
      setPartnerLogos([...partnerLogos, { url: newLogoUrl.trim(), name: newLogoName.trim() }])
      setNewLogoUrl('')
      setNewLogoName('')
    }
  }

  const removePartnerLogo = (index: number) => {
    setPartnerLogos(partnerLogos.filter((_, i) => i !== index))
  }

  // Steps state
  type Step = { title: Record<string, string>; description: Record<string, string> }
  const defaultSteps: Step[] = [
    {
      title: { 'hr-HR': 'Priprema', 'en-US': 'Preparation', 'de-DE': 'Vorbereitung' },
      description: { 'hr-HR': '', 'en-US': '', 'de-DE': '' },
    },
  ]
  const [steps, setSteps] = useState<Step[]>(
    (service?.steps as Step[]) || []
  )

  // Pricing list state
  type PricingItem = {
    title: Record<string, string>
    description: Record<string, string>
    price: number
  }
  const [pricingList, setPricingList] = useState<PricingItem[]>(
    (service?.pricing as { items?: PricingItem[] })?.items || []
  )

  const addStep = () => {
    setSteps([
      ...steps,
      { title: { 'hr-HR': '', 'en-US': '', 'de-DE': '' }, description: { 'hr-HR': '', 'en-US': '', 'de-DE': '' } },
    ])
  }

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index))
  }

  const updateStepTitle = (index: number, locale: string, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = {
      ...newSteps[index],
      title: { ...newSteps[index].title, [locale]: value },
    }
    setSteps(newSteps)
  }

  const updateStepDescription = (index: number, locale: string, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = {
      ...newSteps[index],
      description: { ...newSteps[index].description, [locale]: value },
    }
    setSteps(newSteps)
  }

  // Pricing list handlers
  const addPricingItem = () => {
    setPricingList([
      ...pricingList,
      { title: { 'hr-HR': '', 'en-US': '', 'de-DE': '' }, description: { 'hr-HR': '', 'en-US': '', 'de-DE': '' }, price: 0 },
    ])
  }

  const removePricingItem = (index: number) => {
    setPricingList(pricingList.filter((_, i) => i !== index))
  }

  const updatePricingTitle = (index: number, locale: string, value: string) => {
    const newList = [...pricingList]
    newList[index] = {
      ...newList[index],
      title: { ...newList[index].title, [locale]: value },
    }
    setPricingList(newList)
  }

  const updatePricingDescription = (index: number, locale: string, value: string) => {
    const newList = [...pricingList]
    newList[index] = {
      ...newList[index],
      description: { ...newList[index].description, [locale]: value },
    }
    setPricingList(newList)
  }

  const updatePricingPrice = (index: number, value: number) => {
    const newList = [...pricingList]
    newList[index] = {
      ...newList[index],
      price: value,
    }
    setPricingList(newList)
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      slug: service?.slug || '',
      categories: service?.categories || (service?.category ? [service.category] : []),
      duration: service?.duration || '',
      icon: service?.icon || '',
      featured_image: service?.featured_image || '',
      is_featured: service?.is_featured || false,
      order_index: service?.order_index || 0,
    },
  })

  const isFeatured = watch('is_featured')

  // Auto-generate slug from Croatian name
  const handleNameChange = (newName: Record<string, string>) => {
    setName(newName)
    if (!isEditing && newName['hr-HR']) {
      setValue('slug', slugify(newName['hr-HR']))
    }
  }

  const onSubmit = async (data: ServiceFormData) => {
    // Validate that at least Croatian name is filled
    if (!name['hr-HR']?.trim()) {
      setError('Naziv na hrvatskom jeziku je obavezan')
      return
    }

    setLoading(true)
    setError(null)

    const serviceData = {
      ...data,
      name,
      short_description: shortDescription,
      description,
      categories: categories.length > 0 ? categories : null,
      featured_image: featuredImage || null,
      partner_logos: partnerLogos.length > 0 ? partnerLogos : null,
      steps: steps.length > 0 ? steps : null,
      pricing: pricingList.length > 0 ? { items: pricingList } : null,
    }

    const result = isEditing && service
      ? await updateService(service.id, serviceData)
      : await createService(serviceData as any)

    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      router.push('/admin/services')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/services"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Uredi uslugu' : 'Nova usluga'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing ? 'Uredite podatke o usluzi' : 'Dodajte novu uslugu'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services"
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Odustani
          </Link>
          <Button type="submit" loading={loading}>
            <Save className="w-4 h-4" />
            {isEditing ? 'Spremi promjene' : 'Kreiraj uslugu'}
          </Button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Osnovni podaci
            </h2>

            <LocalizedInput
              label="Naziv usluge"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
              placeholder="Npr. Opći pregled"
            />

            <LocalizedInput
              label="Kratki opis"
              name="short_description"
              value={shortDescription}
              onChange={setShortDescription}
              type="textarea"
              rows={2}
              placeholder="Kratki opis usluge (za kartice)"
            />

            <LocalizedInput
              label="Puni opis"
              name="description"
              value={description}
              onChange={setDescription}
              type="textarea"
              rows={6}
              placeholder="Detaljan opis usluge (podržava Markdown)"
            />
          </div>

          {/* Media Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Mediji
            </h2>

            <ImageUpload
              label="Slika usluge"
              value={featuredImage}
              onChange={setFeaturedImage}
              bucket="images"
              folder="services"
              hint="Glavna slika usluge"
            />

            <Input
              label="Ikona"
              placeholder="Npr. stethoscope"
              hint="Naziv Lucide ikone"
              {...register('icon')}
              error={errors.icon?.message}
            />
          </div>

          {/* Partner Logos Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Partneri
            </h2>

            {/* Existing logos */}
            {partnerLogos.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {partnerLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="relative group bg-gray-50 rounded-lg p-4 flex flex-col items-center"
                  >
                    <img
                      src={logo.url.startsWith('http') ? logo.url : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${logo.url}`}
                      alt={logo.name || 'Partner logo'}
                      className="h-12 w-auto object-contain mb-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>'
                      }}
                    />
                    <p className="text-xs text-gray-600 text-center truncate w-full">
                      {logo.name || 'Bez naziva'}
                    </p>
                    <button
                      type="button"
                      onClick={() => removePartnerLogo(index)}
                      className="absolute top-1 right-1 p-1 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new logo */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 pt-3">Dodaj partnera</p>
              <ImageUpload
                value={newLogoUrl}
                onChange={setNewLogoUrl}
                bucket="images"
                folder="partners"
                aspectRatio="auto"
              />
              <Input
                label="Naziv partnera"
                value={newLogoName}
                onChange={(e) => setNewLogoName(e.target.value)}
                placeholder="Npr. Philips"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addPartnerLogo}
                disabled={!newLogoUrl.trim()}
                className="w-full"
              >
                <Plus className="w-4 h-4" />
                Dodaj partnera
              </Button>
            </div>
          </div>

          {/* Steps Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Koraci pregleda
              </h2>
              <Button type="button" variant="outline" size="sm" onClick={addStep}>
                <Plus className="w-4 h-4" />
                Dodaj korak
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Definirajte korake koji opisuju kako izgleda pregled. Ako ne definirate korake, koristit će se zadani.
            </p>

            {steps.length > 0 ? (
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="relative border border-gray-200 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-700">Korak {index + 1}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Naslov</label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">HR</span>
                          <input
                            type="text"
                            value={step.title['hr-HR'] || ''}
                            onChange={(e) => updateStepTitle(index, 'hr-HR', e.target.value)}
                            placeholder="Naslov (HR)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">EN</span>
                          <input
                            type="text"
                            value={step.title['en-US'] || ''}
                            onChange={(e) => updateStepTitle(index, 'en-US', e.target.value)}
                            placeholder="Title (EN)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">DE</span>
                          <input
                            type="text"
                            value={step.title['de-DE'] || ''}
                            onChange={(e) => updateStepTitle(index, 'de-DE', e.target.value)}
                            placeholder="Titel (DE)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Opis</label>
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">HR</span>
                          <textarea
                            value={step.description['hr-HR'] || ''}
                            onChange={(e) => updateStepDescription(index, 'hr-HR', e.target.value)}
                            placeholder="Opis koraka (HR)"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">EN</span>
                          <textarea
                            value={step.description['en-US'] || ''}
                            onChange={(e) => updateStepDescription(index, 'en-US', e.target.value)}
                            placeholder="Step description (EN)"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">DE</span>
                          <textarea
                            value={step.description['de-DE'] || ''}
                            onChange={(e) => updateStepDescription(index, 'de-DE', e.target.value)}
                            placeholder="Schrittbeschreibung (DE)"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">Nema definiranih koraka</p>
                <p className="text-xs text-gray-400 mt-1">Koristit će se zadani koraci</p>
              </div>
            )}
          </div>

          {/* Pricing List Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Cjenik usluga
              </h2>
              <Button type="button" variant="outline" size="sm" onClick={addPricingItem}>
                <Plus className="w-4 h-4" />
                Dodaj stavku
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Dodajte stavke cjenika za ovu uslugu. Svaka stavka ima naziv, kratki opis i cijenu u eurima.
            </p>

            {pricingList.length > 0 ? (
              <div className="space-y-6">
                {pricingList.map((item, index) => (
                  <div key={index} className="relative border border-gray-200 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orangeCTA rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          €
                        </div>
                        <span className="font-medium text-gray-700">Stavka {index + 1}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePricingItem(index)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Cijena (EUR)</label>
                      <input
                        type="number"
                        value={item.price || ''}
                        onChange={(e) => updatePricingPrice(index, parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Naziv</label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">HR</span>
                          <input
                            type="text"
                            value={item.title['hr-HR'] || ''}
                            onChange={(e) => updatePricingTitle(index, 'hr-HR', e.target.value)}
                            placeholder="Naziv (HR)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">EN</span>
                          <input
                            type="text"
                            value={item.title['en-US'] || ''}
                            onChange={(e) => updatePricingTitle(index, 'en-US', e.target.value)}
                            placeholder="Title (EN)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">DE</span>
                          <input
                            type="text"
                            value={item.title['de-DE'] || ''}
                            onChange={(e) => updatePricingTitle(index, 'de-DE', e.target.value)}
                            placeholder="Titel (DE)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Kratki opis</label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">HR</span>
                          <input
                            type="text"
                            value={item.description['hr-HR'] || ''}
                            onChange={(e) => updatePricingDescription(index, 'hr-HR', e.target.value)}
                            placeholder="Opis (HR)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">EN</span>
                          <input
                            type="text"
                            value={item.description['en-US'] || ''}
                            onChange={(e) => updatePricingDescription(index, 'en-US', e.target.value)}
                            placeholder="Description (EN)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 mb-1 block">DE</span>
                          <input
                            type="text"
                            value={item.description['de-DE'] || ''}
                            onChange={(e) => updatePricingDescription(index, 'de-DE', e.target.value)}
                            placeholder="Beschreibung (DE)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">Nema stavki u cjeniku</p>
                <p className="text-xs text-gray-400 mt-1">Kliknite "Dodaj stavku" za dodavanje</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Status
            </h2>

            <Switch
              checked={isFeatured}
              onChange={(checked) => setValue('is_featured', checked)}
              label="Istaknuta usluga"
            />
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Detalji
            </h2>

            <Input
              label="Slug"
              placeholder="opci-pregled"
              hint="URL-prijateljski naziv (auto-generiran)"
              required
              {...register('slug')}
              error={errors.slug?.message}
            />

            <MultiSelect
              label="Kategorije"
              options={categoryOptions}
              placeholder="Odaberi kategorije"
              value={categories}
              onChange={setCategories}
            />

            <Input
              label="Trajanje"
              placeholder="Npr. 30 min"
              {...register('duration')}
              error={errors.duration?.message}
            />

            <Input
              label="Redoslijed"
              type="number"
              {...register('order_index', { valueAsNumber: true })}
              error={errors.order_index?.message}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
