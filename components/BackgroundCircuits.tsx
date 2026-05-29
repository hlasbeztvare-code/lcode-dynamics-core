'use client'

import React from 'react'

export default function BackgroundCircuits() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-30">
      <style>{`
        @keyframes circuit-dash {
          to {
            stroke-dashoffset: -400;
          }
        }
        .animate-circuit-dash-fast {
          animation: circuit-dash 6s linear infinite;
        }
        .animate-circuit-dash-slow {
          animation: circuit-dash 10s linear infinite;
        }
      `}</style>

      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'translateZ(0px)' }}>
        <defs>
          <linearGradient id="circuit-gradient" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#E30613" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#E30613" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#E30613" stopOpacity="0.02" />
          </linearGradient>

        </defs>

        {/* Trace 1: From Cube Center (Approx 78% X, 50% Y) to Left and Up */}
        <path
          d="M 78% 50% L 65% 50% L 55% 40% L 35% 40% L 30% 35% L 15% 35%"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1.5"
          className="stroke-[#E30613]/20"
        />
        {/* Animated flow pulse 1 */}
        <path
          d="M 78% 50% L 65% 50% L 55% 40% L 35% 40% L 30% 35% L 15% 35%"
          fill="none"
          stroke="#E30613"
          strokeWidth="2"
          strokeDasharray="30 150"
          strokeDashoffset="0"
          className="animate-circuit-dash-fast opacity-80 drop-shadow-[0_0_4px_#E30613]"
        />

        {/* Trace 2: From Cube Center (Approx 78% X, 50% Y) to Left and Down */}
        <path
          d="M 78% 50% L 70% 58% L 50% 58% L 42% 66% L 25% 66% L 20% 71%"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1.5"
          className="stroke-[#E30613]/20"
        />
        {/* Animated flow pulse 2 */}
        <path
          d="M 78% 50% L 70% 58% L 50% 58% L 42% 66% L 25% 66% L 20% 71%"
          fill="none"
          stroke="#E30613"
          strokeWidth="2"
          strokeDasharray="40 180"
          strokeDashoffset="100"
          className="animate-circuit-dash-slow opacity-80 drop-shadow-[0_0_4px_#E30613]"
        />

        {/* Trace 3: Top Right Corner descending to Cube Area */}
        <path
          d="M 92% 10% L 85% 17% L 85% 38% L 78% 45%"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1.2"
          className="stroke-[#E30613]/15"
        />
        <path
          d="M 92% 10% L 85% 17% L 85% 38% L 78% 45%"
          fill="none"
          stroke="#E30613"
          strokeWidth="1.5"
          strokeDasharray="20 120"
          strokeDashoffset="50"
          className="animate-circuit-dash-fast opacity-60"
        />

        {/* Trace 4: Bottom Right Corner ascending to Cube Area */}
        <path
          d="M 92% 90% L 85% 83% L 85% 62% L 78% 55%"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1.2"
          className="stroke-[#E30613]/15"
        />
        <path
          d="M 92% 90% L 85% 83% L 85% 62% L 78% 55%"
          fill="none"
          stroke="#E30613"
          strokeWidth="1.5"
          strokeDasharray="25 140"
          strokeDashoffset="80"
          className="animate-circuit-dash-slow opacity-60"
        />

        {/* Central Brand Core Node (directly behind Cube) */}
        <circle 
          cx="78%" 
          cy="50%" 
          r="8" 
          fill="none" 
          stroke="#E30613" 
          strokeWidth="1.5" 
          opacity="0.7"
          className="animate-pulse"
        />
        <circle 
          cx="78%" 
          cy="50%" 
          r="4" 
          fill="#E30613" 
          style={{ animationDuration: '3s' }} 
          className="animate-ping drop-shadow-[0_0_4px_#E30613]" 
        />
        <circle 
          cx="78%" 
          cy="50%" 
          r="3.5" 
          fill="#E30613" 
        />

        {/* Terminal nodes at trace ends */}
        <g opacity="0.8">
          <circle cx="15%" cy="35%" r="3" fill="none" stroke="#E30613" strokeWidth="1" />
          <circle cx="15%" cy="35%" r="1" fill="#E30613" />

          <circle cx="20%" cy="71%" r="3" fill="none" stroke="#E30613" strokeWidth="1" />
          <circle cx="20%" cy="71%" r="1" fill="#E30613" />
          
          {/* Intersection micro dots */}
          <circle cx="65%" cy="50%" r="2.5" fill="#E30613" opacity="0.6" />
          <circle cx="55%" cy="40%" r="2.5" fill="#E30613" opacity="0.6" />
          <circle cx="35%" cy="40%" r="2" fill="#E30613" opacity="0.4" />
          
          <circle cx="70%" cy="58%" r="2.5" fill="#E30613" opacity="0.6" />
          <circle cx="50%" cy="58%" r="2.5" fill="#E30613" opacity="0.6" />
          <circle cx="42%" cy="66%" r="2.5" fill="#E30613" opacity="0.6" />
        </g>
      </svg>
    </div>
  )
}
