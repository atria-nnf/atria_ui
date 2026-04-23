'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ChevronLeft, Share2, Eye, ArrowRight } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import { getImageUrl } from '@/lib/utils/image'
import type { Post } from '@/types'

interface BlogDetailClientProps {
  post: Post
  relatedPosts: Post[]
}

export function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  const { locale } = useLocale()
  const [showShareMenu, setShowShareMenu] = useState(false)

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    const localeMap = { 'hr-HR': 'hr-HR', 'en-US': 'en-US', 'de-DE': 'de-DE' }
    return new Date(dateString).toLocaleDateString(localeMap[locale], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Calculate read time
  const calculateReadTime = (content: string | null) => {
    if (!content) return '5 min'
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min`
  }

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = getLocalizedContent(post.title, locale)

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        break
    }
    setShowShareMenu(false)
  }

  const title = getLocalizedContent(post.title, locale)
  const excerpt = getLocalizedContent(post.excerpt, locale)
  const content = getLocalizedContent(post.content, locale)

  return (
    <div className="bg-white text-black font-sans">
      {/* Back Button */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span>{locale === 'hr-HR' ? 'Natrag na blog' : locale === 'en-US' ? 'Back to blog' : 'Zurück zum Blog'}</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Article Header */}
      <article>
        <header className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Category */}
              {post.category && (
                <div className="mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-serif">{title}</h1>

              {/* Excerpt */}
              {excerpt && <p className="text-2xl text-gray-600 mb-8 leading-relaxed">{excerpt}</p>}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                {post.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>
                    {calculateReadTime(content)} {locale === 'hr-HR' ? 'čitanja' : locale === 'en-US' ? 'read' : 'Lesezeit'}
                  </span>
                </div>
                {post.views > 0 && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>
                      {post.views} {locale === 'hr-HR' ? 'pregleda' : locale === 'en-US' ? 'views' : 'Aufrufe'}
                    </span>
                  </div>
                )}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {locale === 'hr-HR' ? 'Podijeli:' : locale === 'en-US' ? 'Share:' : 'Teilen:'}
                </span>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <FaFacebookF className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <FaTwitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="max-w-5xl mx-auto px-8 -mt-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={getImageUrl(post.featured_image) || ''}
                alt={title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline"
          >
            {content ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <p className="text-gray-500 italic">
                {locale === 'hr-HR' ? 'Sadržaj nije dostupan.' : locale === 'en-US' ? 'Content not available.' : 'Inhalt nicht verfügbar.'}
              </p>
            )}
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
                {locale === 'hr-HR' ? 'Povezani članci' : locale === 'en-US' ? 'Related Articles' : 'Verwandte Artikel'}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${article.slug}`} className="block">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                      <img
                        src={
                          getImageUrl(article.featured_image) ||
                          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop'
                        }
                        alt={getLocalizedContent(article.title, locale)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-orange-500 transition-colors font-serif">
                      {getLocalizedContent(article.title, locale)}
                    </h3>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      {article.published_at && <span>{formatDate(article.published_at)}</span>}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 rounded-full font-medium hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  {locale === 'hr-HR' ? 'Svi članci' : locale === 'en-US' ? 'All Articles' : 'Alle Artikel'}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
