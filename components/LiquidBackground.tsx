'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LiquidBackgroundProps {
  isDarkMode?: boolean;
}

type Orb = { x: number; y: number; vx: number; vy: number; r: number; color: string; opacity: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number };

export const LiquidBackground = ({ isDarkMode = true }: LiquidBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Orbs — drift slowly across screen
    const orbs: Orb[] = [
      { x: 0.25, y: 0.35, vx: 0.00015, vy: 0.0001,  r: 0.55, color: '#E30613', opacity: 0.18 },
      { x: 0.7,  y: 0.6,  vx: -0.0001, vy: 0.00012, r: 0.45, color: '#8B0000', opacity: 0.22 },
      { x: 0.5,  y: 0.15, vx: 0.00008, vy: 0.00018, r: 0.35, color: '#ff1a2a', opacity: 0.12 },
      { x: 0.85, y: 0.8,  vx: -0.00013, vy: -0.0001, r: 0.40, color: '#E30613', opacity: 0.15 },
      { x: 0.1,  y: 0.8,  vx: 0.0001,  vy: -0.00015, r: 0.30, color: '#600010', opacity: 0.20 },
    ];

    // Floating particles
    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: -Math.random() * 0.0005 - 0.0002,
      life: Math.random() * 200,
      maxLife: 150 + Math.random() * 100,
      size: Math.random() * 2 + 0.5,
    }));

    const draw = () => {
      t++;
      const W = canvas.width;
      const H = canvas.height;

      // Deep dark background
      ctx.globalAlpha = 0.92;
      ctx.fillStyle = '#070707';
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      // Draw orbs
      ctx.globalCompositeOperation = 'screen';
      for (const orb of orbs) {
        // Drift
        orb.x += orb.vx + Math.sin(t * 0.003 + orb.r) * 0.0001;
        orb.y += orb.vy + Math.cos(t * 0.002 + orb.r) * 0.0001;
        if (orb.x < 0 || orb.x > 1) orb.vx *= -1;
        if (orb.y < 0 || orb.y > 1) orb.vy *= -1;

        const px = orb.x * W;
        const py = orb.y * H;
        const rad = orb.r * Math.max(W, H) * (0.6 + Math.sin(t * 0.004 + orb.r) * 0.08);

        const grad = ctx.createRadialGradient(px, py, 0, px, py, rad);
        grad.addColorStop(0, orb.color + Math.round(orb.opacity * 255).toString(16).padStart(2, '0'));
        grad.addColorStop(0.4, orb.color + '18');
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles
      ctx.globalCompositeOperation = 'screen';
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife || p.y < -0.05) {
          p.x = Math.random();
          p.y = 1.05;
          p.life = 0;
          p.maxLife = 150 + Math.random() * 100;
          p.vx = (Math.random() - 0.5) * 0.0003;
          p.vy = -Math.random() * 0.0004 - 0.0001;
        }
        const lifeRatio = Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.globalAlpha = lifeRatio * 0.5;
        ctx.fillStyle = Math.random() > 0.7 ? '#E30613' : '#fff';
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.size * lifeRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      // Subtle grid
      ctx.strokeStyle = 'rgba(255,255,255,0.022)';
      ctx.lineWidth = 0.5;
      const g = 80;
      for (let x = 0; x < W; x += g) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += g) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Vignette
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, 'rgba(0,0,0,0.75)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isDarkMode]);

  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </motion.div>
  );
};
