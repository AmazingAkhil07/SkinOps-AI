import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SegmentedLoader } from './ui/SegmentedLoader';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING_CORE_SYSTEM...",
  "LOADING_DERMATOLOGICAL_PROTOCOLS...",
  "ESTABLISHING_SECURE_CONNECTION...",
  "CHECKING_BIO_SENSORS...",
  "CALIBRATING_DECISION_ENGINE...",
  "LOADING_USER_PROFILE_DB...",
  "SYSTEM_OPTIMIZATION_COMPLETE."
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentLog = 0;
    
    // Log Interval
    const logInterval = setInterval(() => {
      if (currentLog < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentLog]]);
        currentLog++;
      }
    }, 400);

    // Progress Interval
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(onComplete, 800); // Slight pause at 100%
          return 100;
        }
        // Random increment for realism
        return Math.min(prev + Math.random() * 8, 100);
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-dark text-slate-200 font-mono">
      <div className="w-full max-w-md p-8 relative">
        
        {/* Animated Bracket Container */}
        <div className="absolute inset-0 border-l border-r border-slate-800 opacity-50" />
        
        <div className="mb-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-bold tracking-tight text-white mb-2"
          >
            SYSTEM_BOOT
          </motion.h1>
          <div className="text-xs tracking-[0.2em] text-slate-500 uppercase">
            Men’s Skin Performance Engine
          </div>
        </div>

        {/* Boot Logs */}
        <div className="h-32 overflow-hidden mb-6 text-xs text-sky-400/80 border-t border-b border-slate-900/50 py-2 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-dark pointer-events-none" />
          <div className="flex flex-col justify-end h-full">
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-1"
                >
                  <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Loader */}
        <SegmentedLoader progress={progress} label="LOADING_MODULES" />

        <div className="mt-4 flex justify-between text-[10px] text-slate-600 uppercase tracking-widest">
           <span>Ver 0.9.1-ALPHA</span>
           <span>Secure_Mode: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};