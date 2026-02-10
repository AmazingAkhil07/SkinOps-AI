'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { hudTheme } from '@/lib/theme/hudTheme';

export const DiagnosticScanner: React.FC = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer Rotating Ring */}
      <motion.div
        className="absolute inset-0 border-[3px] rounded-full border-t-transparent border-l-transparent"
        style={{ borderColor: `${hudTheme.colors.accent.primary}aa` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
      />

      {/* Counter-Rotating inner ring */}
      <motion.div
        className="absolute inset-4 border-[2px] border-dashed rounded-full border-b-transparent border-r-transparent"
        style={{ borderColor: `${hudTheme.colors.accent.secondary}88` }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
      />

      {/* Hexagon Grid / Scanner Lines */}
      <div className="absolute inset-8 opacity-20 overflow-hidden rounded-full">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPositionY: ['0%', '100%']
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `linear-gradient(${hudTheme.colors.accent.primary} 1px, transparent 1px)`,
            backgroundSize: '100% 10px'
          }}
        />
      </div>

      {/* Four Corner Marks */}
      {[0, 90, 180, 270].map((rot) => (
        <div 
          key={rot} 
          className="absolute w-full h-full pointer-events-none"
          style={{ transform: `rotate(${rot}deg)` }}
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1"
            style={{ backgroundColor: hudTheme.colors.accent.primary }}
          />
        </div>
      ))}

      {/* Pulse Center */}
      <motion.div
        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
        style={{ 
          background: `radial-gradient(circle, ${hudTheme.colors.accent.primary}44 0%, transparent 70%)`,
        }}
      >
        <motion.div
          className="w-4 h-4 rounded-full"
          style={{ 
            backgroundColor: hudTheme.colors.accent.primary,
            boxShadow: `0 0 15px ${hudTheme.colors.accent.primary}`,
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Radar Sweep */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, ${hudTheme.colors.accent.primary}33 0deg, transparent 90deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
      />
    </div>
  );
};

export default DiagnosticScanner;
