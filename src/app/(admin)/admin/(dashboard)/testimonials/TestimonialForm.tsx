'use client'
import { useState } from 'react'
import { GenericForm } from '@/components/admin/GenericForm'
import { Input } from '@/components/admin/ui/Input'
import { Select } from '@/components/admin/ui/Select'
import { Switch } from '@/components/admin/ui/Switch'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { createTestimonial, updateTestimonial } from '@/lib/api/admin/testimonials'
import type { Testimonial } from '@/types/database'

export function TestimonialForm({ item, isEditing }: { item?: Testimonial; isEditing?: boolean }) {
  const [authorName, setAuthorName] = useState(item?.author_name || '')
  const [content, setContent] = useState<Record<string, string>>(item?.content || { 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [rating, setRating] = useState(item?.rating || 5)
  const [isApproved, setIsApproved] = useState(item?.is_approved || false)
  const [isFeatured, setIsFeatured] = useState(item?.is_featured || false)

  const handleSubmit = async () => {
    if (!authorName.trim()) return { error: 'Ime autora je obavezno' }
    const data = { author_name: authorName, content, rating, is_approved: isApproved, is_featured: isFeatured }
    return isEditing && item ? updateTestimonial(item.id, data) : createTestimonial(data)
  }

  return (
    <GenericForm title={isEditing ? 'Uredi svjedočanstvo' : 'Novo svjedočanstvo'} subtitle="Upravljajte recenzijom" backHref="/admin/testimonials" isEditing={isEditing} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <Input label="Ime autora" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
            <LocalizedInput label="Sadržaj" name="content" value={content} onChange={setContent} type="textarea" rows={4} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <Select label="Ocjena" value={String(rating)} onChange={(e) => setRating(Number(e.target.value))} options={[1,2,3,4,5].map(n => ({ value: String(n), label: `${n} zvjezdica` }))} />
            <Switch checked={isApproved} onChange={setIsApproved} label="Odobreno" />
            <Switch checked={isFeatured} onChange={setIsFeatured} label="Istaknuto" />
          </div>
        </div>
      </div>
    </GenericForm>
  )
}
