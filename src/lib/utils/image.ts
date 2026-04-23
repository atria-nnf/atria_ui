/**
 * Get full URL for Supabase storage images
 */
export function getStorageUrl(path: string | null | undefined): string | null {
  if (!path) return null

  // If it's already a full URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  // Build Supabase storage URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    console.warn('NEXT_PUBLIC_SUPABASE_URL is not set')
    return path
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  return `${supabaseUrl}/storage/v1/object/public/${cleanPath}`
}

/**
 * Get image URL from various sources
 * Handles both Supabase storage paths and full URLs
 */
export function getImageUrl(imageData: string | null | undefined): string | null {
  if (!imageData) return null
  return getStorageUrl(imageData)
}

/**
 * Get optimized image URL with transformations
 * Supabase Image Transformation requires paid plan
 */
export function getOptimizedImageUrl(
  path: string | null | undefined,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'avif' | 'auto'
  }
): string | null {
  const url = getStorageUrl(path)
  if (!url) return null

  // For now, just return the base URL
  // Supabase image transformations would be added here
  // Example: ${url}?width=${options.width}&height=${options.height}

  return url
}

/**
 * Generate placeholder data URL for loading states
 */
export function getPlaceholderImage(
  width: number = 400,
  height: number = 300,
  bgColor: string = 'e5e7eb'
): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect fill='%23${bgColor}' width='100%25' height='100%25'/%3E%3C/svg%3E`
}
