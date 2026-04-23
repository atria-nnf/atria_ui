import { getUser } from '@/lib/supabase/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminMain from '@/components/admin/AdminMain'
import { AdminProvider } from '@/components/admin/AdminContext'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-100">
        <AdminSidebar />
        <AdminHeader user={user} />
        <AdminMain>{children}</AdminMain>
      </div>
    </AdminProvider>
  )
}
