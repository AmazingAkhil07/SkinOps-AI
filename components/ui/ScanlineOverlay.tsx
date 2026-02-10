import React from 'react';

export const ScanlineOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none opacity-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      <div className="absolute inset-0 w-full h-[20%] bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scanline" />
    </div>
  );
};