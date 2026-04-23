import Link from 'next/link'
import { getPostsAdmin } from '@/lib/api/admin/posts'
import { Plus, Pencil, ExternalLink, Eye, Calendar } from 'lucide-react'
import { DeleteButton, PublishedToggle, FeaturedToggle } from './PostActions'

export default async function PostsPage() {
  const posts = await getPostsAdmin()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600 mt-1">
            Upravljajte blog postovima
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-brand-color/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novi post
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Naslov
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kategorija
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pregledi
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Istaknuto
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Akcije
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    Nema blog postova. Kliknite &quot;Novi post&quot; da kreirate prvi.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {post.featured_image ? (
                          <img
                            src={post.featured_image}
                            alt=""
                            className="w-12 h-8 rounded object-cover bg-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                            —
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {post.title?.['hr-HR'] || post.title?.['en-US'] || 'Bez naslova'}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.created_at).toLocaleDateString('hr-HR')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {post.category ? (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                          {post.category}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <PublishedToggle
                        id={post.id}
                        published={post.is_published}
                      />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                        <Eye className="w-4 h-4" />
                        {post.views || 0}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <FeaturedToggle
                        id={post.id}
                        featured={post.is_featured}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {post.is_published && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Pogledaj na stranici"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="p-2 text-gray-500 hover:text-brand-color hover:bg-blue-50 rounded-lg transition-colors"
                          title="Uredi"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteButton
                          id={post.id}
                          name={post.title?.['hr-HR'] || 'ovaj post'}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
