'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { Input } from './Input'
import { Textarea } from './Textarea'
import type { Locale } from '@/types'

const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'hr-HR', label: 'Hrvatski', flag: '🇭🇷' },
  { code: 'en-US', label: 'English', flag: '🇺🇸' },
  { code: 'de-DE', label: 'Deutsch', flag: '🇩🇪' },
]

interface LocalizedInputProps {
  label: string
  name: string
  value: Record<string, string>
  onChange: (value: Record<string, string>) => void
  type?: 'input' | 'textarea'
  required?: boolean
  error?: string
  placeholder?: string
  rows?: number
}

export function LocalizedInput({
  label,
  name,
  value,
  onChange,
  type = 'input',
  required,
  error,
  placeholder,
  rows = 4,
}: LocalizedInputProps) {
  const [activeLocale, setActiveLocale] = useState<Locale>('hr-HR')

  const handleChange = (locale: Locale, newValue: string) => {
    onChange({
      ...value,
      [locale]: newValue,
    })
  }

  const InputComponent = type === 'textarea' ? Textarea : Input

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex gap-1">
          {LOCALES.map((locale) => (
            <button
              key={locale.code}
              type="button"
              onClick={() => setActiveLocale(locale.code)}
              className={cn(
                'px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1',
                activeLocale === locale.code
                  ? 'bg-brand-color text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              <span>{locale.flag}</span>
              <span className="hidden sm:inline">{locale.code.split('-')[0].toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {LOCALES.map((locale) => (
          <div
            key={locale.code}
            className={cn(
              activeLocale === locale.code ? 'block' : 'hidden'
            )}
          >
            <InputComponent
              name={`${name}.${locale.code}`}
              value={value[locale.code] || ''}
              onChange={(e) => handleChange(locale.code, e.target.value)}
              placeholder={placeholder}
              rows={type === 'textarea' ? rows : undefined}
            />
          </div>
        ))}
      </div>

      {/* Show indicator if other locales are empty */}
      <div className="flex gap-2">
        {LOCALES.map((locale) => (
          <span
            key={locale.code}
            className={cn(
              'text-xs',
              value[locale.code]?.trim()
                ? 'text-green-600'
                : 'text-gray-400'
            )}
          >
            {locale.flag} {value[locale.code]?.trim() ? '✓' : '—'}
          </span>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
