'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { useAdmin } from './AdminContext'
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  FileText,
  MessageSquare,
  HelpCircle,
  Image,
  Briefcase,
  Settings,
  Mail,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Usluge', href: '/admin/services', icon: Stethoscope },
  { name: 'Liječnici', href: '/admin/doctors', icon: Users },
  { name: 'Blog', href: '/admin/posts', icon: FileText },
  { name: 'Svjedočanstva', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'FAQ', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Galerija', href: '/admin/gallery', icon: Image },
  { name: 'Karijere', href: '/admin/jobs', icon: Briefcase },
  { name: 'Postavke', href: '/admin/settings', icon: Settings },
  { name: 'Poruke', href: '/admin/submissions', icon: Mail },
  { name: 'Mediji', href: '/admin/media', icon: FolderOpen },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useAdmin()

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 z-40',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        {!sidebarCollapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-color flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-lg">Atria CMS</span>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            'p-1.5 rounded-lg hover:bg-gray-800 transition-colors',
            sidebarCollapsed && 'mx-auto'
          )}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                active
                  ? 'bg-brand-color text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                sidebarCollapsed && 'justify-center px-2'
              )}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
