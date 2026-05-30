'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Code, Cpu, Network } from 'lucide-react'

interface HeroMonolithProps {
  lang?: string
}

const ease = [0.16, 1, 0.3, 1]

export default function HeroMonolith({ lang = 'cs' }: HeroMonolithProps) {
  const isEn = lang === 'en'
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section 
      style={{ position: 'relative', zIndex: 20, width: '100%', height: '100vh', overflow: 'visible', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'transparent' }}
    >
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
      <div className="font-mono text-white/20" style={{ position: 'absolute', top: 92, left: '50%', transform: 'translateX(-50%)', fontSize: 13, letterSpacing: '0.25em', zIndex: 10, whiteSpace: 'nowrap' }}>
        50.0755°N · 14.4378°E · PRAGUE, CZ
      </div>

      {/* LEFT — two red diagonal stripes */}
      <motion.div
        initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 220, pointerEvents: 'none', zIndex: 5, overflow: 'hidden', willChange: 'transform, opacity' }}
      >
        <div style={{ position: 'absolute', left: -80, top: '10%', width: 260, height: 6, background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.55), rgba(227,6,19,0.35), transparent)', transform: 'rotate(-35deg)', transformOrigin: 'left center', filter: 'blur(0.5px)' }} />
        <div style={{ position: 'absolute', left: -80, top: 'calc(10% + 40px)', width: 260, height: 3, background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.35), rgba(227,6,19,0.2), transparent)', transform: 'rotate(-35deg)', transformOrigin: 'left center', filter: 'blur(0.5px)' }} />
      </motion.div>

      {/* RIGHT — two white diagonal stripes */}
      <motion.div
        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 220, pointerEvents: 'none', zIndex: 5, overflow: 'hidden', willChange: 'transform, opacity' }}
      >
        <div style={{ position: 'absolute', right: -80, top: '15%', width: 260, height: 6, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), rgba(255,255,255,0.08), transparent)', transform: 'rotate(-35deg)', transformOrigin: 'right center', filter: 'blur(0.5px)' }} />
        <div style={{ position: 'absolute', right: -80, top: 'calc(15% + 40px)', width: 260, height: 3, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), rgba(255,255,255,0.04), transparent)', transform: 'rotate(-35deg)', transformOrigin: 'right center', filter: 'blur(0.5px)' }} />
      </motion.div>

      {/* Static background lighting replacing 3D WebGL */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(circle at center, rgba(227,6,19,0.15) 0%, rgba(227,6,19,0.02) 40%, transparent 70%)', mixBlendMode: 'screen' }} />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 30, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', pointerEvents: 'none' }}>

        {/* Eyebrow */}
        <div
          className="animate-hero-fade-up"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: '2rem', justifyContent: 'center', willChange: 'transform, opacity' }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite', boxShadow: '0 0 10px rgba(255,255,255,0.8)' }} />
          <h1 className="text-white font-display uppercase font-semibold m-0" style={{ fontSize: 24, letterSpacing: '0.15em' }}>
            {isEn ? 'Full-Stack E-Commerce Development' : 'Full-Stack E-Commerce Development'}
          </h1>
        </div>

        {/* Massive NIKE Style Typography (Parallax removed) */}
        <div className="flex flex-col items-center justify-center pointer-events-auto">
          {/* L-CODE (White) */}
          <div
            style={{ willChange: 'transform, opacity' }}
            className="animate-hero-left animation-delay-100 text-[clamp(4rem,16vw,12.8rem)] font-display font-black leading-none text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] select-none"
          >
            L-CODE
          </div>
          
          {/* DYNAMICS (Red) */}
          <div
            style={{ willChange: 'transform, opacity' }}
            className="animate-hero-left animation-delay-250 text-[clamp(4rem,16vw,12.8rem)] font-display font-black leading-none text-[#E30613] tracking-tighter -mt-[0.25em] drop-shadow-[0_0_25px_rgba(227,6,19,0.5)] select-none"
          >
            DYNAMICS
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
        onClick={() => scrollTo('sluzby')}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', pointerEvents: 'auto' }}
      >
        <span className="text-white/20 font-display uppercase" style={{ fontSize: 16, letterSpacing: '0.2em' }}>scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, #E30613)' }} />
      </motion.button>
    </section>
  )
}
