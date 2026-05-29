'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function StageLighting({ 
  inverted = false, 
  downward = false 
}: { 
  inverted?: boolean; 
  downward?: boolean; 
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  // Colors based on inverted prop
  const leftColor = inverted ? '255,255,255' : '227,6,19';
  const rightColor = inverted ? '227,6,19' : '255,255,255';
  
  // Positioning based on downward prop
  const yPosPrefix = downward ? 'top' : 'bottom';
  const yGradientPos = downward ? 'top' : 'bottom';

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 10 }}>
      
      {/* SVG Smoke Filter for ambient fog */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="fog">
          <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="4" seed="1">
            <animate attributeName="baseFrequency" values="0.008;0.012;0.008" dur="20s" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1" />
          <feDisplacementMap in="SourceGraphic" scale="50" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* LEFT LIGHT: Diffused Ambient Wash */}
      <motion.div
        animate={{ opacity: [0.6, 0.9, 0.7, 0.8, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          [yPosPrefix]: '-30vh',
          left: '-20vw',
          width: '100vw',
          height: '120vh',
          background: `radial-gradient(ellipse at ${yGradientPos} left, rgba(${leftColor},0.4) 0%, rgba(${leftColor},0.15) 40%, transparent 75%)`,
          filter: 'blur(60px) url(#fog)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Left Light Core Glow */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.8, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          [yPosPrefix]: '-10vh',
          left: '-10vw',
          width: '60vw',
          height: '80vh',
          background: `radial-gradient(circle at ${yGradientPos} left, rgba(${leftColor},0.7) 0%, rgba(${leftColor},0.1) 60%, transparent 80%)`,
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* RIGHT LIGHT: Diffused Ambient Wash */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.6, 0.7, 0.5] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: 'absolute',
          [yPosPrefix]: '-30vh',
          right: '-20vw',
          width: '100vw',
          height: '120vh',
          background: `radial-gradient(ellipse at ${yGradientPos} right, rgba(${rightColor},0.4) 0%, rgba(${rightColor},0.1) 40%, transparent 75%)`,
          filter: 'blur(60px) url(#fog)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Right Light Core Glow */}
      <motion.div
        animate={{ opacity: [0.6, 0.9, 0.7, 0.8, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: 'absolute',
          [yPosPrefix]: '-10vh',
          right: '-10vw',
          width: '60vw',
          height: '80vh',
          background: `radial-gradient(circle at ${yGradientPos} right, rgba(${rightColor},0.6) 0%, rgba(${rightColor},0.08) 60%, transparent 80%)`,
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Global Ground Fog Overlay */}
      <motion.div
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          [yPosPrefix]: 0,
          left: 0,
          right: 0,
          height: '50vh',
          background: `linear-gradient(to ${downward ? 'bottom' : 'top'}, rgba(255,255,255,0.08), transparent)`,
          filter: 'url(#fog) blur(20px)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
