import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Display: Orbitron for futuristic brand identity
        display: ['var(--font-orbitron)', 'monospace'],
        // Headings: Outfit for clean modern type
        heading: ['var(--font-outfit)', 'sans-serif'],
        // Body: DM Sans for readability
        body: ['var(--font-dm-sans)', 'sans-serif'],
        // Mono: IBM Plex Mono for code/eval sections
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      colors: {
        // Primary green palette
        primary: {
          50:  '#f0fdf6',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Abyss dark palette
        abyss: {
          950: '#020709',
          900: '#050d12',
          800: '#081420',
          700: '#0d1e2e',
          600: '#132738',
          500: '#1a3347',
        },
        // Neon green accent
        neon: {
          green: '#00ff88',
          teal:  '#00e5cc',
          lime:  '#aaff00',
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px)",
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,255,136,0.15) 0%, transparent 60%)',
        'card-gradient': 'linear-gradient(135deg, rgba(0,255,136,0.06) 0%, rgba(0,229,204,0.03) 100%)',
        'glow-green': 'radial-gradient(circle at center, rgba(0,255,136,0.2) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'neon-sm': '0 0 10px rgba(0,255,136,0.3)',
        'neon-md': '0 0 20px rgba(0,255,136,0.4)',
        'neon-lg': '0 0 40px rgba(0,255,136,0.5)',
        'neon-xl': '0 0 80px rgba(0,255,136,0.3)',
        'card':    '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,136,0.15)',
      },
      animation: {
        'pulse-slow':    'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':         'float 6s ease-in-out infinite',
        'float-delay':   'float 6s ease-in-out 2s infinite',
        'scan':          'scan 3s linear infinite',
        'glow-pulse':    'glowPulse 2s ease-in-out infinite',
        'fade-in-up':    'fadeInUp 0.6s ease-out forwards',
        'shimmer':       'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,255,136,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(0,255,136,0.6)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
