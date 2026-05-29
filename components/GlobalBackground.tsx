'use client'

import { useEffect, useRef } from 'react'

const CODE_SNIPPETS = [
  'const edge = await fetch()',
  'npm run build',
  'export default function()',
  'await syncInventory()',
  'Redis.set(key, val)',
  'SELECT * FROM orders',
  'git push origin main',
  '<Headless />',
  'useEffect(() => {})',
  'API_KEY=***',
  'docker build .',
  'prisma migrate dev',
  'vercel deploy',
  'return <JSX />',
  'async/await',
  'Edge Runtime',
  'type Props = {}',
  '{ data } = useSWR()',
  'revalidatePath("/")',
  'fetch("/api/sync")',
  'shoptet.getProduct()',
  '200 OK',
  'TTFB: 18ms',
  'LCP: 0.9s',
  'import { motion }',
  'cache: "force-cache"',
  '99.9% uptime',
  'next/image',
  'zod.parse(input)',
]

interface FloatingCode {
  text: string
  x: number; y: number; z: number
  vx: number; vy: number; vz: number
  rotX: number; rotY: number; rotZ: number
  vrX: number; vrY: number; vrZ: number
  opacity: number; size: number; color: string
  phase: number
}

interface Pulse {
  pathIdx: number
  pos: number       // 0→1 along path
  speed: number
  active: boolean
  timer: number
  interval: number
}

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let tick = 0

    /* ─── helpers ─── */
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(document.body.scrollHeight, window.innerHeight)
    }
    resize()
    window.addEventListener('resize', resize)

    /* ─── PCB node grid ─── */
    const GRID = 70   // px between grid points
    type P2 = { x: number; y: number }

    const snapX = (v: number) => Math.round(v / GRID) * GRID
    const snapY = (v: number) => Math.round(v / GRID) * GRID

    interface Trace { pts: P2[] }

    const buildTraces = (): Trace[] => {
      const W = canvas.width, H = canvas.height
      const traces: Trace[] = []

      for (let attempt = 0; attempt < 200; attempt++) {
        const pts: P2[] = []
        let cx = snapX(Math.random() * W)
        let cy = snapY(Math.random() * H)
        pts.push({ x: cx, y: cy })

        const segs = 2 + Math.floor(Math.random() * 6)
        let lastDir = -1          // 0=H 1=V  (no 180° turn)
        for (let s = 0; s < segs; s++) {
          // prefer alternating H/V for PCB look
          const goH = lastDir === 1 ? true : lastDir === 0 ? false : Math.random() > 0.5
          lastDir = goH ? 0 : 1
          const steps = 1 + Math.floor(Math.random() * 7)
          const dir = Math.random() > 0.5 ? 1 : -1
          if (goH) cx += dir * steps * GRID
          else cy += dir * steps * GRID
          cx = Math.max(0, Math.min(W, cx))
          cy = Math.max(0, Math.min(H, cy))
          pts.push({ x: cx, y: cy })
        }
        if (pts.length >= 2) traces.push({ pts })
      }
      return traces
    }

    /* path length + point-on-path */
    const pLen = (pts: P2[]) => {
      let l = 0
      for (let i = 1; i < pts.length; i++)
        l += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
      return l
    }
    const pAt = (pts: P2[], t: number): P2 => {
      const total = pLen(pts)
      let d = t * total
      for (let i = 1; i < pts.length; i++) {
        const seg = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
        if (d <= seg) {
          const f = seg === 0 ? 0 : d / seg
          return {
            x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f,
            y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f
          }
        }
        d -= seg
      }
      return pts[pts.length - 1]
    }

    let traces = buildTraces()

    /* ─── Pulses (one per trace, staggered) ─── */
    const pulses: Pulse[] = traces.map((_, i) => ({
      pathIdx: i,
      pos: 0,
      speed: 0.0015 + Math.random() * 0.003,
      active: false,
      timer: Math.random() * 300,
      interval: 80 + Math.random() * 250,
    }))

    /* ─── Floating 3D code ─── */
    const mkCodes = (): FloatingCode[] => CODE_SNIPPETS.map(text => ({
      text,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1600 - 400,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.1,
      vz: (Math.random() - 0.5) * 0.2,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      vrX: (Math.random() - 0.5) * 0.0015,
      vrY: (Math.random() - 0.5) * 0.002,
      vrZ: (Math.random() - 0.5) * 0.001,
      opacity: 0.1 + Math.random() * 0.2,
      size: 13 + Math.random() * 12,
      color: Math.random() > 0.72 ? '#E30613' : '#ffffff',
      phase: Math.random() * Math.PI * 2,
    }))

    const codes = mkCodes()

    /* ─── Draw ─── */
    const draw = () => {
      tick++
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      /* PCB traces */
      for (const tr of traces) {
        ctx.beginPath()
        ctx.moveTo(tr.pts[0].x, tr.pts[0].y)
        for (let i = 1; i < tr.pts.length; i++)
          ctx.lineTo(tr.pts[i].x, tr.pts[i].y)
        ctx.strokeStyle = 'rgba(227,6,19,0.18)'
        ctx.lineWidth = 1.2
        ctx.stroke()

        /* junction pads */
        for (const p of tr.pts) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(227,6,19,0.28)'
          ctx.fill()

          /* pad ring */
          ctx.beginPath()
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(227,6,19,0.10)'
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      /* electric pulses */
      for (const pu of pulses) {
        pu.timer++
        if (!pu.active && pu.timer >= pu.interval) {
          pu.active = true
          pu.pos = 0
          pu.timer = 0
        }
        if (!pu.active) continue

        pu.pos += pu.speed
        if (pu.pos >= 1) { pu.active = false; pu.pos = 0; continue }

        const pts = traces[pu.pathIdx].pts
        const head = pAt(pts, pu.pos)

        /* glow halo */
        const halo = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 22)
        halo.addColorStop(0, 'rgba(255,80,60,0.9)')
        halo.addColorStop(0.25, 'rgba(227,6,19,0.5)')
        halo.addColorStop(1, 'rgba(227,6,19,0)')
        ctx.beginPath()
        ctx.arc(head.x, head.y, 22, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        /* bright core */
        ctx.beginPath()
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = '#ff9999'
        ctx.fill()

        /* lightning tail */
        const tailT = Math.max(0, pu.pos - 0.10)
        const steps = 10
        ctx.beginPath()
        ctx.moveTo(head.x, head.y)
        for (let s = steps; s >= 1; s--) {
          const t2 = tailT + (pu.pos - tailT) * (s / steps)
          const p = pAt(pts, t2)
          ctx.lineTo(p.x + (Math.random() - 0.5) * 5,
            p.y + (Math.random() - 0.5) * 5)
        }
        const tailPt = pAt(pts, tailT)
        const tailGrad = ctx.createLinearGradient(tailPt.x, tailPt.y, head.x, head.y)
        tailGrad.addColorStop(0, 'rgba(227,6,19,0)')
        tailGrad.addColorStop(1, 'rgba(227,6,19,0.75)')
        ctx.strokeStyle = tailGrad
        ctx.lineWidth = 2
        ctx.stroke()
      }

      /* 3‑D floating code */
      const FOV = 800
      for (const c of codes) {
        c.x += c.vx
        c.y += c.vy + Math.sin(tick * 0.01 + c.phase) * 0.2
        c.z += c.vz
        c.rotX += c.vrX; c.rotY += c.vrY; c.rotZ += c.vrZ

        if (c.x < -400) c.x = W + 400
        if (c.x > W + 400) c.x = -400
        if (c.y < -400) c.y = H + 400
        if (c.y > H + 400) c.y = -400
        if (c.z < -400) c.z = 1200
        if (c.z > 1200) c.z = -400

        const scale = FOV / (FOV + c.z)
        const px = (c.x - W / 2) * scale + W / 2
        const py = (c.y - H / 2) * scale + H / 2
        const fs = c.size * scale

        let depthAlpha = 1
        if (c.z > 800) depthAlpha = Math.max(0, 1 - (c.z - 800) / 400)
        else if (c.z < -200) depthAlpha = Math.max(0, 1 - (-200 - c.z) / 200)
        const alpha = c.opacity * depthAlpha

        ctx.save()
        ctx.translate(px, py)
        ctx.transform(
          Math.cos(c.rotY),
          Math.sin(c.rotX) * Math.sin(c.rotY),
          -Math.sin(c.rotY) * Math.cos(c.rotZ) + Math.cos(c.rotX) * Math.sin(c.rotZ),
          Math.cos(c.rotX) * Math.cos(c.rotZ) + Math.sin(c.rotX) * Math.sin(c.rotY) * Math.sin(c.rotZ),
          0, 0
        )

        ctx.font = `600 ${fs}px "Courier New", monospace`
        const tw = ctx.measureText(c.text).width
        const bw = tw + 14 * scale, bh = fs + 10 * scale

        ctx.globalAlpha = alpha * 0.4
        ctx.fillStyle = c.color === '#E30613' ? 'rgba(227,6,19,0.15)' : 'rgba(10,10,10,0.6)'
        ctx.strokeStyle = c.color === '#E30613' ? 'rgba(227,6,19,0.4)' : 'rgba(255,255,255,0.1)'
        ctx.lineWidth = 0.5 * scale
        ctx.fillRect(-bw / 2, -bh / 2, bw, bh)
        ctx.strokeRect(-bw / 2, -bh / 2, bw, bh)

        ctx.globalAlpha = alpha
        ctx.fillStyle = c.color
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(c.text, 0, 0)

        ctx.restore()
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => { resize(); traces = buildTraces() }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
