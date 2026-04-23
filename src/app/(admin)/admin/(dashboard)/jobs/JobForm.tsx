'use client'
import { useState } from 'react'
import { GenericForm } from '@/components/admin/GenericForm'
import { Input } from '@/components/admin/ui/Input'
import { Select } from '@/components/admin/ui/Select'
import { Switch } from '@/components/admin/ui/Switch'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { createJob, updateJob } from '@/lib/api/admin/jobs'
import type { JobPosting } from '@/types/database'

const slugify = (t: string) => t.toLowerCase().replace(/[čć]/g,'c').replace(/đ/g,'d').replace(/š/g,'s').replace(/ž/g,'z').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')

export function JobForm({ item, isEditing }: { item?: JobPosting; isEditing?: boolean }) {
  const [slug, setSlug] = useState(item?.slug || '')
  const [title, setTitle] = useState<Record<string, string>>(item?.title || { 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [description, setDescription] = useState<Record<string, string>>(item?.description || { 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [location, setLocation] = useState<Record<string, string>>(item?.location || { 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [department, setDepartment] = useState(item?.department || '')
  const [employmentType, setEmploymentType] = useState(item?.employment_type || '')
  const [isActive, setIsActive] = useState(item?.is_active ?? true)

  const handleTitleChange = (v: Record<string, string>) => { setTitle(v); if (!isEditing && v['hr-HR']) setSlug(slugify(v['hr-HR'])) }

  const handleSubmit = async () => {
    if (!title['hr-HR']?.trim()) return { error: 'Naziv pozicije je obavezan' }
    const data = { slug, title, description, location, department: department || null, employment_type: employmentType || null, is_active: isActive }
    return isEditing && item ? updateJob(item.id, data) : createJob(data)
  }

  return (
    <GenericForm title={isEditing ? 'Uredi oglas' : 'Novi oglas'} subtitle="Upravljajte oglasima za posao" backHref="/admin/jobs" isEditing={isEditing} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <LocalizedInput label="Naziv pozicije" name="title" value={title} onChange={handleTitleChange} required />
            <LocalizedInput label="Lokacija" name="location" value={location} onChange={setLocation} />
            <LocalizedInput label="Opis" name="description" value={description} onChange={setDescription} type="textarea" rows={8} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <Switch checked={isActive} onChange={setIsActive} label="Aktivan oglas" />
            <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
            <Input label="Odjel" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Npr. Medicina" />
            <Select label="Vrsta zaposlenja" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} placeholder="Odaberi" options={[
              { value: 'full-time', label: 'Puno radno vrijeme' },
              { value: 'part-time', label: 'Nepuno radno vrijeme' },
              { value: 'contract', label: 'Ugovor' },
            ]} />
          </div>
        </div>
      </div>
    </GenericForm>
  )
}
