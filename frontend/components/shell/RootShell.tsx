'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { hudTheme } from '@/lib/theme/hudTheme';

interface RootLayoutProps {
  children: ReactNode;
}

export const RootShell: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <motion.div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ 
        backgroundColor: hudTheme.colors.background,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, ${hudTheme.colors.accent.primary} 1px, transparent 1px),
            linear-gradient(${hudTheme.colors.accent.primary} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 0,
        }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10">
        {children}
      </div>

      {/* System Status Footer */}
      <motion.div
        className="fixed bottom-4 right-4 text-xs tracking-widest uppercase"
        style={{ color: hudTheme.colors.text.muted }}
        animate={{ opacity: [0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: hudTheme.colors.status.success,
              boxShadow: `0 0 8px ${hudTheme.colors.status.success}`,
            }}
          />
          System Online
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RootShell;
