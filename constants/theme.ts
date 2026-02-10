/**
 * PHASE 0: THEME SPECIFICATION
 * 
 * Style: Cinematic Diagnostic Console / Tactical HUD
 * Palette: Dark Neutral, Steel, Slate. NO NEON. NO PURPLE.
 */

export const THEME_CONFIG = {
  colors: {
    background: '#020617', // Absolute background
    surface: '#0f172a', // Card/Panel background
    border: '#1e293b', // Grid lines / Borders
    text: {
      primary: '#e2e8f0', // High contrast text
      secondary: '#94a3b8', // Labels / Metadata
      muted: '#475569', // Disabled / Ghost
    },
    accents: {
      action: '#38bdf8', // Sky 400 - Primary Action (Clinical Blue)
      success: '#10b981', // Emerald 500 - Safe/Go
      warning: '#f59e0b', // Amber 500 - Caution/Wait
      error: '#e11d48', // Rose 600 - Danger/Stop
    }
  },
  typography: {
    fontFamily: {
      display: 'ui-sans-serif, system-ui, sans-serif', // Clean, legible
      data: 'ui-monospace, SFMono-Regular, monospace', // For numbers/stats
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    }
  },
  layout: {
    gridUnit: 4, // 4px baseline
    borderRadius: {
      none: '0px',
      sm: '2px', // Tight corners
      md: '4px', // Tactical look
      lg: '8px',
    }
  },
  effects: {
    glass: 'backdrop-blur-md bg-opacity-80',
    scanline: 'pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]',
  }
};