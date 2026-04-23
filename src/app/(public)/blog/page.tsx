import { Metadata } from 'next'
import { getPosts, getFeaturedPosts } from '@/lib/api'
import { BlogPageClient } from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Zdravstveni savjeti, stručni članci i najnovije vijesti iz svijeta medicine od tima Poliklinike Atria.',
}

export default async function BlogPage() {
  const [posts, featuredPosts] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
  ])

  return <BlogPageClient initialPosts={posts} featuredPosts={featuredPosts} />
}
