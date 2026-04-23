'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Unesite valjanu email adresu'),
  password: z.string().min(6, 'Lozinka mora imati najmanje 6 znakova'),
})

export type LoginState = {
  error?: string
  fieldErrors?: {
    email?: string[]
    password?: string[]
  }
}

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validatedFields = loginSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  })

  if (error) {
    return {
      error: 'Neispravna email adresa ili lozinka',
    }
  }

  redirect('/admin')
}
