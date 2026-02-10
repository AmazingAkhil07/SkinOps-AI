'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { hudTheme } from '@/lib/theme/hudTheme';

interface DiagnosticMeterProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  variant?: 'primary' | 'warning' | 'success';
  showLabel?: boolean;
}

export const DiagnosticMeter: React.FC<DiagnosticMeterProps> = ({
  label,
  value,
  max = 100,
  unit = '%',
  variant = 'primary',
  showLabel = true,
}) => {
  const percentage = max <= 0 ? 0 : Math.min(Math.max((value / max) * 100, 0), 100);
  
  const barColor = 
    variant === 'warning' ? hudTheme.colors.status.warning :
    variant === 'success' ? hudTheme.colors.status.success :
    hudTheme.colors.accent.primary;

  return (
    <div className="mb-4">
      {/* Meter Label */}
      {showLabel && (
        <div className="flex justify-between items-baseline mb-2">
          <span 
            className="text-xs tracking-widest uppercase"
            style={{ color: hudTheme.colors.text.secondary }}
          >
            {label}
          </span>
          <span 
            className="text-sm font-mono"
            style={{ color: barColor }}
          >
            {value}{unit}
          </span>
        </div>
      )}

      {/* Meter Bar - Segmented */}
      <div 
        className="relative h-4 bg-black/40 border border-hud-border flex gap-[2px] p-[2px] overflow-hidden"
      >
        {[...Array(20)].map((_, i) => {
          const segmentPercentage = (i + 1) * 5;
          const isActive = percentage >= segmentPercentage;
          
          return (
            <motion.div
              key={i}
              className="flex-1 h-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isActive ? 1 : 0.1,
                backgroundColor: isActive ? barColor : hudTheme.colors.border
              }}
              transition={{ delay: i * 0.03 }}
            />
          );
        })}

        {/* Glitch Overlay for Active Bar */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0, 0.1, 0, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ 
            background: `linear-gradient(90deg, transparent, ${barColor}, transparent)`,
            width: `${percentage}%`
          }}
        />
      </div>
    </div>
  );
};

export default DiagnosticMeter;
