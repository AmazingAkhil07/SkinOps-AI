import React from 'react';

interface TacticalPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  status?: 'IDLE' | 'ACTIVE' | 'WARNING' | 'DANGER';
}

export const TacticalPanel: React.FC<TacticalPanelProps> = ({ 
  children, 
  className = '', 
  title,
  status = 'IDLE' 
}) => {
  
  const statusColors = {
    IDLE: 'border-slate-700 text-slate-500',
    ACTIVE: 'border-sky-500 text-sky-400',
    WARNING: 'border-amber-500 text-amber-500',
    DANGER: 'border-rose-500 text-rose-500',
  };

  return (
    <div className={`relative bg-surface-panel/80 border border-slate-800 p-6 ${className}`}>
      {/* Corner Accents */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${statusColors[status].split(' ')[0]}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${statusColors[status].split(' ')[0]}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${statusColors[status].split(' ')[0]}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${statusColors[status].split(' ')[0]}`} />

      {/* Header */}
      {title && (
        <div className="absolute -top-3 left-4 bg-surface-dark px-2 text-xs font-mono tracking-widest uppercase">
          <span className={statusColors[status].split(' ')[1]}>{title}</span>
        </div>
      )}

      {children}
    </div>
  );
};