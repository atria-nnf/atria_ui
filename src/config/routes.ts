export const ROUTES = {
  HOME: '/',
  ABOUT_US: '/o-nama',
  SERVICES: '/usluge',
  SERVICES_DETAILS: '/usluge/:slug',
  CONTACT: '/kontakt',
  PRIVACY: '/politika-privatnosti',
  TERMS: '/uvjeti-koristenja',
  COOKIE: '/politika-kolacica',
  BLOG: '/blog',
  BLOG_DETAILS: '/blog/:slug',
  DOCTORS: '/lijecnici',
  CAREERS: '/karijere',
} as const

export type RouteName = keyof typeof ROUTES

/**
 * Generate a route path with parameters
 */
export function getRoute(route: RouteName, params?: Record<string, string>): string {
  let path = ROUTES[route]

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value) as typeof path
    })
  }

  return path
}

/**
 * Navigation items for NavBar
 */
export const NAV_ITEMS = [
  { name: 'Naslovnica', href: ROUTES.HOME },
  {
    name: 'Usluge',
    href: ROUTES.SERVICES,
    dropdown: [
      { name: 'Ginekologija', href: '/usluge/ginekologija' },
      { name: 'Kardiologija', href: '/usluge/kardiologija' },
      { name: 'Dermatologija', href: '/usluge/dermatologija' },
      { name: 'Ultrazvuk', href: '/usluge/ultrazvuk' },
      { name: 'Laboratorij', href: '/usluge/laboratorij' },
    ],
  },
  { name: 'Naši Doktori', href: ROUTES.DOCTORS },
  { name: 'O nama', href: ROUTES.ABOUT_US },
  { name: 'Kontakt', href: ROUTES.CONTACT },
  { name: 'Novosti', href: ROUTES.BLOG },
  { name: 'Karijere', href: ROUTES.CAREERS },
]
