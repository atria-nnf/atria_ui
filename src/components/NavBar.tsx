'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, ArrowRight, Globe } from 'lucide-react'
import { NAV_ITEMS, ROUTES } from '@/config/routes'
import { useLocale } from '@/config/locale-context'
import type { Service, Locale, ContactInfo } from '@/types'

const LANGUAGE_OPTIONS: { code: Locale; label: string; short: string }[] = [
  { code: 'hr-HR', label: 'Hrvatski', short: 'HR' },
  { code: 'en-US', label: 'English', short: 'EN' },
  { code: 'de-DE', label: 'Deutsch', short: 'DE' },
]

interface NavBarProps {
  services?: Service[]
  contactInfo?: ContactInfo
}

interface DropdownItem {
  name: string
  href: string
}

interface NavItem {
  name: string
  href: string
  dropdown?: DropdownItem[]
  dynamicDropdown?: 'services'
}

export function NavBar({ services = [], contactInfo }: NavBarProps) {
  // Format phone number for display (add spaces)
  const formatPhoneDisplay = (phone: string) => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '')
    // Format as XX XXX XXXX for Croatian numbers
    if (digits.startsWith('385')) {
      const local = digits.slice(3)
      return `0${local.slice(0, 1)} ${local.slice(1, 4)} ${local.slice(4)}`
    }
    return phone
  }

  const phoneNumber = contactInfo?.phone || '+385 1 234 5678'
  const phoneHref = `tel:${phoneNumber.replace(/\s/g, '')}`
  const phoneDisplay = formatPhoneDisplay(phoneNumber)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const { locale, setLocale } = useLocale()

  const currentLang = LANGUAGE_OPTIONS.find((l) => l.code === locale) || LANGUAGE_OPTIONS[0]

  // Build navigation items with dynamic dropdowns
  const navItems = useMemo(() => {
    return NAV_ITEMS.map((item) => {
      if ((item as NavItem).dynamicDropdown === 'services' && services.length > 0) {
        return {
          ...item,
          dropdown: services.map((service) => ({
            name: typeof service.name === 'string'
              ? service.name
              : (service.name as Record<string, string>)?.['hr-HR'] || service.slug,
            href: `/usluge/${service.slug}`,
          })),
        }
      }
      return item
    }) as NavItem[]
  }, [services])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed w-full top-0 z-50 px-4 pt-4"
      >
        <div
          className="max-w-7xl mx-auto transition-all duration-500 rounded-2xl border bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-gray-200/50"
        >
          <div className="px-6 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/" className="relative z-10 flex items-center gap-3">
                  <Image
                    src="/logo/atria-logo.png"
                    alt="Poliklinika Atria"
                    width={120}
                    height={40}
                    priority
                    className="h-8 w-auto"
                  />
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all duration-300 text-gray-700 hover:text-orangeCTA hover:bg-orange-50"
                    >
                      {item.name}
                      {item.dropdown && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.dropdown && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden"
                        >
                          <div className="p-2">
                            {item.dropdown.map((dropItem, index) => (
                              <motion.div
                                key={dropItem.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.03 }}
                              >
                                <Link
                                  href={dropItem.href}
                                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orangeCTA rounded-xl transition-all duration-200 group"
                                >
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-orangeCTA" />
                                  {dropItem.name}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Right Side - Language, Phone & CTA */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Language Switcher */}
                <div
                  className="relative"
                  onMouseEnter={() => setLangDropdownOpen(true)}
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 text-gray-600 hover:text-orangeCTA hover:bg-orange-50"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-semibold">{currentLang.short}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {langDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full right-0 mt-2 w-40 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden"
                      >
                        <div className="p-1.5">
                          {LANGUAGE_OPTIONS.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLocale(lang.code)
                                setLangDropdownOpen(false)
                              }}
                              className={`flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                                locale === lang.code
                                  ? 'bg-orange-50 text-orangeCTA font-medium'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <span>{lang.label}</span>
                              <span className="text-xs text-gray-400 font-medium">{lang.short}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone Number */}
                <a
                  href={phoneHref}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 text-gray-600 hover:text-orangeCTA hover:bg-orange-50"
                >
                  <Phone className="w-4 h-4" />
                  <span>{phoneDisplay}</span>
                </a>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-200" />

                {/* CTA Button */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/kontakt"
                    className="px-5 py-2.5 bg-orangeCTA text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-all duration-300"
                  >
                    Rezerviraj
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl transition-all duration-300 text-gray-700 hover:bg-gray-100"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel - Floating card style to match navbar */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute left-3 right-3 top-[72px] bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/10 rounded-2xl border border-gray-200/50 overflow-hidden"
              style={{ maxHeight: 'calc(100vh - 88px)' }}
            >
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 88px)' }}>
                {/* Navigation Items */}
                <div className="p-2">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={() => setMobileDropdown(mobileDropdown === item.name ? null : item.name)}
                            className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orangeCTA transition-all font-medium text-left"
                          >
                            {item.name}
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                mobileDropdown === item.name ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {/* Collapsible Mobile Dropdown */}
                          <AnimatePresence>
                            {mobileDropdown === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-3 mr-2 mb-2 py-1 bg-gray-50 rounded-xl">
                                  {item.dropdown.map((dropItem) => (
                                    <Link
                                      key={dropItem.href}
                                      href={dropItem.href}
                                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-orangeCTA transition-colors"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <ArrowRight className="w-3 h-3 text-orangeCTA opacity-50" />
                                      {dropItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orangeCTA transition-all font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Language Switcher - Mobile */}
                <div className="p-2">
                  <div className="flex gap-1 bg-gray-50 p-1 rounded-xl">
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLocale(lang.code)}
                        className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all ${
                          locale === lang.code
                            ? 'bg-white text-orangeCTA shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {lang.short}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-3 border-t border-gray-100" />

                {/* Phone & CTA Row */}
                <div className="p-2 flex gap-2">
                  <a
                    href={phoneHref}
                    className="flex items-center gap-2 flex-1 p-3 bg-gray-50 hover:bg-orange-50 rounded-xl transition-all"
                  >
                    <div className="p-1.5 bg-orangeCTA rounded-lg">
                      <Phone className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">{phoneDisplay}</span>
                  </a>

                  <Link
                    href="/kontakt"
                    className="flex items-center justify-center gap-2 flex-1 p-3 bg-orangeCTA text-white rounded-xl font-semibold hover:bg-orange-600 transition-all text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Rezerviraj
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
