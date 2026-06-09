'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/admin/ui/Input'
import { Select } from '@/components/admin/ui/Select'
import { Button } from '@/components/admin/ui/Button'
import { Switch } from '@/components/admin/ui/Switch'
import { LocalizedInput } from '@/components/admin/ui/LocalizedInput'
import { createPost, updatePost } from '@/lib/api/admin/posts'
import { createClient } from '@/lib/supabase/client'
import type { Post, Service } from '@/types'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { getLocalizedContent } from '@/lib/utils/locale'

const postSchema = z.object({
  slug: z.string().min(1, 'Slug je obavezan').regex(/^[a-z0-9-]+$/, 'Slug može sadržavati samo mala slova, brojeve i crtice'),
  category: z.string().optional(),
  featured_image: z.string().optional(),
  author_id: z.string().optional().nullable(),
  service_id: z.string().optional().nullable(),
  is_featured: z.boolean(),
  is_published: z.boolean(),
})

type PostFormData = z.infer<typeof postSchema>

interface PostFormProps {
  post?: Post
  isEditing?: boolean
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[čć]/g, 'c')
    .replace(/[đ]/g, 'd')
    .replace(/[š]/g, 's')
    .replace(/[ž]/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function PostForm({ post, isEditing }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [services, setServices] = useState<Service[]>([])

  // Fetch services for the dropdown
  useEffect(() => {
    async function fetchServices() {
      const supabase = createClient()
      const { data } = await supabase
        .from('services')
        .select('*')
        .order('name->hr-HR', { ascending: true })
      if (data) {
        setServices(data as Service[])
      }
    }
    fetchServices()
  }, [])

  // Localized fields state
  const [title, setTitle] = useState<Record<string, string>>(
    post?.title || { 'hr-HR': '', 'en-US': '', 'de-DE': '' }
  )
  const [excerpt, setExcerpt] = useState<Record<string, string>>(
    post?.excerpt || { 'hr-HR': '', 'en-US': '', 'de-DE': '' }
  )
  const [content, setContent] = useState<Record<string, string>>(
    post?.content || { 'hr-HR': '', 'en-US': '', 'de-DE': '' }
  )

  // Tags array
  const [tags, setTags] = useState<string[]>(
    (post?.tags as string[]) || []
  )
  const [newTag, setNewTag] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      slug: post?.slug || '',
      category: post?.category || '',
      featured_image: post?.featured_image || '',
      author_id: post?.author_id || null,
      service_id: post?.service_id || null,
      is_featured: post?.is_featured || false,
      is_published: post?.is_published || false,
    },
  })

  const isFeatured = watch('is_featured')
  const isPublished = watch('is_published')

  // Auto-generate slug from Croatian title
  const handleTitleChange = (newTitle: Record<string, string>) => {
    setTitle(newTitle)
    if (!isEditing && newTitle['hr-HR']) {
      setValue('slug', slugify(newTitle['hr-HR']))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const onSubmit = async (data: PostFormData) => {
    if (!title['hr-HR']?.trim()) {
      setError('Naslov na hrvatskom jeziku je obavezan')
      return
    }

    setLoading(true)
    setError(null)

    const postData = {
      ...data,
      title,
      excerpt,
      content,
      tags,
      published_at: data.is_published && !post?.is_published ? new Date().toISOString() : post?.published_at || null,
    }

    const result = isEditing && post
      ? await updatePost(post.id, postData)
      : await createPost(postData as any)

    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      router.push('/admin/posts')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Uredi post' : 'Novi post'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing ? 'Uredite blog post' : 'Kreirajte novi blog post'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Odustani
          </Link>
          <Button type="submit" loading={loading}>
            <Save className="w-4 h-4" />
            {isEditing ? 'Spremi promjene' : 'Kreiraj post'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Excerpt Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Osnovni podaci
            </h2>

            <LocalizedInput
              label="Naslov"
              name="title"
              value={title}
              onChange={handleTitleChange}
              required
              placeholder="Naslov blog posta"
            />

            <LocalizedInput
              label="Kratki opis"
              name="excerpt"
              value={excerpt}
              onChange={setExcerpt}
              type="textarea"
              rows={3}
              placeholder="Kratki opis za prikaz u listama"
            />
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Sadržaj
            </h2>

            <LocalizedInput
              label="Sadržaj (Markdown)"
              name="content"
              value={content}
              onChange={setContent}
              type="textarea"
              rows={15}
              placeholder="Pišite sadržaj koristeći Markdown formatiranje..."
            />
          </div>

          {/* Media Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Mediji
            </h2>

            <Input
              label="URL naslovne slike"
              placeholder="https://..."
              hint="URL naslovne slike za post"
              {...register('featured_image')}
              error={errors.featured_image?.message}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Status
            </h2>

            <Switch
              checked={isPublished}
              onChange={(checked) => setValue('is_published', checked)}
              label="Objavi post"
            />

            <Switch
              checked={isFeatured}
              onChange={(checked) => setValue('is_featured', checked)}
              label="Istaknuti post"
            />
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Detalji
            </h2>

            <Input
              label="Slug"
              placeholder="moj-blog-post"
              hint="URL-prijateljski naziv (auto-generiran)"
              required
              {...register('slug')}
              error={errors.slug?.message}
            />

            <Input
              label="Kategorija"
              placeholder="Npr. Zdravlje"
              {...register('category')}
              error={errors.category?.message}
            />

            <Select
              label="Povezana usluga"
              placeholder="Odaberi uslugu (opcionalno)"
              options={services.map((s) => ({
                value: s.id,
                label: getLocalizedContent(s.name, 'hr-HR'),
              }))}
              {...register('service_id')}
              hint="Post će se prikazati na stranici odabrane usluge"
            />
          </div>

          {/* Tags Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
              Oznake
            </h2>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Nova oznaka..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
