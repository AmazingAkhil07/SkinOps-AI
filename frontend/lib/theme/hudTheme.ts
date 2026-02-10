// Cinematic diagnostic theme configuration
// Clinical decision support visual system - NOT beauty/AI neon

export const hudTheme = {
  colors: {
    // Base palette - steel & graphite
    background: '#0a0e27',
    surface: '#1a1f3a',
    border: '#2d3561',
    text: {
      primary: '#e0e2ff',
      secondary: '#b0b3d9',
      muted: '#8a8dac',
    },
    accent: {
      primary: '#4f79d4', // Slate blue - scan/diagnostic
      secondary: '#5a8acc',
      tertiary: '#3d5a8f',
    },
    status: {
      warning: '#cc9d27', // Amber - safety alerts
      success: '#4a9966', // Muted green - confirmation
      danger: '#a73838',  // Muted red - critical
      info: '#4f79d4',    // Blue - information
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  borders: {
    thin: '1px',
    thick: '2px',
    radius: '2px', // Sharp tactical edges
  },
  shadows: {
    sm: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)',
    md: 'inset 0 2px 4px rgba(0, 0, 0, 0.6)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.8)',
  },
  typography: {
    fontFamily: 'monospace',
    sizes: {
      xs: '10px',
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
    },
    weights: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0em',
      wide: '0.05em',
      widest: '0.1em',
    },
  },
  motion: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slowest: 1.0,
  },
};

// Brand messaging for HCP-focused CDS system
export const hudMessages = {
  boot: {
    system: 'INITIALIZING DIAGNOSTIC ENGINE',
    connection: 'ESTABLISHING SECURE CONNECTION',
    verification: 'VERIFYING CLINICAL PROTOCOLS',
    ready: 'SYSTEM READY FOR ASSESSMENT',
  },
  disclaimers: {
    cds: 'Clinical Decision Support - Not a Diagnostic Tool',
    hcp: 'For Healthcare Professional Use',
    override: 'Healthcare Provider Override Available',
  },
  scan: {
    analyzing: 'ANALYZING PROFILE METRICS',
    processing: 'PROCESSING SKIN ASSESSMENT',
    complete: 'ASSESSMENT COMPLETE',
  },
};
