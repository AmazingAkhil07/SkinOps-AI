import React from 'react';
import { GridBackground } from './ui/GridBackground';
import { ScanlineOverlay } from './ui/ScanlineOverlay';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showSidebar = true }) => {
  return (
    <div className="relative min-h-screen bg-surface-dark text-slate-200 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Global Effects */}
      <GridBackground />
      <ScanlineOverlay />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto custom-scrollbar">
          {children}
        </main>
        
        {/* Status Footer */}
        <footer className="h-8 border-t border-slate-800 bg-surface-dark/90 backdrop-blur flex items-center justify-between px-4 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
           <div className="flex items-center space-x-4">
             <span className="flex items-center">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse" />
               SYSTEM_ONLINE
             </span>
             <span>LATENCY: 12ms</span>
           </div>
           <div>
             CLINICAL DECISION SUPPORT // NON-DIAGNOSTIC
           </div>
        </footer>
      </div>
    </div>
  );
};