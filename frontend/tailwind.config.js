/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Clinical diagnostic palette - steel/graphite/slate only
        'hud-dark': '#0a0e27',      // Deep dark for backgrounds
        'hud-surface': '#1a1f3a',   // Panel surfaces
        'hud-border': '#2d3561',    // Border/grid color
        'hud-text': '#e0e2ff',      // Primary text
        'hud-accent': '#4f79d4',    // Scan/diagnostic accent (slate blue)
        'scan-primary': '#5a8acc',  // Scan sweep color
        'scan-secondary': '#3d5a8f', // Secondary scan overlay
        'warning': '#cc9d27',       // Safety warning (amber)
        'success': '#4a9966',       // Confirmation (muted green)
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(90deg, rgba(77, 85, 145, 0.1) 1px, transparent 1px), linear-gradient(rgba(77, 85, 145, 0.1) 1px, transparent 1px)',
        'scan-line': 'linear-gradient(90deg, transparent, rgba(94, 122, 204, 0.3), transparent)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'boot-pulse': 'bootPulse 0.6s ease-in-out',
        'scan-sweep': 'scanSweep 2s ease-in-out infinite',
        'hud-flicker': 'hudFlicker 0.15s ease-in-out',
        'seg-load': 'segLoad 1.2s ease-in-out',
      },
      keyframes: {
        bootPulse: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scanSweep: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { opacity: '0.4' },
          '100%': { transform: 'translateX(100%)' },
        },
        hudFlicker: {
          '0%': { opacity: '0.9' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.95' },
        },
        segLoad: {
          '0%': { width: '0%', opacity: '0.5' },
          '100%': { width: '100%', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
