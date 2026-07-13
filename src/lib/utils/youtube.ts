// YouTube URL helpers — shared by HomePageClient and VideoModal.

// Detect whether a URL points at YouTube (any form: watch, youtu.be, shorts, embed).
export function isYouTubeUrl(url: string | null): boolean {
  if (!url) return false
  return url.includes('youtube.com') || url.includes('youtu.be')
}

// Patterns that capture the 11-char video ID from the supported YouTube URL forms.
const youtubePatterns = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([a-zA-Z0-9_-]+)/,
  /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]+)/,
]

// Convert a YouTube URL (including Shorts) to an embeddable player URL.
// Non-YouTube URLs (direct video files) are returned unchanged.
export function getEmbedUrl(url: string | null): string | null {
  if (!url) return null

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`
    }
  }

  return url
}
