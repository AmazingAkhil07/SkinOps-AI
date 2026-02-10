import React from 'react';

interface TerminalOutputProps {
  label: string;
  data: any;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ label, data }) => {
  return (
    <div className="mb-6 font-mono text-sm border border-slate-800 bg-slate-900/50 p-4 rounded-sm">
      <div className="text-slate-400 text-xs uppercase tracking-widest mb-2 border-b border-slate-800 pb-1 flex justify-between">
        <span>{label}</span>
        <span className="text-emerald-500">LOCKED</span>
      </div>
      <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};