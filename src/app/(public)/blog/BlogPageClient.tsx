'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, Search, Tag, ArrowRight } from 'lucide-react'
import { useLocale } from '@/config/locale-context'
import { getLocalizedContent } from '@/lib/utils/locale'
import { getImageUrl } from '@/lib/utils/image'
import type { Post } from '@/types'

interface BlogPageClientProps {
  initialPosts: Post[]
  featuredPosts: Post[]
}

export function BlogPageClient({ initialPosts, featuredPosts }: BlogPageClientProps) {
  const { locale } = useLocale()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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

  // Get unique categories
  const categories = useMemo(() => {
    const allCategories = initialPosts.map((post) => post.category).filter(Boolean) as string[]
    const uniqueCategories = [...new Set(allCategories)]

    const allLabel = locale === 'hr-HR' ? 'Sve' : locale === 'en-US' ? 'All' : 'Alle'

    return [
      { id: 'all', name: allLabel, count: initialPosts.length },
      ...uniqueCategories.map((cat) => ({
        id: cat,
        name: cat,
        count: initialPosts.filter((post) => post.category === cat).length,
      })),
    ]
  }, [initialPosts, locale])

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      const title = getLocalizedContent(post.title, locale).toLowerCase()
      const excerpt = getLocalizedContent(post.excerpt, locale).toLowerCase()
      const matchesSearch =
        searchQuery === '' || title.includes(searchQuery.toLowerCase()) || excerpt.includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [initialPosts, selectedCategory, searchQuery, locale])

  const featuredArticle = featuredPosts[0] || null

  // Popular topics (static for now)
  const popularTopics = [
    {
      name: locale === 'hr-HR' ? 'Prevencija bolesti' : locale === 'en-US' ? 'Disease Prevention' : 'Krankheitsprävention',
      count: locale === 'hr-HR' ? '24 članka' : locale === 'en-US' ? '24 articles' : '24 Artikel',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: locale === 'hr-HR' ? 'Zdrava prehrana' : locale === 'en-US' ? 'Healthy Diet' : 'Gesunde Ernährung',
      count: locale === 'hr-HR' ? '18 članaka' : locale === 'en-US' ? '18 articles' : '18 Artikel',
      color: 'from-green-500 to-green-600',
    },
    {
      name: locale === 'hr-HR' ? 'Mentalno zdravlje' : locale === 'en-US' ? 'Mental Health' : 'Psychische Gesundheit',
      count: locale === 'hr-HR' ? '15 članaka' : locale === 'en-US' ? '15 articles' : '15 Artikel',
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: locale === 'hr-HR' ? 'Tjelovježba' : locale === 'en-US' ? 'Exercise' : 'Bewegung',
      count: locale === 'hr-HR' ? '12 članaka' : locale === 'en-US' ? '12 articles' : '12 Artikel',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <div className="bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="text-sm tracking-widest text-blue-300 mb-6">
              {locale === 'hr-HR' ? 'BLOG & VIJESTI' : locale === 'en-US' ? 'BLOG & NEWS' : 'BLOG & NACHRICHTEN'}
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight font-serif">
              {locale === 'hr-HR' ? (
                <>
                  Zdravstveni<br />savjeti & priče
                </>
              ) : locale === 'en-US' ? (
                <>
                  Health<br />Tips & Stories
                </>
              ) : (
                <>
                  Gesundheits<br />tipps & Geschichten
                </>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {locale === 'hr-HR'
                ? 'Stručni članci, savjeti za zdrav život i najnovije vijesti iz svijeta medicine od našeg tima liječnika.'
                : locale === 'en-US'
                ? 'Expert articles, healthy living tips and the latest medical news from our team of doctors.'
                : 'Fachartikel, Tipps für ein gesundes Leben und die neuesten medizinischen Nachrichten von unserem Ärzteteam.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  locale === 'hr-HR'
                    ? 'Pretraži članke...'
                    : locale === 'en-US'
                    ? 'Search articles...'
                    : 'Artikel suchen...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-orangeCTA text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} <span className="opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-orangeCTA" />
                <span className="text-sm tracking-widest text-orange-500 font-semibold">
                  {locale === 'hr-HR' ? 'IZDVOJENO' : locale === 'en-US' ? 'FEATURED' : 'HERVORGEHOBEN'}
                </span>
              </div>

              <Link href={`/blog/${featuredArticle.slug}`} className="group block">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Image */}
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
                    <img
                      src={
                        getImageUrl(featuredArticle.featured_image) ||
                        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=900&fit=crop'
                      }
                      alt={getLocalizedContent(featuredArticle.title, locale)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {featuredArticle.category && (
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold">
                          {featuredArticle.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight group-hover:text-orange-500 transition-colors font-serif">
                      {getLocalizedContent(featuredArticle.title, locale)}
                    </h2>

                    {featuredArticle.excerpt && (
                      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        {getLocalizedContent(featuredArticle.excerpt, locale)}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
                      {featuredArticle.published_at && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(featuredArticle.published_at)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {calculateReadTime(getLocalizedContent(featuredArticle.content, locale))}{' '}
                          {locale === 'hr-HR' ? 'čitanja' : locale === 'en-US' ? 'read' : 'Lesezeit'}
                        </span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-3 text-lg font-medium group">
                      <span className="border-b-2 border-orange-500 pb-1">
                        {locale === 'hr-HR'
                          ? 'Čitaj cijeli članak'
                          : locale === 'en-US'
                          ? 'Read full article'
                          : 'Vollständigen Artikel lesen'}
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              {locale === 'hr-HR' ? 'Najnoviji članci' : locale === 'en-US' ? 'Latest Articles' : 'Neueste Artikel'}
            </h2>
            <p className="text-gray-600 text-lg">
              {filteredPosts.length}{' '}
              {locale === 'hr-HR'
                ? filteredPosts.length === 1
                  ? 'članak pronađen'
                  : 'članaka pronađeno'
                : locale === 'en-US'
                ? filteredPosts.length === 1
                  ? 'article found'
                  : 'articles found'
                : filteredPosts.length === 1
                ? 'Artikel gefunden'
                : 'Artikel gefunden'}
            </p>
          </motion.div>

          {/* Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${article.slug}`} className="block">
                    {/* Image */}
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

                      {article.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold">
                            {article.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-orange-500 transition-colors font-serif">
                        {getLocalizedContent(article.title, locale)}
                      </h3>

                      {article.excerpt && (
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                          {getLocalizedContent(article.excerpt, locale)}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {article.published_at && <span>{formatDate(article.published_at)}</span>}
                        <span>•</span>
                        <span>{calculateReadTime(getLocalizedContent(article.content, locale))}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                {locale === 'hr-HR'
                  ? 'Nema pronađenih članaka za odabrane kriterije.'
                  : locale === 'en-US'
                  ? 'No articles found for the selected criteria.'
                  : 'Keine Artikel für die ausgewählten Kriterien gefunden.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Topics */}
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
              {locale === 'hr-HR' ? 'Popularne teme' : locale === 'en-US' ? 'Popular Topics' : 'Beliebte Themen'}
            </h2>
            <p className="text-gray-600 text-lg">
              {locale === 'hr-HR'
                ? 'Najčitanije oblasti u posljednjih 30 dana'
                : locale === 'en-US'
                ? 'Most read areas in the last 30 days'
                : 'Meistgelesene Bereiche der letzten 30 Tage'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                <p className="text-gray-600 text-sm">{topic.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-8 text-center"
        >
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Tag className="w-10 h-10" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            {locale === 'hr-HR'
              ? 'Pretplatite se na newsletter'
              : locale === 'en-US'
              ? 'Subscribe to newsletter'
              : 'Newsletter abonnieren'}
          </h2>

          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            {locale === 'hr-HR'
              ? 'Primajte najnovije zdravstvene savjete i članke direktno u svoj inbox. Besplatno.'
              : locale === 'en-US'
              ? 'Receive the latest health tips and articles directly to your inbox. Free.'
              : 'Erhalten Sie die neuesten Gesundheitstipps und Artikel direkt in Ihr Postfach. Kostenlos.'}
          </p>

          <form className="max-w-md mx-auto relative">
            <input
              type="email"
              placeholder={locale === 'hr-HR' ? 'Vaša email adresa' : locale === 'en-US' ? 'Your email address' : 'Ihre E-Mail-Adresse'}
              className="w-full px-6 py-4 pr-32 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-orangeCTA rounded-full font-medium"
            >
              {locale === 'hr-HR' ? 'Pretplati se' : locale === 'en-US' ? 'Subscribe' : 'Abonnieren'}
            </motion.button>
          </form>

          <p className="text-sm text-gray-400 mt-6">
            {locale === 'hr-HR'
              ? 'Bez spam-a. Odjava u bilo kojem trenutku.'
              : locale === 'en-US'
              ? 'No spam. Unsubscribe at any time.'
              : 'Kein Spam. Jederzeit abmelden.'}
          </p>
        </motion.div>
      </section>
    </div>
  )
}
