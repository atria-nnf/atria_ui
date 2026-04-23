'use client'

import { motion } from 'framer-motion'
import {
  Heart,
  Stethoscope,
  Clock,
  Shield,
  Users,
  Award,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: Heart,
    title: 'Individualan pristup',
    description: 'Svaki pacijent je jedinstven',
  },
  {
    icon: Stethoscope,
    title: 'Stručni liječnici',
    description: 'Tim iskusnih specijalista',
  },
  {
    icon: Clock,
    title: 'Brzi termini',
    description: 'Bez dugih čekanja na pregled',
  },
  {
    icon: Shield,
    title: 'Moderna oprema',
    description: 'Najnovija dijagnostička tehnologija',
  },
  {
    icon: Users,
    title: 'Obiteljska atmosfera',
    description: 'Topao i prijateljski pristup',
  },
  {
    icon: Award,
    title: 'Kvaliteta usluge',
    description: 'Visoki standardi medicinske skrbi',
  },
]

const stats = [
  { number: '10+', label: 'Godina iskustva' },
  { number: '15', label: 'Specijalista' },
  { number: '5000+', label: 'Zadovoljnih pacijenata' },
  { number: '20+', label: 'Medicinskih usluga' },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 font-serif"
          >
            Zašto Poliklinika Atria?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Vaše zdravlje je naš prioritet - zato biramo samo najbolje
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-brand-color mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all"
              >
                <Icon className="w-12 h-12 text-brand-color mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
