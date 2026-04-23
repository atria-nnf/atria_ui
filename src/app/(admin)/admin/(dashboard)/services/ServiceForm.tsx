'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/admin/ui/Input'
import { Select } from '@/components/admin/ui/Select'
import { Button } from '@/components/admin/ui/Button'
import { Switch } from '@/components/admin/ui/Switch'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { createService, updateService } from '@/lib/api/admin/services'
import type { Service } from '@/types'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

const serviceSchema = z.object({
  slug: z.string().min(1, 'Slug je obavezan').regex(/^[a-z0-9-]+$/, 'Slug može sadržavati samo mala slova, brojeve i crtice'),
  category: z.string().optional(),
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
      category: service?.category || '',
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

            <Input
              label="URL slike"
              placeholder="https://..."
              hint="URL glavne slike usluge"
              {...register('featured_image')}
              error={errors.featured_image?.message}
            />

            <Input
              label="Ikona"
              placeholder="Npr. stethoscope"
              hint="Naziv Lucide ikone"
              {...register('icon')}
              error={errors.icon?.message}
            />
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

            <Select
              label="Kategorija"
              options={categoryOptions}
              placeholder="Odaberi kategoriju"
              {...register('category')}
              error={errors.category?.message}
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
