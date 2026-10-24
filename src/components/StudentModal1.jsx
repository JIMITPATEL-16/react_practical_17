import React from 'react';

const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-950 border border-cyan-500/30 rounded-2xl p-6 sm:p-7 shadow-[0_0_50px_rgba(6,182,212,0.2)] text-slate-100">
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              Record Detail // {student.rollNo}
            </span>
            <h2 className="text-xl font-bold mt-1 text-white">{student.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="my-5 space-y-3.5 text-xs font-mono">
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <p className="text-slate-400"><strong className="text-slate-200">Department:</strong> {student.major}</p>
            <p className="text-slate-400"><strong className="text-slate-200">Semester Term:</strong> {student.term}</p>
            <p className="text-slate-400"><strong className="text-slate-200">Credits Completed:</strong> {student.credits} Units</p>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <p className="text-slate-400"><strong className="text-slate-200">Institutional Email:</strong> {student.email}</p>
            <p className="text-slate-400"><strong className="text-slate-200">Residential Base:</strong> {student.city}, {student.zipcode}</p>
            <p className="text-slate-400"><strong className="text-slate-200">Emergency Phone:</strong> {student.phone}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs rounded-xl cursor-pointer transition-colors"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;