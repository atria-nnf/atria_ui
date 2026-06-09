'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/admin/ui/Input'
import { Button } from '@/components/admin/ui/Button'
import { Switch } from '@/components/admin/ui/Switch'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { ImageUpload } from '@/components/admin/ui/ImageUpload'
import { createDoctor, updateDoctor, getDoctorServices, updateDoctorServices } from '@/lib/api/admin/doctors'
import { createClient } from '@/lib/supabase/client'
import { getLocalizedContent } from '@/lib/utils/locale'
import type { Doctor, Service } from '@/types'
import { ArrowLeft, Save, Plus, X, Check } from 'lucide-react'
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

  // Services state
  const [services, setServices] = useState<Service[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  // Profile image state
  const [profileImage, setProfileImage] = useState(doctor?.profile_image || '')

  // Fetch services and current doctor's services
  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const { data } = await supabase
        .from('services')
        .select('*')
        .order('name->hr-HR', { ascending: true })
      if (data) {
        setServices(data as Service[])
      }

      // Fetch current doctor's services if editing
      if (isEditing && doctor?.id) {
        const doctorServices = await getDoctorServices(doctor.id)
        setSelectedServices(doctorServices)
      }
    }
    fetchData()
  }, [isEditing, doctor?.id])

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    )
  }

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
      profile_image: profileImage || null,
    }

    const result = isEditing && doctor
      ? await updateDoctor(doctor.id, doctorData)
      : await createDoctor(doctorData as any)

    if (result.error) {
      setLoading(false)
      setError(result.error)
      return
    }

    // Save service relationships
    const doctorId = result.data?.id || doctor?.id
    if (doctorId) {
      const servicesResult = await updateDoctorServices(doctorId, selectedServices)
      if (servicesResult.error) {
        setLoading(false)
        setError(servicesResult.error)
        return
      }
    }

    setLoading(false)
    router.push('/admin/doctors')
    router.refresh()
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

            <ImageUpload
              label="Profilna slika"
              value={profileImage}
              onChange={setProfileImage}
              bucket="images"
              folder="doctors"
              aspectRatio="square"
              hint="Profilna fotografija liječnika"
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
          {/* Services Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Usluge
            </h2>
            <p className="text-sm text-gray-500">Odaberite usluge koje ovaj liječnik pruža</p>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                    selectedServices.includes(service.id)
                      ? 'bg-orange-50 border-2 border-orangeCTA'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                      selectedServices.includes(service.id)
                        ? 'bg-orangeCTA text-white'
                        : 'bg-white border-2 border-gray-300'
                    }`}
                  >
                    {selectedServices.includes(service.id) && <Check className="w-3 h-3" />}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {getLocalizedContent(service.name, 'hr-HR')}
                  </span>
                </button>
              ))}
              {services.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">Nema dostupnih usluga</p>
              )}
            </div>
          </div>

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
