'use client'

import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Particle {
  id: number
  content: string
  left: string
  top: string
  depthX: number // Max horizontal movement in pixels
  depthY: number // Max vertical movement in pixels
  blur: boolean
  size: string
  className: string
  duration: number // Ambient float duration in seconds
  rotateDir: number // 1 for clockwise, -1 for counter-clockwise
}

// Static definition of particles for Next.js SSR / hydration safety
const PARTICLES: Particle[] = [
  { id: 1, content: 'await prisma.lead.upsert({...})', left: '10%', top: '15%', depthX: -30, depthY: -35, blur: true, size: 'text-[13px]', className: 'text-neutral-950/[0.03] font-mono', duration: 12, rotateDir: 1 },
  { id: 2, content: 'const engine = useSpring()', left: '82%', top: '8%', depthX: 45, depthY: 45, blur: false, size: 'text-[13px]', className: 'text-neutral-400/[0.05] font-mono', duration: 15, rotateDir: -1 },
  { id: 3, content: 'target: "cloudflare-edge"', left: '5%', top: '55%', depthX: 25, depthY: -25, blur: false, size: 'text-[13px]', className: 'text-neutral-950/[0.02] font-mono', duration: 18, rotateDir: 1 },
  { id: 4, content: 'System.Bypass(active)', left: '76%', top: '65%', depthX: -40, depthY: 30, blur: true, size: 'text-[13px]', className: 'text-[#E30613]/[0.04] font-mono font-bold', duration: 14, rotateDir: -1 },
  { id: 5, content: 'latency: <200ms', left: '60%', top: '42%', depthX: -20, depthY: -20, blur: false, size: 'text-[13px]', className: 'text-neutral-950/[0.03] font-mono', duration: 16, rotateDir: 1 },
  { id: 6, content: '+', left: '22%', top: '8%', depthX: -50, depthY: 50, blur: false, size: 'text-[14px]', className: 'text-neutral-950/[0.06] font-light', duration: 10, rotateDir: 1 },
  { id: 7, content: '×', left: '72%', top: '78%', depthX: 35, depthY: -35, blur: true, size: 'text-[16px]', className: 'text-neutral-900/[0.04]', duration: 20, rotateDir: -1 },
  { id: 8, content: '□', left: '28%', top: '78%', depthX: -15, depthY: 15, blur: false, size: 'text-[13px]', className: 'text-neutral-400/[0.06]', duration: 14, rotateDir: 1 },
  { id: 9, content: 'sys.bypass.active = true', left: '15%', top: '48%', depthX: 35, depthY: 35, blur: false, size: 'text-[13px]', className: 'text-neutral-950/[0.02] font-mono', duration: 22, rotateDir: -1 },
  { id: 10, content: '—', left: '48%', top: '8%', depthX: 10, depthY: -10, blur: false, size: 'text-[20px]', className: 'text-neutral-300/[0.08]', duration: 13, rotateDir: 1 },
  { id: 11, content: 'const [modules] = useState()', left: '50%', top: '85%', depthX: -25, depthY: 25, blur: false, size: 'text-[13px]', className: 'text-neutral-400/[0.04] font-mono', duration: 17, rotateDir: 1 },
  { id: 12, content: '＋', left: '92%', top: '35%', depthX: 55, depthY: -55, blur: true, size: 'text-[14px]', className: 'text-neutral-950/[0.04]', duration: 12, rotateDir: -1 },
  { id: 13, content: 'edge.middleware.ts', left: '4%', top: '35%', depthX: -25, depthY: -25, blur: false, size: 'text-[13px]', className: 'text-neutral-950/[0.02] font-mono', duration: 19, rotateDir: 1 },
  { id: 14, content: '✖', left: '38%', top: '24%', depthX: -30, depthY: 30, blur: false, size: 'text-[13px]', className: 'text-[#E30613]/[0.03]', duration: 13, rotateDir: 1 },
  { id: 15, content: 'ROAS: +150%', left: '85%', top: '28%', depthX: 30, depthY: 30, blur: false, size: 'text-[13px]', className: 'text-neutral-950/[0.03] font-mono font-medium', duration: 21, rotateDir: -1 },
  { id: 16, content: 'Next.js App Router', left: '62%', top: '22%', depthX: -30, depthY: 30, blur: false, size: 'text-[13px]', className: 'text-neutral-950/[0.02] font-mono', duration: 16, rotateDir: 1 },
  { id: 17, content: 'prisma.lead.upsert', left: '42%', top: '70%', depthX: 40, depthY: -40, blur: false, size: 'text-[13px]', className: 'text-neutral-400/[0.04] font-mono', duration: 20, rotateDir: -1 },
  { id: 18, content: '+', left: '88%', top: '60%', depthX: -35, depthY: 35, blur: false, size: 'text-[15px]', className: 'text-neutral-950/[0.04]', duration: 11, rotateDir: 1 },
  { id: 19, content: 'mode: "system-bypass"', left: '18%', top: '88%', depthX: 30, depthY: 30, blur: false, size: 'text-[13px]', className: 'text-neutral-950/[0.02] font-mono', duration: 18, rotateDir: -1 },
  { id: 20, content: '×', left: '5%', top: '80%', depthX: -20, depthY: 20, blur: true, size: 'text-[16px]', className: 'text-neutral-400/[0.05]', duration: 14, rotateDir: 1 },
  { id: 21, content: '□', left: '94%', top: '84%', depthX: 25, depthY: -25, blur: false, size: 'text-[13px]', className: 'text-neutral-950/[0.04]', duration: 15, rotateDir: -1 },
  { id: 22, content: 'API.bridge.init()', left: '32%', top: '35%', depthX: -15, depthY: 15, blur: false, size: 'text-[13px]', className: 'text-neutral-400/[0.05] font-mono', duration: 19, rotateDir: 1 },
  { id: 23, content: '＋', left: '55%', top: '52%', depthX: 20, depthY: -20, blur: true, size: 'text-[13px]', className: 'text-neutral-950/[0.04]', duration: 13, rotateDir: -1 },
  { id: 24, content: 'cloudflare.edge.routing', left: '72%', top: '92%', depthX: -45, depthY: 45, blur: false, size: 'text-[13px]', className: 'text-neutral-950/[0.02] font-mono', duration: 23, rotateDir: 1 },
  { id: 25, content: '✖', left: '85%', top: '50%', depthX: 30, depthY: -30, blur: false, size: 'text-[13px]', className: 'text-neutral-300/[0.08]', duration: 12, rotateDir: 1 },
  { id: 26, content: 'zero-downtime', left: '38%', top: '92%', depthX: -35, depthY: 35, blur: false, size: 'text-[13px]', className: 'text-[#E30613]/[0.03] font-mono', duration: 15, rotateDir: -1 }
]

export default function BackgroundMatrix() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics variables for ultra-smooth luxury inertia
  const springConfig = { damping: 30, stiffness: 70, mass: 0.8 }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize client coordinates relative to window width and height [-0.5, 0.5]
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Generate smooth spring-based parallax coordinate transforms for each particle
  const particlePositions = PARTICLES.map(p => {
    const rawX = useTransform(mouseX, [-0.5, 0.5], [-p.depthX, p.depthX])
    const rawY = useTransform(mouseY, [-0.5, 0.5], [-p.depthY, p.depthY])
    const px = useSpring(rawX, springConfig)
    const py = useSpring(rawY, springConfig)
    return { x: px, y: py }
  })

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {PARTICLES.map((p, idx) => (
        <motion.div
          key={p.id}
          style={{
            x: particlePositions[idx].x,
            y: particlePositions[idx].y,
            left: p.left,
            top: p.top,
          }}
          className={`absolute pointer-events-none select-none ${p.size} ${p.blur ? 'blur-[0.75px]' : ''} will-change-transform`}
        >
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, p.rotateDir * 8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={p.className}
          >
            {p.content}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
