'use client'

import { useActionState } from 'react'
import { login, type LoginState } from './actions'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils/cn'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'
import { useState } from 'react'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200',
        'bg-brand-color hover:bg-brand-color/90',
        'focus:outline-none focus:ring-2 focus:ring-brand-color focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2'
      )}
    >
      {pending ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Prijava...
        </>
      ) : (
        'Prijavi se'
      )}
    </button>
  )
}

export default function LoginPage() {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {})
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-color mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-1">Poliklinika Atria</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Prijava</h2>

          {/* Error Message */}
          {state.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{state.error}</p>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email adresa
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={cn(
                    'w-full pl-10 pr-4 py-2.5 border rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent',
                    state.fieldErrors?.email
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  )}
                  placeholder="admin@atria.hr"
                />
              </div>
              {state.fieldErrors?.email && (
                <p className="mt-1.5 text-sm text-red-600">
                  {state.fieldErrors.email[0]}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Lozinka
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className={cn(
                    'w-full pl-10 pr-12 py-2.5 border rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent',
                    state.fieldErrors?.password
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {state.fieldErrors?.password && (
                <p className="mt-1.5 text-sm text-red-600">
                  {state.fieldErrors.password[0]}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <SubmitButton />
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Poliklinika Atria. Sva prava pridržana.
        </p>
      </div>
    </div>
  )
}
