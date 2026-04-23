'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/admin/ui/Input'
import { Button } from '@/components/admin/ui/Button'
import { Switch } from '@/components/admin/ui/Switch'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { createDoctor, updateDoctor } from '@/lib/api/admin/doctors'
import type { Doctor } from '@/types'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'
import Link from 'next/link'

const doctorSchema = z.object({
  slug: z.string().min(1, 'Slug je obavezan').regex(/^[a-z0-9-]+$/, 'Slug može sadržavati samo mala slova, brojeve i crtice'),
  name: z.string().min(1, 'Ime je obavezno'),
  email: z.string().email('Neispravna email adresa').optional().or(z.literal('')),
  phone: z.string().optional(),
  profile_image: z.string().optional(),
  video_preview: z.string().optional(),
  is_featured: z.boolean(),
  order_index: z.number(),
})

type DoctorFormData = z.infer<typeof doctorSchema>

interface DoctorFormProps {
  doctor?: Doctor
  isEditing?: boolean
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[čć]/g, 'c')
    .replace(/[đ]/g, 'd')
    .replace(/[š]/g, 's')
    .replace(/[ž]/g, 'z')
    .replace(/dr\.\s*/gi, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function DoctorForm({ doctor, isEditing }: DoctorFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Localized fields state
  const [title, setTitle] = useState<Record<string, string>>(
    doctor?.title || { 'hr-HR': '', 'en-US': '', 'de-DE': '' }
  )
  const [specialty, setSpecialty] = useState<Record<string, string>>(
    doctor?.specialty || { 'hr-HR': '', 'en-US': '', 'de-DE': '' }
  )
  const [bio, setBio] = useState<Record<string, string>>(
    doctor?.bio || { 'hr-HR': '', 'en-US': '', 'de-DE': '' }
  )

  // Credentials array
  const [credentials, setCredentials] = useState<string[]>(
    (doctor?.credentials as string[]) || []
  )
  const [newCredential, setNewCredential] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      slug: doctor?.slug || '',
      name: doctor?.name || '',
      email: doctor?.email || '',
      phone: doctor?.phone || '',
      profile_image: doctor?.profile_image || '',
      video_preview: doctor?.video_preview || '',
      is_featured: doctor?.is_featured || false,
      order_index: doctor?.order_index || 0,
    },
  })

  const isFeatured = watch('is_featured')
  const watchName = watch('name')

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setValue('name', newName)
    if (!isEditing && newName) {
      setValue('slug', slugify(newName))
    }
  }

  const addCredential = () => {
    if (newCredential.trim()) {
      setCredentials([...credentials, newCredential.trim()])
      setNewCredential('')
    }
  }

  const removeCredential = (index: number) => {
    setCredentials(credentials.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: DoctorFormData) => {
    setLoading(true)
    setError(null)

    const doctorData = {
      ...data,
      title,
      specialty,
      bio,
      credentials,
      email: data.email || null,
    }

    const result = isEditing && doctor
      ? await updateDoctor(doctor.id, doctorData)
      : await createDoctor(doctorData as any)

    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      router.push('/admin/doctors')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/doctors"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Uredi liječnika' : 'Novi liječnik'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing ? 'Uredite podatke o liječniku' : 'Dodajte novog liječnika'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/doctors"
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Odustani
          </Link>
          <Button type="submit" loading={loading}>
            <Save className="w-4 h-4" />
            {isEditing ? 'Spremi promjene' : 'Kreiraj liječnika'}
          </Button>
        </div>
      </div>

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

            <Input
              label="Ime i prezime"
              placeholder="Dr. Ivan Horvat"
              required
              {...register('name')}
              onChange={handleNameChange}
              error={errors.name?.message}
            />

            <LocalizedInput
              label="Titula"
              name="title"
              value={title}
              onChange={setTitle}
              placeholder="Npr. dr. med., spec."
            />

            <LocalizedInput
              label="Specijalizacija"
              name="specialty"
              value={specialty}
              onChange={setSpecialty}
              placeholder="Npr. Interna medicina"
            />

            <LocalizedInput
              label="Biografija"
              name="bio"
              value={bio}
              onChange={setBio}
              type="textarea"
              rows={6}
              placeholder="Kratka biografija liječnika"
            />
          </div>

          {/* Credentials Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Kvalifikacije
            </h2>

            <div className="space-y-3">
              {credentials.map((cred, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="flex-1 text-sm text-gray-700">{cred}</span>
                  <button
                    type="button"
                    onClick={() => removeCredential(index)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  value={newCredential}
                  onChange={(e) => setNewCredential(e.target.value)}
                  placeholder="Nova kvalifikacija..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addCredential()
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addCredential}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Media Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Mediji
            </h2>

            <Input
              label="URL profilne slike"
              placeholder="https://..."
              hint="URL profilne fotografije liječnika"
              {...register('profile_image')}
              error={errors.profile_image?.message}
            />

            <Input
              label="URL video pregleda"
              placeholder="https://..."
              hint="URL videa za modal pregled"
              {...register('video_preview')}
              error={errors.video_preview?.message}
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
              label="Istaknuti liječnik"
            />
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Detalji
            </h2>

            <Input
              label="Slug"
              placeholder="ivan-horvat"
              hint="URL-prijateljski naziv (auto-generiran)"
              required
              {...register('slug')}
              error={errors.slug?.message}
            />

            <Input
              label="Email"
              type="email"
              placeholder="dr.horvat@atria.hr"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Telefon"
              placeholder="+385 1 234 5678"
              {...register('phone')}
              error={errors.phone?.message}
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
