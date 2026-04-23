import { createClient } from '@/lib/supabase/server'
import {
  Stethoscope,
  Users,
  FileText,
  Mail,
  TrendingUp,
  Clock,
  Eye,
} from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  const supabase = await createClient()

  const [services, doctors, posts, submissions] = await Promise.all([
    supabase.from('services').select('id', { count: 'exact', head: true }),
    supabase.from('doctors').select('id', { count: 'exact', head: true }),
    supabase.from('posts').select('id', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
  ])

  return {
    services: services.count || 0,
    doctors: doctors.count || 0,
    posts: posts.count || 0,
    submissions: submissions.count || 0,
  }
}

async function getRecentSubmissions() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return data || []
}

async function getRecentPosts() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('posts')
    .select('id, slug, title, views, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return data || []
}

const statCards = [
  {
    name: 'Usluge',
    key: 'services' as const,
    icon: Stethoscope,
    href: '/admin/services',
    color: 'bg-blue-500',
  },
  {
    name: 'Liječnici',
    key: 'doctors' as const,
    icon: Users,
    href: '/admin/doctors',
    color: 'bg-green-500',
  },
  {
    name: 'Blog postovi',
    key: 'posts' as const,
    icon: FileText,
    href: '/admin/posts',
    color: 'bg-purple-500',
  },
  {
    name: 'Poruke',
    key: 'submissions' as const,
    icon: Mail,
    href: '/admin/submissions',
    color: 'bg-orange-500',
  },
]

export default async function AdminDashboard() {
  const [stats, recentSubmissions, recentPosts] = await Promise.all([
    getStats(),
    getRecentSubmissions(),
    getRecentPosts(),
  ])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Dobrodošli u admin panel Poliklinike Atria
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.key}
              href={card.href}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats[card.key]}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Nedavne poruke
              </h2>
              <Link
                href="/admin/submissions"
                className="text-sm text-brand-color hover:underline"
              >
                Vidi sve
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentSubmissions.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Nema novih poruka
              </div>
            ) : (
              recentSubmissions.map((submission: any) => (
                <div key={submission.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {submission.name}
                      </p>
                      <p className="text-sm text-gray-600 truncate max-w-xs">
                        {submission.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {new Date(submission.created_at).toLocaleDateString('hr-HR')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Nedavni postovi
              </h2>
              <Link
                href="/admin/posts"
                className="text-sm text-brand-color hover:underline"
              >
                Vidi sve
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPosts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Nema blog postova
              </div>
            ) : (
              recentPosts.map((post: any) => (
                <div key={post.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {typeof post.title === 'object'
                          ? post.title['hr-HR'] || post.title['en-US'] || 'Bez naslova'
                          : post.title}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views || 0} pregleda
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString('hr-HR')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Brze akcije
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-brand-color/90 transition-colors"
          >
            <Stethoscope className="w-4 h-4" />
            Nova usluga
          </Link>
          <Link
            href="/admin/doctors/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Users className="w-4 h-4" />
            Novi liječnik
          </Link>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Novi post
          </Link>
        </div>
      </div>
    </div>
  )
}
