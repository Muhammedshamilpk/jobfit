import { UploadCloud, Search, Filter, ArrowUpRight, TrendingUp, Users, Award, Activity, UserPlus, FileText } from 'lucide-react';
import { Candidate } from '../types';
import { useState, useEffect } from 'react';

interface DashboardProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
}

export default function Dashboard({ candidates, onSelectCandidate }: DashboardProps) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [candidateList, setCandidateList] = useState<any[]>([]);

  useEffect(() => {
  fetch("http://127.0.0.1:8000/candidates")
    .then((res) => res.json())
    .then(setCandidateList)
    .catch(console.error);
}, []);

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/analytics")
    .then((res) => res.json())
    .then(setAnalytics)
    .catch(console.error);
}, []);

if (!analytics) {
  return (
    <div className="p-10">
      Loading Dashboard...
    </div>
  );
}


  const kpis = [
    { label: 'Total Candidates', value: analytics.totalResumes.toString(), icon: FileText, trend: '+14% this week', trendGood: true, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
    { label: 'Best Match Score', value: analytics.topScore.toString(), suffix: '/100', icon: Award, trend: 'Latest Batch', trendGood: true, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
    { label: 'Average Match Score', value: analytics.avgScore, icon: Activity, trend: '+2.1 from last month', trendGood: true, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { label: 'Shortlisted Candidates', value: analytics.shortlisted.toString(), icon: UserPlus, trend: '8% conversion', trendGood: true, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ];
  console.log(candidateList);

  const strongMatch = candidateList.filter(
  (c) => c.recommendation === "Strong Match"
).length;

const consider = candidateList.filter(
  (c) => c.recommendation === "Consider"
).length;

const reject = candidateList.filter(
  (c) => c.recommendation === "Reject"
).length;

const total = candidateList.length || 1;

const strongPercent = ((strongMatch / total) * 100).toFixed(0);
const considerPercent = ((consider / total) * 100).toFixed(0);
const rejectPercent = ((reject / total) * 100).toFixed(0);
  return (
    <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto w-full relative">
      {/* Ambient glassmorphism gradients */}
      
      

      <div className="max-w-[1400px] mx-auto p-8 xl:p-10 space-y-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2 flex items-center gap-3">
              Recruitment Dashboard
              <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-blue-50 text-blue-600 border border-blue-200 rounded-full">HQ</span>
            </h1>
            {/* <p className="text-slate-500 text-sm">Real-time ML candidate parsing and analytics overview.</p> */}
          </div>
          <div className="flex items-center gap-3">
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-white  border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 hover:bg-white transition-colors group">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.border} border`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <div className="text-xs font-medium text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  <TrendingUp className="h-3 w-3" />
                  {kpi.trend}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-sm font-medium mb-1">{kpi.label}</div>
                <div className="text-3xl font-semibold text-slate-900 tracking-tight">
                  {kpi.value}
                  {kpi.suffix && <span className="text-lg text-slate-500 font-normal">{kpi.suffix}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

     {/* Candidate Distribution */}
<div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">

  <h2 className="text-2xl font-semibold text-slate-900 mb-8">
    Candidate Distribution
  </h2>

  <div className="space-y-8">

    {/* Strong Match */}
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-green-700">
          Strong Match ({strongMatch})
        </span>
        <span className="font-semibold">
          {strongPercent}%
        </span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${strongPercent}%` }}
        />
      </div>
    </div>

    {/* Consider */}
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-yellow-700">
          Consider ({consider})
        </span>
        <span className="font-semibold">
          {considerPercent}%
        </span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-4">
        <div
          className="bg-yellow-500 h-4 rounded-full"
          style={{ width: `${considerPercent}%` }}
        />
      </div>
    </div>

    {/* Reject */}
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-red-700">
          Reject ({reject})
        </span>
        <span className="font-semibold">
          {rejectPercent}%
        </span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-4">
        <div
          className="bg-red-500 h-4 rounded-full"
          style={{ width: `${rejectPercent}%` }}
        />
      </div>
    </div>

  </div>
</div>
        </div>
      </div>
  );
}
