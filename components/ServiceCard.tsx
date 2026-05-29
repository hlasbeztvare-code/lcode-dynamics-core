'use client'

import React from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  tag: string
}

export default function ServiceCard({ title, description, icon, tag }: ServiceCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Track cursor position within the card for reactive hover effect
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl bg-white border border-gray-100 p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between h-full min-h-[250px]"
    >
      {/* Light Inner Radial Glow Spot */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              180px circle at ${mouseX}px ${mouseY}px,
              rgba(227, 6, 19, 0.04) 0%,
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Outer Border Highlight Spot (CSS Mask border effect) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              160px circle at ${mouseX}px ${mouseY}px,
              #E30613 0%,
              rgba(227, 6, 19, 0.2) 50%,
              transparent 100%
            )
          `,
          maskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
          WebkitMaskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full gap-8">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700 group-hover:bg-[#E30613]/5 group-hover:text-[#E30613] transition-colors duration-500">
            {icon}
          </div>
          <span className="font-mono text-[13px] text-gray-400 tracking-[0.2em] uppercase">{tag}</span>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-gray-900 mb-2 group-hover:text-[#E30613] transition-colors duration-500">
            {title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed font-light">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
