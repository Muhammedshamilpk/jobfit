import { useState } from 'react';
import { ArrowLeft, BrainCircuit, MessageSquare, FileText as FileTextIcon, Mail, Phone } from 'lucide-react';
import { Candidate } from '../types';
import ResumeChat from './ResumeChat';
import { motion } from 'motion/react';

interface CandidateDetailsProps {
  candidate: Candidate;
  onBack: () => void;
}

export default function CandidateDetails({ candidate, onBack }: CandidateDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai-eval' | 'chat'>('ai-eval');
  console.log("Candidate:", candidate);
  console.log("Resume File:", candidate.resume_file);
  return (
    <div className="h-full bg-slate-50 text-slate-900 flex flex-col w-full relative overflow-hidden">
      {/* Background glow */}
      

      {/* Header */}
      <div className="shrink-0 border-b border-slate-200/80 bg-slate-50  z-20 px-8 pt-6 pb-0">
        <button 
          onClick={onBack}
          className="group flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
          Back to Candidates
        </button>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

  <div className="flex items-start gap-5">

    <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-medium border border-slate-200 shadow-sm overflow-hidden relative">
      {candidate.name.charAt(0)}
    </div>

    <div className="pt-1">

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">
        {candidate.name}
      </h1>

      <div className="text-slate-500 text-sm font-medium">
        Candidate
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">

        <span className="flex items-center gap-1.5 text-slate-500 font-mono text-xs">
          <Mail className="h-3.5 w-3.5 text-slate-500" />
          {candidate.email}
        </span>

        {candidate.phone && (
          <span className="flex items-center gap-1.5 text-slate-500 font-mono text-xs">
            <Phone className="h-3.5 w-3.5 text-slate-500" />
            {candidate.phone}
          </span>
        )}

      </div>

    </div>

  </div>

</div>

        {/* Tabs */}
        <div className="flex items-center gap-8 mt-10 border-b border-slate-200/80 translate-y-[1px]">
          {[
             { id: 'ai-eval', label: 'Summary', icon: BrainCircuit },
             { id: 'overview', label: 'Original Resume', icon: FileTextIcon },
             { id: 'chat', label: 'Ask Your Doubts', icon: MessageSquare },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-sm font-medium flex items-center gap-2 transition-colors relative ${
                  isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {isActive && (
                  <motion.div 
                    layoutId="active-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 relative z-10 w-full">
         {activeTab === 'ai-eval' && (
  <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">

    <h2 className="text-xl font-semibold mb-6">
      Candidate Analysis
    </h2>

    <div className="grid grid-cols-2 gap-4 mb-8">

      <div>
        <strong>Keyword Score:</strong> {candidate.keyword_score}
      </div>

      <div>
        <strong>Semantic Score:</strong> {candidate.semantic_score}
      </div>

      <div>
        <strong>Final Score:</strong> {candidate.final_score}
      </div>

      <div>
        <strong>Recommendation:</strong> {candidate.recommendation}
      </div>

    </div>

    <div>
      <h3 className="font-semibold mb-3">
        AI Summary
      </h3>

      <p className="text-slate-700 whitespace-pre-wrap">
        {candidate.summary}
      </p>
    </div>

  </div>
)}
         {activeTab === 'chat' && <ResumeChat candidate={candidate} />}
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <iframe
              src={`http://127.0.0.1:8000/${candidate.resume_file}`}
              width="100%"
              height="900px"
              title="Resume PDF"
            />
          </div>
)}
      </div>
    </div>
  );
}
