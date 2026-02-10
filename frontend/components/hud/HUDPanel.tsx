'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { hudPanelVariants } from '@/lib/motion/animations';
import { hudTheme } from '@/lib/theme/hudTheme';

interface HUDPanelProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  variant?: 'default' | 'warning' | 'success';
  className?: string;
  delay?: number;
}

export const HUDPanel: React.FC<HUDPanelProps> = ({
  title,
  children,
  subtitle,
  variant = 'default',
  className = '',
  delay = 0,
}) => {
  const borderColor = 
    variant === 'warning' ? hudTheme.colors.status.warning :
    variant === 'success' ? hudTheme.colors.status.success :
    hudTheme.colors.border;

  return (
    <motion.div
      className={`hud-panel relative border-2 p-4 ${className}`}
      style={{ 
        borderColor,
      }}
      variants={hudPanelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay }}
    >
      {/* Panel Header */}
      <div className="flex items-baseline justify-between mb-4 pb-3 border-b"
        style={{ borderColor: hudTheme.colors.border }}
      >
        <h3 
          className="text-sm font-bold tracking-widest uppercase"
          style={{ color: borderColor }}
        >
          {title}
        </h3>
        {subtitle && (
          <span 
            className="text-xs tracking-widest"
            style={{ color: hudTheme.colors.text.muted }}
          >
            {subtitle}
          </span>
        )}
      </div>

      {/* Panel Content */}
      <div 
        style={{ color: hudTheme.colors.text.primary }}
      >
        {children}
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2"
        style={{ borderColor }}
      />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2"
        style={{ borderColor }}
      />
    </motion.div>
  );
};

export default HUDPanel;
