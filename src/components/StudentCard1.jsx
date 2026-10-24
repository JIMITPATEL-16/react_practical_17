import React from 'react';

const StudentCard = ({ student }) => {
  // Color coding GPA
  const isHighPerformer = parseFloat(student.gpa) >= 3.6;

  return (
    <div className="relative group bg-slate-950/70 border border-white/5 hover:border-cyan-500/30 rounded-2xl p-5 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.15)] flex flex-col justify-between">
      {/* Top Bar: Enrollment Tag & Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
            {student.rollNo}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {student.status}
          </span>
        </div>

        {/* Student Avatar + Name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-fuchsia-600 p-[1px] flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold font-mono text-cyan-300 text-sm">
              {student.name.charAt(0)}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors truncate">
              {student.name}
            </h3>
            <p className="text-xs text-indigo-400 font-mono truncate">
              @{student.username.toLowerCase()}
            </p>
          </div>
        </div>

        {/* Course & Department */}
        <div className="mb-4">
          <span className="inline-block text-[11px] font-medium text-slate-300 bg-slate-900/80 border border-white/5 px-2.5 py-1 rounded-lg">
            🎓 {student.department}
          </span>
        </div>

        {/* Contact Specs */}
        <div className="space-y-1.5 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2 truncate">
            <svg className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <svg className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{student.city}</span>
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
        <div>
          <span className="text-slate-500 text-[10px] block">CUMULATIVE GPA</span>
          <span className={`font-bold text-sm ${isHighPerformer ? 'text-cyan-400' : 'text-slate-200'}`}>
            {student.gpa} / 4.0
          </span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 text-[10px] block">SEMESTER</span>
          <span className="text-slate-300 font-medium">{student.semester}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;