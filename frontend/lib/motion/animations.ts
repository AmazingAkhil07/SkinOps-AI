// Motion framework for cinematic diagnostic system
import { Variants, TargetAndTransition } from 'framer-motion';

/**
 * Boot Sequence Animation Presets
 * Used for system initialization and tactical HUD startup
 */

export const bootSequenceVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Scan Sweep Animation
 * Cinematic horizontal scan sweep effect
 */
export const scanSweepVariants: Variants = {
  animate: {
    x: ['0%', '100%'],
    opacity: [0, 0.6, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

/**
 * HUD Panel Slide Transition
 * Panels slide in from edges with tactical feel
 */
export const hudPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: '-20px',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: '-20px',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Segmented Loading Bar
 * Progressive bar animation for system status
 */
export const segmentedLoaderVariants = (duration: number): Variants => ({
  animate: {
    width: '100%',
    transition: {
      duration,
      ease: 'easeInOut',
    },
  },
});

/**
 * HUD Flicker Effect
 * Tactical diagnostic system flicker on state change
 */
export const hudFlickerVariants: Variants = {
  animate: {
    opacity: [0.9, 1, 0.95],
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
};

/**
 * Pulse Meter Animation
 * Animated diagnostic meter readout
 */
export const pulseMeterVariants = (startValue: number): Variants => ({
  animate: (custom: number) => ({
    width: `${custom}%`,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.1,
    },
  }),
});

/**
 * Grid Overlay Animation
 * Subtle grid line animation for cinematic effect
 */
export const gridOverlayVariants: Variants = {
  animate: {
    backgroundPosition: ['0px 0px', '40px 40px'],
    transition: {
      duration: 20,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

/**
 * Label Animation
 * Diagnostic label fade-in with stagger
 */
export const labelVariants: Variants = {
  hidden: { opacity: 0, letterSpacing: '-0.05em' },
  visible: {
    opacity: 1,
    letterSpacing: '0.1em',
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Transition Objects for Page Navigation
 */
export const pageTransition = {
  duration: 0.5,
  ease: 'easeInOut',
};

export const layoutTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};
