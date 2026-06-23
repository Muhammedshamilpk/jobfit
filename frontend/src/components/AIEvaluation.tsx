import { CheckCircle2, AlertCircle, HelpCircle, Code, Layers, FileSearch } from 'lucide-react';
import { Candidate } from '../types';

export default function AIEvaluation({ candidate }: { candidate: Candidate }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Breakdown Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <h3 className="text-slate-900 font-semibold flex items-center gap-2 mb-6 tracking-tight">
             <Layers className="h-4 w-4 text-blue-600" />
             Vector Scoring Breakdown
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 font-medium tracking-wide">Keyword Match (TF-IDF)</span>
                <span className="font-mono text-slate-800">{candidate.keywordScore}/100</span>
              </div>
              <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-slate-400 rounded-full" style={{ width: `${candidate.keywordScore}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 font-medium tracking-wide">Semantic Relevance (ChromaDB)</span>
                <span className="font-mono text-slate-800">{candidate.semanticScore}/100</span>
              </div>
              <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-blue-600/80 rounded-full" style={{ width: `${candidate.semanticScore}%` }} />
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-slate-200 mt-6 gap-6">
              <div className="flex-1">
                <span className="text-slate-800 font-semibold tracking-wide block mb-1">Final ATS Score</span>
                <span className="text-slate-500 text-xs">Composite score based on semantic vector distance and keyword frequency counting.</span>
              </div>
              <div className="relative w-20 h-20 shrink-0">
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * candidate.overallScore) / 100}
                    className={`transition-all duration-1000 ease-out ${candidate.overallScore >= 75 ? 'text-emerald-700 drop-shadow-sm' : candidate.overallScore >= 50 ? 'text-amber-700 drop-shadow-sm' : 'text-red-700 drop-shadow-sm'}`} 
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className={`text-xl font-bold font-mono ${candidate.overallScore >= 75 ? 'text-emerald-700' : candidate.overallScore >= 50 ? 'text-amber-700' : 'text-red-700'}`}>{candidate.overallScore}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          
          <h3 className="text-slate-900 font-semibold flex items-center gap-2 mb-4 tracking-tight">
             <FileSearch className="h-4 w-4 text-blue-600" />
             Groq LLM Executive Summary
          </h3>
          <p className="text-slate-700/80 text-[15px] leading-relaxed">
            {candidate.name} presents a highly competitive profile for the <strong className="text-slate-900 font-medium">{candidate.role}</strong> position. Their background aligns deeply with our core stack, demonstrating particular depth in modern frontend architecture and scalable design patterns. The semantic evaluation reveals a trajectory of taking measurable ownership over complex state management and performance migrations.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200 flex gap-2">
            <span className="px-2.5 py-1 rounded bg-white text-xs text-slate-500 font-mono border border-slate-200">llama3-70b-8192</span>
            <span className="px-2.5 py-1 rounded bg-white text-xs text-slate-500 font-mono border border-slate-200">temperature: 0.1</span>
          </div>
        </div>

      </div>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-slate-900 font-semibold flex items-center gap-2 mb-5 tracking-tight">
             <CheckCircle2 className="h-4 w-4 text-emerald-700" />
             Matched Required Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {candidate.skills?.length ? candidate.skills.map(skill => (
              <span key={skill} className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-medium">
                {skill}
              </span>
            )) : (
              <span className="text-slate-500 text-sm italic">No matched skills identified.</span>
            )}
          </div>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-slate-900 font-semibold flex items-center gap-2 mb-5 tracking-tight">
             <AlertCircle className="h-4 w-4 text-red-700" />
             Missing Required Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {candidate.missingSkills?.length ? candidate.missingSkills.map(skill => (
              <span key={skill} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm font-medium">
                {skill}
              </span>
            )) : (
              <span className="text-slate-500 text-sm italic">No missing skills identified.</span>
            )}
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-emerald-900/30 rounded-2xl p-6 shadow-sm">
          <h3 className="text-emerald-700 font-semibold flex items-center gap-2 mb-5 tracking-tight">
             <CheckCircle2 className="h-5 w-5" />
             Identified Strengths
          </h3>
          <ul className="space-y-4">
            {(candidate.strengths || []).map((s, i) => (
              <li key={i} className="text-[14px] text-slate-700 flex items-start gap-3">
                <div className="shrink-0 h-5 w-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700/80 mt-0.5">
                   <CheckCircle2 className="h-3 w-3" />
                </div>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-rose-900/30 rounded-2xl p-6 shadow-sm">
          <h3 className="text-red-700 font-semibold flex items-center gap-2 mb-5 tracking-tight">
             <AlertCircle className="h-5 w-5" />
             Potential Areas of Concern
          </h3>
          <ul className="space-y-4">
            {(candidate.weaknesses || []).map((s, i) => (
              <li key={i} className="text-[14px] text-slate-700 flex items-start gap-3">
                <div className="shrink-0 h-5 w-5 rounded-full bg-red-50 flex items-center justify-center text-red-700/80 mt-0.5">
                  <AlertCircle className="h-3 w-3" />
                </div>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Qs */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <h3 className="text-slate-900 font-semibold flex items-center gap-2 mb-6 tracking-tight">
           <HelpCircle className="h-4 w-4 text-blue-600" />
           Recommended Interview Probes
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {(candidate.interviewQuestions || []).map((item, i) => (
            <div key={i} className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between hover:bg-white transition-colors">
              <div className="text-[15px] font-medium text-slate-800 mb-4 leading-snug">{item.question}</div>
              <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg w-fit border border-slate-200">
                <Code className="h-3 w-3 text-blue-600" />
                Rationale: {item.rationale}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
