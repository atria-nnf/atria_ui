'use client'

import { useAdmin } from './AdminContext'
import { cn } from '@/lib/utils/cn'

export default function AdminMain({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useAdmin()

  return (
    <main
      className={cn(
        'pt-16 min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <div className="p-6">{children}</div>
    </main>
  )
}
