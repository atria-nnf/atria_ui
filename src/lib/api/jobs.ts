import { createClient } from '@/lib/supabase/server'
import type { JobPosting, Locale } from '@/types'

/**
 * Get active job postings
 */
export async function getJobPostings(
  locale?: Locale,
  activeOnly: boolean = true
): Promise<JobPosting[]> {
  const supabase = await createClient()

  let query = supabase
    .from('job_postings')
    .select('*')
    .order('created_at', { ascending: false })

  if (activeOnly) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching job postings:', error)
    return []
  }

  return (data as JobPosting[]) || []
}

/**
 * Get job posting by slug
 */
export async function getJobPostingBySlug(
  slug: string,
  locale?: Locale
): Promise<JobPosting | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching job posting:', error)
    return null
  }

  return data as JobPosting
}

/**
 * Get job postings by department
 */
export async function getJobPostingsByDepartment(
  department: string,
  locale?: Locale
): Promise<JobPosting[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('department', department)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching job postings by department:', error)
    return []
  }

  return (data as JobPosting[]) || []
}

/**
 * Get all job posting slugs (for static generation)
 */
export async function getAllJobSlugs(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('job_postings')
    .select('slug')
    .eq('is_active', true)

  if (error) {
    console.error('Error fetching job slugs:', error)
    return []
  }

  return (data as { slug: string }[])?.map((j) => j.slug) || []
}

/**
 * Get all job departments
 */
export async function getJobDepartments(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('job_postings')
    .select('department')
    .eq('is_active', true)
    .not('department', 'is', null)

  if (error) {
    console.error('Error fetching job departments:', error)
    return []
  }

  // Get unique departments
  const departments = [...new Set((data as { department: string }[])?.map((j) => j.department).filter(Boolean))]
  return departments
}

/**
 * Get active job postings (convenience alias)
 */
export async function getActiveJobs(): Promise<JobPosting[]> {
  return getJobPostings(undefined, true)
}
