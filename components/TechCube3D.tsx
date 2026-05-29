'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'

interface TechCube3DProps {
  lang?: string
}

const textShadow = { textShadow: '0 2px 4px rgba(0,0,0,0.95)' }
const redShadow = { textShadow: '0 0 8px rgba(227,6,19,0.8), 0 1px 3px rgba(0,0,0,0.9)' }
const glowEdge = { filter: 'drop-shadow(0 0 8px #E30613)' }

const CUBE = 320       // px — strict square
const HALF = CUBE / 2  // 160px — exact mathematical half

export default function TechCube3D({ lang = 'cs' }: TechCube3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spring = { damping: 22, stiffness: 55, mass: 1 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [55, -55]), spring)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-55, 55]), spring)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - r.left) / r.width - 0.5)
    mouseY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mouseX.set(0); mouseY.set(0) }

  const face = (transform: string, header: string, label: string, children: React.ReactNode, footer: string, coord: string) => (
    <div
      className="absolute inset-0 backdrop-blur-md bg-neutral-950/5 border border-[#E30613]/20 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] flex flex-col justify-between p-[18px]"
      style={{ transform, backfaceVisibility: 'visible', transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 border border-[#E30613] pointer-events-none" style={glowEdge} />
      <div className="flex justify-between font-mono text-[13px] text-[#E30613] tracking-widest" style={redShadow}>
        <span>{header}</span><span>{label}</span>
      </div>
      <div className="flex-1 flex items-center">{children}</div>
      <div className="flex justify-between font-mono text-[13px] text-neutral-300" style={textShadow}>
        <span>{footer}</span><span className="text-[#E30613]">{coord}</span>
      </div>
    </div>
  )

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative select-none cursor-grab active:cursor-grabbing"
      style={{ width: CUBE, height: CUBE, perspective: 1400 }}
    >
      {/* Outer: mouse tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', width: CUBE, height: CUBE }}
        className="relative will-change-transform"
      >
        {/* Inner: ambient rotation */}
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="absolute inset-0"
        >
          {/* CORE GLOW AURA */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
          >
            {/* Massive Ambient Glow */}
            <div
              className="absolute w-[800px] h-[800px] rounded-full blur-[120px] animate-pulse"
              style={{ background: 'radial-gradient(circle, rgba(227,6,19,0.35) 0%, rgba(227,6,19,0.08) 40%, transparent 70%)', animationDuration: '4s' }}
            />
            {/* Intense Core Glow */}
            <div
              className="absolute w-[300px] h-[300px] rounded-full blur-[50px]"
              style={{ background: 'radial-gradient(circle, rgba(227,6,19,0.6) 0%, transparent 80%)' }}
            />
            
            <motion.div
              animate={{ rotateY: [360, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="relative filter drop-shadow-[0_0_14px_rgba(227,6,19,0.6)]"
              style={{ width: 80, height: 80 }}
            >
              <Image src="/logomail.png" alt="L-Code" fill priority className="object-contain" />
            </motion.div>
          </div>

          {/* FRONT */}
          {face(
            `translateZ(${HALF}px)`,
            '[ FACE_01 // FRONT ]', 'L-CODE',
            <div className="relative w-full h-full opacity-80 mix-blend-screen"><Image src="/logo.png" alt="L-Code Logo" fill className="object-contain p-8" /></div>,
            'SYSTEM', 'ACTIVE'
          )}

          {/* BACK */}
          {face(
            `rotateY(180deg) translateZ(${HALF}px)`,
            '[ FACE_02 // BACK ]', 'L-CODE',
            <div className="relative w-full h-full opacity-80 mix-blend-screen"><Image src="/logo.png" alt="L-Code Logo" fill className="object-contain p-8" /></div>,
            'SYSTEM', 'ACTIVE'
          )}

          {/* LEFT */}
          {face(
            `rotateY(-90deg) translateZ(${HALF}px)`,
            '[ FACE_03 // LEFT ]', 'L-CODE',
            <div className="relative w-full h-full opacity-80 mix-blend-screen"><Image src="/logo.png" alt="L-Code Logo" fill className="object-contain p-8" /></div>,
            'SYSTEM', 'ACTIVE'
          )}

          {/* RIGHT */}
          {face(
            `rotateY(90deg) translateZ(${HALF}px)`,
            '[ FACE_04 // RIGHT ]', 'L-CODE',
            <div className="relative w-full h-full opacity-80 mix-blend-screen"><Image src="/logo.png" alt="L-Code Logo" fill className="object-contain p-8" /></div>,
            'SYSTEM', 'ACTIVE'
          )}

          {/* TOP */}
          {face(
            `rotateX(90deg) translateZ(${HALF}px)`,
            '[ FACE_05 // TOP ]', 'L-CODE',
            <div className="relative w-full h-full opacity-80 mix-blend-screen"><Image src="/logo.png" alt="L-Code Logo" fill className="object-contain p-8" /></div>,
            'SYSTEM', 'ACTIVE'
          )}

          {/* BOTTOM */}
          {face(
            `rotateX(-90deg) translateZ(${HALF}px)`,
            '[ FACE_06 // BOT ]', 'L-CODE',
            <div className="relative w-full h-full opacity-80 mix-blend-screen"><Image src="/logo.png" alt="L-Code Logo" fill className="object-contain p-8" /></div>,
            'SYSTEM', 'ACTIVE'
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
