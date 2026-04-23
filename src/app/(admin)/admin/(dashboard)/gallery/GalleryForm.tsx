'use client'
import { useState } from 'react'
import { GenericForm } from '@/components/admin/GenericForm'
import { Input } from '@/components/admin/ui/Input'
import { Switch } from '@/components/admin/ui/Switch'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { createGalleryItem, updateGalleryItem } from '@/lib/api/admin/gallery'
import type { GalleryImage } from '@/types/database'

export function GalleryForm({ item, isEditing }: { item?: GalleryImage; isEditing?: boolean }) {
  const [imageUrl, setImageUrl] = useState(item?.image_url || '')
  const [caption, setCaption] = useState<Record<string, string>>(item?.caption || { 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [category, setCategory] = useState(item?.category || '')
  const [isFeatured, setIsFeatured] = useState(item?.is_featured || false)
  const [orderIndex, setOrderIndex] = useState(item?.order_index || 0)

  const handleSubmit = async () => {
    if (!imageUrl.trim()) return { error: 'URL slike je obavezan' }
    const data = { image_url: imageUrl, caption, category: category || null, is_featured: isFeatured, order_index: orderIndex }
    return isEditing && item ? updateGalleryItem(item.id, data) : createGalleryItem(data)
  }

  return (
    <GenericForm title={isEditing ? 'Uredi sliku' : 'Nova slika'} subtitle="Upravljajte galerijom" backHref="/admin/gallery" isEditing={isEditing} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <Input label="URL slike" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required placeholder="https://..." />
            {imageUrl && <img src={imageUrl} alt={caption?.['hr-HR'] || 'Image preview'} className="w-full max-h-64 object-cover rounded-lg" />}
            <LocalizedInput label="Opis" name="caption" value={caption} onChange={setCaption} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <Input label="Kategorija" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Npr. Interijer" />
            <Input label="Redoslijed" type="number" value={orderIndex} onChange={(e) => setOrderIndex(Number(e.target.value))} />
            <Switch checked={isFeatured} onChange={setIsFeatured} label="Istaknuto" />
          </div>
        </div>
      </div>
    </GenericForm>
  )
}
