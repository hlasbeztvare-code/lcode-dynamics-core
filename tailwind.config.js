/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E30613',
          dark: '#0A0A0A',
          light: '#F5F5F7',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'levitate': 'levitate 8s ease-in-out infinite',
        'laser-pulse': 'laserPulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scroll-reveal': 'scrollReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        levitate: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        laserPulse: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 10px #E30613, 0 0 20px #E30613' },
          '50%': { opacity: '0.4', boxShadow: '0 0 2px #E30613, 0 0 5px #E30613' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scrollReveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
