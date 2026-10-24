import React, { useState, useEffect } from 'react';
import HubHeader from './components/HubHeader1';
import MetricsBar from './components/MetricsBar1';
import StudentCard from './components/StudentCard1';
import StudentModal from './components/StudentModal1';

const MAJORS = [
  'Artificial Intelligence & ML',
  'Cloud Systems Engineering',
  'Cybersecurity & Cryptography',
  'Full-Stack Software Architecture',
];

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('All');
  const [activeModalStudent, setActiveModalStudent] = useState(null);

  // Fetch from JSONPlaceholder mock API
  const fetchHubData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`Data fetch failed with status code ${response.status}`);
      }
      const rawUsers = await response.json();

      // Transform raw mock entities into Student records
      const studentProfiles = rawUsers.map((user, idx) => ({
        id: user.id,
        rollNo: `HUB-2026-${String(user.id).padStart(3, '0')}`,
        name: user.name,
        username: user.username,
        email: user.email.toLowerCase(),
        city: user.address.city,
        zipcode: user.address.zipcode,
        phone: user.phone.split(' ')[0],
        major: MAJORS[idx % MAJORS.length],
        term: `Term ${(user.id % 6) + 1}`,
        gpa: (3.2 + ((user.id * 13) % 8) * 0.1).toFixed(2),
        credits: 48 + user.id * 6,
        status: 'Enrolled',
      }));

      setStudents(studentProfiles);
    } catch (err) {
      setError(err.message || 'System error while fetching registry records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHubData();
  }, []);

  // Filter pipeline
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMajor = selectedMajor === 'All' || student.major === selectedMajor;
    return matchesSearch && matchesMajor;
  });

  // Calculate live metric summaries
  const total = students.length;
  const avgGpa = total
    ? (students.reduce((acc, curr) => acc + parseFloat(curr.gpa), 0) / total).toFixed(2)
    : '0.00';
  const totalCredits = students.reduce((acc, curr) => acc + curr.credits, 0);

  return (
    <main className="min-h-screen w-full bg-slate-950 text-slate-100 p-4 sm:p-8 relative overflow-hidden flex flex-col justify-between">
      {/* Background Micro-Dot Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full z-10">
        {/* Top Header */}
        <HubHeader onRefresh={fetchHubData} loading={loading} />

        {/* Metrics Banner */}
        {!loading && !error && (
          <MetricsBar
            total={total}
            avgGpa={avgGpa}
            activeCount={total}
            creditsTotal={totalCredits}
          />
        )}

        {/* Search & Department Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, roll ID, or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {/* Department Filter Tabs (rendered with map) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {['All', ...MAJORS].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedMajor(dept)}
                className={`px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedMajor === dept
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {dept === 'All' ? 'All Disciplines' : dept.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-slate-900/40 border border-slate-800/60 animate-pulse p-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                  <div className="h-10 w-10 bg-slate-800 rounded-xl"></div>
                  <div className="h-4 bg-slate-800 rounded w-2/3"></div>
                  <div className="h-3 bg-slate-800 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-slate-800 rounded w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-6 text-center">
            <p className="text-rose-300 font-bold text-sm">Failed to connect to records database</p>
            <p className="text-slate-400 text-xs mt-1">{error}</p>
            <button
              onClick={fetchHubData}
              className="mt-4 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-mono transition-all cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Empty Search Fallback */}
        {!loading && !error && filteredStudents.length === 0 && (
          <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center bg-slate-950/40">
            <p className="text-slate-400 text-sm font-medium">No matching student records found</p>
            <p className="text-slate-600 text-xs mt-1">Adjust search parameters or select a different department tab.</p>
          </div>
        )}

        {/* Records Grid using Array.map() */}
        {!loading && !error && filteredStudents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onInspect={(s) => setActiveModalStudent(s)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Inspector Modal */}
      <StudentModal
        student={activeModalStudent}
        onClose={() => setActiveModalStudent(null)}
      />

      <footer className="relative text-center text-xs text-slate-600 font-mono mt-12 z-10">
        Student Hub Portal System • React `useEffect()` + `fetch()` • Tailwind CSS v4 Engine
      </footer>
    </main>
  );
}

export default App;