import { Metadata } from 'next'
import { getPosts, getFeaturedPosts, getBlogPageSettings } from '@/lib/api'
import { BlogPageClient } from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Zdravstveni savjeti, stručni članci i najnovije vijesti iz svijeta medicine od tima Poliklinike Atria.',
}

export default async function BlogPage() {
  const [posts, featuredPosts, pageSettings] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
    getBlogPageSettings(),
  ])

  return <BlogPageClient initialPosts={posts} featuredPosts={featuredPosts} pageSettings={pageSettings} />
}
