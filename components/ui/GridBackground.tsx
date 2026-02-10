import React from 'react';

export const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
    </div>
  );
};