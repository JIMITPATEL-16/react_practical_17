import React from 'react';

const MetricsBar = ({ total, avgGpa, activeCount, creditsTotal }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Active Roster</p>
        <p className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 mt-1">{total}</p>
      </div>
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Campus Mean GPA</p>
        <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">{avgGpa}</p>
      </div>
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Status: Good Standing</p>
        <p className="text-xl sm:text-2xl font-bold font-mono text-indigo-400 mt-1">{activeCount}</p>
      </div>
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Credits Tracked</p>
        <p className="text-xl sm:text-2xl font-bold font-mono text-fuchsia-400 mt-1">{creditsTotal}</p>
      </div>
    </div>
  );
};

export default MetricsBar;