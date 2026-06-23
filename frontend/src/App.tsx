/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CandidateDetails from './components/CandidateDetails';
import CandidatesList from './components/CandidatesList';
import ResumeScreening from './components/ResumeScreening';
import ResumeChat from './components/ResumeChat';
import { Candidate } from './types';
import InterviewPipeline from "./components/InterviewPipeline";

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    try {
      const res = await fetch('/api/candidates');
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

 const fallbackCandidate = selectedCandidate || {
  name: 'Select Candidate',
  email: '',
  phone: '',

  keyword_score: 0,
  semantic_score: 0,
  final_score: 0,

  recommendation: '',
  summary: ''
};

  if (loading) {
    return <div className="h-screen w-full bg-slate-50 flex items-center justify-center text-slate-500 font-mono text-sm">Loading ATS Platform...</div>;
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 flex overflow-hidden relative">
        {currentView === 'dashboard' && (
          <Dashboard 
            candidates={candidates}
            onSelectCandidate={(c) => { 
              setSelectedCandidate(c); 
              setCurrentView('candidate'); 
            }} 
          />
        )}
        
        {currentView === 'candidate' && selectedCandidate && (
          <CandidateDetails 
            candidate={selectedCandidate} 
            onBack={() => setCurrentView('candidates')} 
          />
        )}
        
        {currentView === 'candidates' && (
          <CandidatesList 
            candidates={candidates}
            onSelectCandidate={(c) => { 
              setSelectedCandidate(c); 
              setCurrentView('candidate'); 
            }} 
          />
        )}

        {currentView === 'screening' && <ResumeScreening onUploadComplete={fetchCandidates} />}
        {currentView === 'chat' && selectedCandidate && (
          <div className="w-full h-full p-8 flex items-center justify-center">
            <div className="w-full max-w-4xl h-[700px]">
              <ResumeChat candidate={selectedCandidate} />
            </div>
          </div>
        )}
        {currentView === 'ai-analysis' && (
   <div className="h-full w-full flex items-center justify-center text-slate-500 font-medium text-center p-8">
      ...
   </div>
)}

{currentView === 'interviews' && (
  <InterviewPipeline />
)}

{!['dashboard', 'candidate', 'candidates', 'screening', 'chat', 'ai-analysis', 'interviews'].includes(currentView) && (
   <div className="h-full w-full flex items-center justify-center text-slate-500 font-medium">
      {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Module - Coming soon.
   </div>
)}
      </main>
    </div>
  );
}
