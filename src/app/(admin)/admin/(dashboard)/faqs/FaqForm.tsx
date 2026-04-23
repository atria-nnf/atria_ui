'use client'
import { useState } from 'react'
import { GenericForm } from '@/components/admin/GenericForm'
import { Input } from '@/components/admin/ui/Input'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { createFaq, updateFaq } from '@/lib/api/admin/faqs'
import type { FAQ } from '@/types/database'

export function FaqForm({ item, isEditing }: { item?: FAQ; isEditing?: boolean }) {
  const [question, setQuestion] = useState<Record<string, string>>(item?.question || { 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [answer, setAnswer] = useState<Record<string, string>>(item?.answer || { 'hr-HR': '', 'en-US': '', 'de-DE': '' })
  const [category, setCategory] = useState(item?.category || '')
  const [orderIndex, setOrderIndex] = useState(item?.order_index || 0)

  const handleSubmit = async () => {
    if (!question['hr-HR']?.trim()) return { error: 'Pitanje je obavezno' }
    const data = { question, answer, category: category || null, order_index: orderIndex }
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
            <Input label="Kategorija" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Npr. Opće" />
            <Input label="Redoslijed" type="number" value={orderIndex} onChange={(e) => setOrderIndex(Number(e.target.value))} />
          </div>
        </div>
      </div>
    </GenericForm>
  )
}
