'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { RichTextEditor } from './RichTextEditor'
import type { Locale } from '@/types'

const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'hr-HR', label: 'Hrvatski', flag: '🇭🇷' },
  { code: 'en-US', label: 'English', flag: '🇺🇸' },
  { code: 'de-DE', label: 'Deutsch', flag: '🇩🇪' },
]

interface LocalizedRichTextProps {
  label: string
  name: string
  value: Record<string, string>
  onChange: (value: Record<string, string>) => void
  required?: boolean
  error?: string
  placeholder?: string
  minHeight?: string
}

export function LocalizedRichText({
  label,
  name,
  value,
  onChange,
  required,
  error,
  placeholder,
  minHeight = '150px',
}: LocalizedRichTextProps) {
  const [activeLocale, setActiveLocale] = useState<Locale>('hr-HR')

  const handleChange = (locale: Locale, newValue: string) => {
    onChange({
      ...value,
      [locale]: newValue,
    })
  }

  // Check if content has actual text (strip HTML tags)
  const hasContent = (html: string) => {
    const text = html?.replace(/<[^>]*>/g, '').trim()
    return text && text.length > 0
  }

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
            <RichTextEditor
              value={value[locale.code] || ''}
              onChange={(newValue) => handleChange(locale.code, newValue)}
              placeholder={placeholder}
              minHeight={minHeight}
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
              hasContent(value[locale.code])
                ? 'text-green-600'
                : 'text-gray-400'
            )}
          >
            {locale.flag} {hasContent(value[locale.code]) ? '✓' : '—'}
          </span>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
