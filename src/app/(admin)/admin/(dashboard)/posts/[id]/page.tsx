import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/api/admin/posts'
import { PostForm } from '../PostForm'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return <PostForm post={post} isEditing />
}
