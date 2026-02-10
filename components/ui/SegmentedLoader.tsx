import React from 'react';
import { motion } from 'framer-motion';

interface SegmentedLoaderProps {
  progress: number; // 0 to 100
  segments?: number;
  color?: string;
  label?: string;
}

export const SegmentedLoader: React.FC<SegmentedLoaderProps> = ({ 
  progress, 
  segments = 20, 
  color = 'bg-sky-500',
  label 
}) => {
  const activeSegments = Math.floor((progress / 100) * segments);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs font-mono mb-1 text-slate-400">
          <span>{label}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className="flex space-x-1 h-2">
        {Array.from({ length: segments }).map((_, i) => (
          <div 
            key={i}
            className={`flex-1 rounded-[1px] transition-colors duration-150 ${
              i < activeSegments ? `${color} shadow-[0_0_8px_rgba(56,189,248,0.5)]` : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
};