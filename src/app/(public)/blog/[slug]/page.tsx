import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getRecentPosts } from '@/lib/api'
import { getLocalizedContent } from '@/lib/utils/locale'
import { BlogDetailClient } from './BlogDetailClient'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Članak nije pronađen' }
  }

  const title = getLocalizedContent(post.title, 'hr-HR')
  const description = getLocalizedContent(post.excerpt, 'hr-HR')

  return {
    title,
    description: description || `Pročitajte članak: ${title}`,
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const [post, recentPosts] = await Promise.all([
    getPostBySlug(slug),
    getRecentPosts(4),
  ])

  if (!post) {
    notFound()
  }

  // Filter out current post from related
  const relatedPosts = recentPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />
}
