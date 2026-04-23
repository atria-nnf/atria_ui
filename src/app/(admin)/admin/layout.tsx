export const metadata = {
  title: 'Admin Panel | Poliklinika Atria',
  description: 'Content Management System za Polikliniku Atria',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
