'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import { ChevronDown, Check, X } from 'lucide-react'

export interface MultiSelectProps {
  label?: string
  error?: string
  hint?: string
  options: { value: string; label: string }[]
  placeholder?: string
  value: string[]
  onChange: (value: string[]) => void
  required?: boolean
  className?: string
}

export function MultiSelect({
  label,
  error,
  hint,
  options,
  placeholder = 'Odaberi...',
  value,
  onChange,
  required,
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(value.filter((v) => v !== optionValue))
  }

  const selectedLabels = value
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean)

  return (
    <div className="space-y-1.5" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full px-3 py-2 border rounded-lg transition-colors bg-white text-left',
            'focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent',
            error ? 'border-red-300 bg-red-50' : 'border-gray-300',
            className
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 flex flex-wrap gap-1 min-h-[20px]">
              {value.length === 0 ? (
                <span className="text-gray-500">{placeholder}</span>
              ) : (
                value.map((v) => {
                  const option = options.find((o) => o.value === v)
                  return (
                    <span
                      key={v}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-sm"
                    >
                      {option?.label}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-orange-900"
                        onClick={(e) => removeOption(v, e)}
                      />
                    </span>
                  )
                })
              )}
            </div>
            <ChevronDown
              className={cn(
                'w-4 h-4 text-gray-500 transition-transform flex-shrink-0',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => {
              const isSelected = value.includes(option.value)
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleOption(option.value)}
                  className={cn(
                    'w-full px-3 py-2 text-left flex items-center justify-between hover:bg-gray-50 transition-colors',
                    isSelected && 'bg-orange-50'
                  )}
                >
                  <span className={cn(isSelected && 'text-orange-800 font-medium')}>
                    {option.label}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-orange-600" />}
                </button>
              )
            })}
          </div>
        )}
      </div>
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
