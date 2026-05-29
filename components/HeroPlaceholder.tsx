'use client'

import React from 'react'

export default function HeroPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      {/* Central static glow to prevent CLS while the heavy WebGL shader loads */}
      <div 
        className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full animate-pulse opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(227,6,19,0.4) 0%, rgba(227,6,19,0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
          animationDuration: '3s'
        }}
      />
    </div>
  )
}
