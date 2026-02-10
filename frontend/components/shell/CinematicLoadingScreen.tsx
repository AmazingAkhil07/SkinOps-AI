'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/motion/animations';
import { hudTheme } from '@/lib/theme/hudTheme';
import DiagnosticScanner from '@/components/hud/DiagnosticScanner';

interface CinematicLoadingScreenProps {
  status?: string;
  progress?: number;
  subtitle?: string;
}

export const CinematicLoadingScreen: React.FC<CinematicLoadingScreenProps> = ({
  status = 'ANALYZING PROFILE METRICS',
  progress = 0,
  subtitle = 'Skin Assessment in Progress',
}) => {
  const [mounted, setMounted] = React.useState(false);

  // Memoize random values for hydration stability
  const bars = React.useMemo(() => {
    return [...Array(20)].map(() => ({
      height: Math.random() * 12 + 2,
      delay: Math.random() * 0.5,
      duration: 0.5 + Math.random()
    }));
  }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: hudTheme.colors.background,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Grid - Pulsing */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(79, 121, 212, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(79, 121, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Content Container */}
      <motion.div
        className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-center"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Advanced Diagnostic Scanner */}
        <motion.div className="mb-12" variants={staggerItemVariants}>
          <DiagnosticScanner />
        </motion.div>

        {/* Status Text with Flicker */}
        <motion.div
          className="text-center mb-8"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl font-bold tracking-[0.3em] mb-3 uppercase"
            style={{ 
              color: hudTheme.colors.accent.primary,
              textShadow: `0 0 10px ${hudTheme.colors.accent.primary}55`
            }}
            animate={{ opacity: [0.9, 1, 0.95, 1, 0.9] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
            variants={staggerItemVariants}
          >
            {status}
          </motion.h2>
          <motion.p
            className="text-xs tracking-[0.5em] uppercase"
            style={{ color: hudTheme.colors.text.muted }}
            variants={staggerItemVariants}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Multi-Segment Loading Bar */}
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-between text-[10px] tracking-widest uppercase mb-1">
            <span style={{ color: hudTheme.colors.text.secondary }}>Scan Progress</span>
            <span style={{ color: hudTheme.colors.accent.primary }}>{progress}%</span>
          </div>
          
          <div className="relative h-2 w-full bg-hud-surface border border-hud-border">
            <motion.div
              className="absolute top-0 left-0 h-full bg-hud-accent"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="absolute inset-0 bg-white/30"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Activity Pulse Bars */}
          <div className="flex justify-center gap-1 h-3">
            {bars.map((bar, i) => (
              <motion.div
                key={i}
                className="w-1 bg-hud-accent/30"
                animate={mounted ? { 
                  height: [2, bar.height, 2],
                  opacity: [0.3, 0.8, 0.3]
                } : { height: 2, opacity: 0.3 }}
                transition={mounted ? { 
                  duration: bar.duration, 
                  repeat: Infinity,
                  delay: i * 0.05 + bar.delay
                } : { duration: 0 }}
              />
            ))}
          </div>
        </div>

        {/* Footer Status */}
        <motion.div
          className="mt-12 text-center"
          variants={staggerItemVariants}
        >
          <p 
            className="text-[10px] tracking-[0.3em] uppercase opacity-50"
            style={{ color: hudTheme.colors.text.muted }}
          >
            Clinical Decision Support • Non-Diagnostic
          </p>
        </motion.div>
      </motion.div>

      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 opacity-30" style={{ borderColor: hudTheme.colors.accent.primary }} />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 opacity-30" style={{ borderColor: hudTheme.colors.accent.primary }} />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 opacity-30" style={{ borderColor: hudTheme.colors.accent.primary }} />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 opacity-30" style={{ borderColor: hudTheme.colors.accent.primary }} />
    </motion.div>
  );
};

export default CinematicLoadingScreen;
