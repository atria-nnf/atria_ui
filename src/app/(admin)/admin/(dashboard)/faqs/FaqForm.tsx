'use client'
import { useState, useEffect } from 'react'
import { GenericForm } from '@/components/admin/GenericForm'
import { Input } from '@/components/admin/ui/Input'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { createFaq, updateFaq } from '@/lib/api/admin/faqs'
import { createClient } from '@/lib/supabase/client'
import { getLocalizedContent } from '@/lib/utils/locale'
import type { FAQ, Service } from '@/types/database'

export function FaqForm({ item, isEditing }: { item?: FAQ; isEditing?: boolean }) {
  const [question, setQuestion] = useState<Record<string, string>>(item?.question || { 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [answer, setAnswer] = useState<Record<string, string>>(item?.answer || { 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [category, setCategory] = useState(item?.category || '')
  const [orderIndex, setOrderIndex] = useState(item?.order_index || 0)
  const [serviceId, setServiceId] = useState<string | null>(item?.service_id || null)
  const [services, setServices] = useState<Service[]>([])

  // Fetch services for the dropdown
  useEffect(() => {
    async function fetchServices() {
      const supabase = createClient()
      const { data } = await supabase
        .from('services')
        .select('*')
        .order('name->hr-HR', { ascending: true })
      if (data) setServices(data as Service[])
    }
    fetchServices()
  }, [])

  const handleSubmit = async () => {
    if (!question['hr-HR']?.trim()) return { error: 'Pitanje je obavezno' }
    const data = { question, answer, category: category || null, order_index: orderIndex, service_id: serviceId }
    return isEditing && item ? updateFaq(item.id, data) : createFaq(data)
  }

  return (
    <GenericForm title={isEditing ? 'Uredi pitanje' : 'Novo pitanje'} subtitle="Upravljajte FAQ" backHref="/admin/faqs" isEditing={isEditing} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <LocalizedInput label="Pitanje" name="question" value={question} onChange={setQuestion} required />
            <LocalizedInput label="Odgovor" name="answer" value={answer} onChange={setAnswer} type="textarea" rows={5} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usluga</label>
              <select
                value={serviceId || ''}
                onChange={(e) => setServiceId(e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orangeCTA/50 focus:border-orangeCTA"
              >
                <option value="">Opce (sve stranice)</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {getLocalizedContent(service.name, 'hr-HR')}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Ostavite prazno za prikaz na kontakt stranici</p>
            </div>
            <Input label="Kategorija" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Npr. Opce" />
            <Input label="Redoslijed" type="number" value={orderIndex} onChange={(e) => setOrderIndex(Number(e.target.value))} />
          </div>
        </div>
      </div>
    </GenericForm>
  )
}
