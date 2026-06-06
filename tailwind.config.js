/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          950: '#06080f',
          900: '#0b0f1a',
          850: '#0e1422',
          800: '#111827',
          700: '#1a2236',
          600: '#222d42',
          500: '#2d3a52',
        },
        accent: {
          cyan: '#00e5ff',
          blue: '#2979ff',
          amber: '#ffab40',
          red: '#ff5252',
          green: '#69f0ae',
        },
        text: {
          primary: '#e8edf5',
          secondary: '#8a9ab5',
          muted: '#4a5568',
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        'radial-glow': 'radial-gradient(ellipse at center, rgba(0,229,255,0.08) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
        'fade-up': 'fadeUp 0.4s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'typing': 'typing 1.2s steps(3) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        typing: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,229,255,0.2), 0 0 10px rgba(0,229,255,0.1)' },
          '100%': { boxShadow: '0 0 10px rgba(0,229,255,0.4), 0 0 20px rgba(0,229,255,0.2)' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.4)',
        'cyan-glow': '0 0 20px rgba(0,229,255,0.15)',
        'input': 'inset 0 1px 2px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
