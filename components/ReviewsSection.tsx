'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name: "Jaroslav Hamáček",
    company: "FITNESS77",
    text: "L-Code Dynamics nám postavili e-shop, který konečně šlape na 100 %. Rychlost načítání je neuvěřitelná a konverze nám stouply hned první měsíc o 30 %. Profíci na svém místě.",
  },
  {
    name: "Eva Langerová",
    company: "Fotofiltry",
    text: "Měli jsme specifické požadavky na dynamické vizuály a frontend. Kluci z L-Code všechno integrovali naprosto bezchybně. Úžasný design a perfektní komunikace po celou dobu projektu.",
  },
  {
    name: "Viktor M.",
    company: "Shopum.sk",
    text: "Potřebovali jsme custom skript na složitou synchronizaci skladu a automatizaci objednávek, se kterou si jinde nevěděli rady. Tady to vyřešili rychle a efektivně. Skript běží perfektně.",
  },
  {
    name: "Tomáš Kratochvíl",
    company: "AutoMoto Díly",
    text: "Přechod na novou architekturu proběhl bez výpadku a tržby rostou. Oceňuji hlavně ten technický přesah a to, že nám nic nenutí, ale opravdu hledají nejlepší řešení pro náš byznys.",
  }
]

interface ReviewsProps {
  renderRedWord: (text: string) => React.ReactNode
}

export default function ReviewsSection({ renderRedWord }: ReviewsProps) {
  return (
    <section id="recenze" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/[0.04]">
      <div className="mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] text-[#E30613] tracking-[0.3em] uppercase block mb-3"
        >
          Co o nás říkají
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-extrabold tracking-tight uppercase text-white"
        >
          {renderRedWord("Hodnocení klientů")}
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col justify-between hover:bg-white/10 transition-colors duration-300"
          >
            <div>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="fill-[#E30613] text-[#E30613]" />
                ))}
              </div>
              <p className="text-white font-light text-base md:text-lg italic leading-relaxed mb-8">
                "{review.text}"
              </p>
            </div>
            <div className="border-t border-white/10 pt-4 flex flex-col">
              <span className="text-white font-light font-display tracking-wide uppercase">{review.name}</span>
              <span className="text-[#E30613] font-mono text-xs tracking-wider uppercase mt-1">{review.company}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
