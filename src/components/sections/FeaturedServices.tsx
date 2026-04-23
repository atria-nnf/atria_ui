'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BsArrowRight } from 'react-icons/bs'

// Medical services for Poliklinika Atria
const services = [
  {
    title: 'Ginekologija',
    subtitle: 'Specijalistički pregledi i ultrazvuk',
    description: 'Kompletan ginekološki pregled',
    image: '/images/longTerm.webp',
    link: '/usluge/ginekologija',
  },
  {
    title: 'Kardiologija',
    subtitle: 'Dijagnostika srca i krvnih žila',
    description: 'EKG, Holter, ultrazvuk srca',
    image: '/images/dayRent.webp',
    link: '/usluge/kardiologija',
  },
  {
    title: 'Dermatologija',
    subtitle: 'Dijagnostika i liječenje kože',
    description: 'Dermatoskopija i estetika',
    image: '/images/meetingRoom.webp',
    link: '/usluge/dermatologija',
  },
  {
    title: 'Ultrazvuk',
    subtitle: 'Dijagnostička obrada',
    description: 'Abdomen, štitnjača, dojke',
    image: '/images/reception.webp',
    link: '/usluge/ultrazvuk',
  },
  {
    title: 'Laboratorij',
    subtitle: 'Laboratorijska dijagnostika',
    description: 'Krvne pretrage i analize',
    image: '/images/businessClub.webp',
    link: '/usluge/laboratorij',
  },
]

export function FeaturedServices() {
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
            Naše usluge
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Širok spektar medicinskih usluga s najnovijom opremom i stručnim
            liječnicima
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="space-y-6">
          {/* First Row - 2 items */}
          <div className="grid md:grid-cols-2 gap-6">
            {services.slice(0, 2).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={service.link}
                  className="group block relative rounded-2xl overflow-hidden h-96 hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/80 text-sm font-medium mb-2">
                      {service.subtitle}
                    </p>
                    <h3 className="text-white font-bold text-2xl mb-2">
                      {service.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 font-semibold">
                        {service.description}
                      </span>
                      <BsArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Second Row - 3 items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(2).map((service, index) => (
              <motion.div
                key={index + 2}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 2) * 0.1 }}
              >
                <Link
                  href={service.link}
                  className="group block relative rounded-2xl overflow-hidden h-96 hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/80 text-sm font-medium mb-2">
                      {service.subtitle}
                    </p>
                    <h3 className="text-white font-bold text-2xl mb-2">
                      {service.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 font-semibold">
                        {service.description}
                      </span>
                      <BsArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/usluge"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-color text-white rounded-full font-semibold hover:bg-brand-color/90 transition-colors"
          >
            Sve usluge
            <BsArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
