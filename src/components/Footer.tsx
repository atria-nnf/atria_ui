'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import type { Service } from '@/types'

interface FooterProps {
  services?: Service[]
}

const quickLinks = [
  { name: 'O nama', href: '/o-nama' },
  { name: 'Naši doktori', href: '/lijecnici' },
  { name: 'Novosti', href: '/blog' },
  { name: 'Kontakt', href: '/kontakt' },
  { name: 'Karijere', href: '/karijere' },
]

const legal = [
  { name: 'Privatnost', href: '/politika-privatnosti' },
  { name: 'Uvjeti korištenja', href: '/uvjeti-koristenja' },
  { name: 'Kolačići', href: '/politika-kolacica' },
]

export function Footer({ services: servicesProp = [] }: FooterProps) {
  // Build services list from props
  const services = useMemo(() => {
    return servicesProp.map((service) => ({
      name: typeof service.name === 'string'
        ? service.name
        : (service.name as Record<string, string>)?.['hr-HR'] || service.slug,
      href: `/usluge/${service.slug}`,
    }))
  }, [servicesProp])
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Subscribing...')

    // TODO: Implement actual newsletter subscription
    setTimeout(() => {
      setStatus('✓ Uspješno ste se pretplatili!')
      setEmail('')
      setTimeout(() => setStatus(''), 3000)
    }, 1000)
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Footer Content */}
        <div className="py-20">
          {/* Top Section - Brand & Newsletter */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-20 pb-20 border-b border-gray-800">
            {/* Left - Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-3xl font-bold mb-4 tracking-tighter font-serif">
                ATRIA
              </div>
              <p className="text-xl text-gray-400 mb-10 max-w-md leading-relaxed">
                Moderna medicina koja vas razumije. Vaše zdravlje je naša misija.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <a
                  href="mailto:info@atria.hr"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>info@atria.hr</span>
                </a>

                <a
                  href="tel:011234567"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>01 123 4567</span>
                </a>

                <div className="flex items-center gap-3 text-gray-400 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>Dugo Selo, Hrvatska</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:ml-auto lg:max-w-[500px]"
            >
              <h3 className="text-3xl font-bold mb-4 font-serif">Newsletter</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Primajte zdravstvene savjete, vijesti i posebne ponude direktno
                u svoj inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="relative mb-4">
                <input
                  type="email"
                  placeholder="Unesite vašu email adresu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-orangeCTA hover:shadow-lg rounded-full flex items-center justify-center transition-all"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.button>
              </form>

              {status && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-green-400"
                >
                  {status}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-sm font-semibold mb-6 tracking-wider uppercase">
                Usluge
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-sm font-semibold mb-6 tracking-wider uppercase">
                Brzi linkovi
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-sm font-semibold mb-6 tracking-wider uppercase">
                Pravno
              </h4>
              <ul className="space-y-3">
                {legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social & Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-sm font-semibold mb-6 tracking-wider uppercase">
                Pratite nas
              </h4>

              <div className="flex items-center gap-3 mb-8">
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/5 hover:bg-orangeCTA rounded-full flex items-center justify-center transition-all"
                >
                  <FaInstagram className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/5 hover:bg-orangeCTA rounded-full flex items-center justify-center transition-all"
                >
                  <FaFacebookF className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/5 hover:bg-orangeCTA rounded-full flex items-center justify-center transition-all"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </motion.a>
              </div>

              <div>
                <p className="text-sm font-semibold text-white mb-2">
                  Radno vrijeme
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  Pon - Pet: 8:00 - 20:00
                </p>
                <p className="text-sm text-gray-400">Sub: 9:00 - 14:00</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Poliklinika Atria. Sva prava
              pridržana.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Izrađeno sa</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="text-rose-500"
              >
                ❤
              </motion.span>
              <span>u Hrvatskoj</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
