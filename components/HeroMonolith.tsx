'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Code, Cpu, Network } from 'lucide-react'
import StageLighting from './StageLighting'
import { QuantumSingularity } from './QuantumSingularity'

interface HeroMonolithProps {
  lang?: string
}

const ease = [0.16, 1, 0.3, 1]

// Canvas removed as per user request



export default function HeroMonolith({ lang = 'cs' }: HeroMonolithProps) {
  const isEn = lang === 'en'
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const [offsets, setOffsets] = useState<string[]>(['0%', '0%', '0%', '0%'])

  useEffect(() => {
    setOffsets([
      `${(Math.random() * 30 - 15).toFixed(1)}%`,
      `${(Math.random() * 30 - 15).toFixed(1)}%`,
      `${(Math.random() * 30 - 15).toFixed(1)}%`,
      `${(Math.random() * 30 - 15).toFixed(1)}%`,
    ])
  }, [])

  return (
    <section style={{ position: 'relative', zIndex: 20, width: '100%', minHeight: '100svh', overflow: 'visible', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'transparent' }}>

      {/* Animated canvas background removed */}

      {/* Corner accents */}
      {[
        { top: 88, left: 32, borderTop: '1px solid', borderLeft: '1px solid' },
        { top: 88, right: 32, borderTop: '1px solid', borderRight: '1px solid' },
        { bottom: 32, left: 32, borderBottom: '1px solid', borderLeft: '1px solid' },
        { bottom: 32, right: 32, borderBottom: '1px solid', borderRight: '1px solid' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 40, height: 40, borderColor: 'rgba(227,6,19,0.4)', pointerEvents: 'none', zIndex: 10, ...s }} />
      ))}

      {/* HUD coords */}
      <div style={{ position: 'absolute', top: 92, left: '50%', transform: 'translateX(-50%)', fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.25em', zIndex: 10, whiteSpace: 'nowrap' }}>
        50.0755°N · 14.4378°E · PRAGUE, CZ
      </div>

      {/* LEFT — two red diagonal stripes */}
      <motion.div
        initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 220, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}
      >
        {/* Stripe 1 */}
        <div style={{
          position: 'absolute',
          left: -80,
          top: '10%',
          width: 260,
          height: 6,
          background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.55), rgba(227,6,19,0.35), transparent)',
          transform: 'rotate(-35deg)',
          transformOrigin: 'left center',
          filter: 'blur(0.5px)',
        }} />
        {/* Stripe 2 */}
        <div style={{
          position: 'absolute',
          left: -80,
          top: 'calc(10% + 40px)',
          width: 260,
          height: 3,
          background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.35), rgba(227,6,19,0.2), transparent)',
          transform: 'rotate(-35deg)',
          transformOrigin: 'left center',
          filter: 'blur(0.5px)',
        }} />
      </motion.div>

      {/* RIGHT — two white diagonal stripes */}
      <motion.div
        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 220, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}
      >
        {/* Stripe 1 */}
        <div style={{
          position: 'absolute',
          right: -80,
          top: '15%',
          width: 260,
          height: 6,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), rgba(255,255,255,0.08), transparent)',
          transform: 'rotate(-35deg)',
          transformOrigin: 'right center',
          filter: 'blur(0.5px)',
        }} />
        {/* Stripe 2 */}
        <div style={{
          position: 'absolute',
          right: -80,
          top: 'calc(15% + 40px)',
          width: 260,
          height: 3,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), rgba(255,255,255,0.04), transparent)',
          transform: 'rotate(-35deg)',
          transformOrigin: 'right center',
          filter: 'blur(0.5px)',
        }} />
      </motion.div>

      {/* 3D Glass Entity overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 25, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <StageLighting />
        <div style={{ transform: 'scale(1.2)', width: '100%', height: '100%', maxWidth: '800px', maxHeight: '800px', pointerEvents: 'auto' }}>
          <QuantumSingularity text="" />
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 20, width: '100%', maxWidth: 1200, margin: '0 auto', padding: 'clamp(5rem, 12vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', pointerEvents: 'none' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: '2.5rem', justifyContent: 'center' }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite', boxShadow: '0 0 10px rgba(255,255,255,0.8)' }} />
          <span style={{ fontFamily: 'var(--font-display, "Bebas Neue", sans-serif)', fontSize: 24, letterSpacing: '0.15em', color: '#FFFFFF', textTransform: 'uppercase', fontWeight: 600 }}>
            {isEn ? 'Full-Stack E-Commerce Development' : 'Full-Stack E-Commerce Development'}
          </span>
        </motion.div>

        {/* Massive Text is now rendered via the 3D Shader for refractive waving */}

      </div>

      {/* Wrap main content to restore pointer events where needed */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-buttons { pointer-events: auto; }
      ` }} />

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
        onClick={() => scrollTo('sluzby')}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: 'var(--font-display, "Bebas Neue", sans-serif)', fontSize: 16, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, #E30613)' }} />
      </motion.button>
    </section>
  )
}
