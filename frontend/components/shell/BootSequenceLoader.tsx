'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { bootSequenceVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/motion/animations';
import { hudTheme, hudMessages } from '@/lib/theme/hudTheme';

interface BootLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export const BootSequenceLoader: React.FC<BootLoaderProps> = ({ 
  onComplete, 
  duration = 3 
}) => {
  const [bootStage, setBootStage] = useState(0);
  const bootSequence = [
    hudMessages.boot.system,
    hudMessages.boot.connection,
    hudMessages.boot.verification,
    hudMessages.boot.ready,
  ];

  useEffect(() => {
    if (bootStage < bootSequence.length) {
      const timer = setTimeout(() => {
        setBootStage((prev) => prev + 1);
      }, (duration * 1000) / bootSequence.length);

      return () => clearTimeout(timer);
    } else if (onComplete && bootStage === bootSequence.length) {
      const completeTimer = setTimeout(onComplete, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [bootStage, bootSequence.length, duration, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        backgroundColor: hudTheme.colors.background,
      }}
      initial="hidden"
      animate="visible"
      variants={bootSequenceVariants}
    >
      <div className="w-full max-w-2xl px-8">
        {/* Boot Title */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-bold tracking-widest mb-2"
            style={{ color: hudTheme.colors.accent.primary }}
            variants={staggerItemVariants}
          >
            SKINOPS
          </motion.h1>
          <motion.p
            className="text-sm tracking-widest uppercase"
            style={{ color: hudTheme.colors.text.secondary }}
            variants={staggerItemVariants}
          >
            Men's Skin Performance Decision Engine
          </motion.p>
        </motion.div>

        {/* Boot Sequence Terminal */}
        <motion.div
          className="border-2 p-6 bg-black/40 mb-8"
          style={{
            borderColor: hudTheme.colors.border,
            fontFamily: 'monospace',
          }}
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {bootSequence.map((message, index) => (
            <motion.div
              key={index}
              className="mb-3"
              variants={staggerItemVariants}
              animate={index < bootStage + 1 ? 'visible' : 'hidden'}
            >
              <div
                className="text-xs tracking-widest flex items-center gap-2"
                style={{ color: hudTheme.colors.text.secondary }}
              >
                <span className="text-hud-accent">[{String(index + 1).padStart(2, '0')}]</span>
                <span>{message}</span>
                {index === bootStage && (
                  <motion.span
                    animate={{ opacity: [0.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="ml-1"
                    style={{ color: hudTheme.colors.accent.primary }}
                  >
                    ▌
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-full h-1 bg-hud-border rounded-sm overflow-hidden"
          variants={staggerItemVariants}
        >
          <motion.div
            className="h-full"
            style={{ 
              backgroundColor: hudTheme.colors.accent.primary,
              width: `${((bootStage + 1) / bootSequence.length) * 100}%`,
            }}
            transition={{ duration: (duration * 1000) / bootSequence.length / 1000 }}
          />
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs mt-8 tracking-widest uppercase"
          style={{ color: hudTheme.colors.text.muted }}
          variants={staggerItemVariants}
        >
          Initializing Clinical Decision Support System
        </motion.p>
      </div>
    </motion.div>
  );
};

export default BootSequenceLoader;
