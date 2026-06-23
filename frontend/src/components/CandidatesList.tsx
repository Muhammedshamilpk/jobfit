import { useEffect, useState, useMemo } from 'react';
import { Search, ArrowUpRight, SortAsc, SortDesc, User, Mail } from 'lucide-react';
import { Candidate } from '../types';

interface CandidatesListProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
}

type SortField = 'final_score' | 'name';
type SortOrder = 'asc' | 'desc';

  
export default function CandidatesList({ candidates, onSelectCandidate }: CandidatesListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('final_score');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [apiCandidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    fetch ("http://127.0.0.1:8000/candidates")
    .then((res) => res.json())
    .then((data) => { 
      setCandidates(data)
    })
    .catch(console.error);
  } , []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };



  const filteredAndSortedCandidates = useMemo(() => {
    let result = [...apiCandidates];

    // Filter
   if (searchTerm) {
  const lowerReq = searchTerm.toLowerCase();

  result = result.filter(
    (c) =>
      c.name?.toLowerCase().includes(lowerReq) ||
      c.email?.toLowerCase().includes(lowerReq)
  );
}
    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'final_score') {
        comparison = a.final_score - b.final_score;
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [apiCandidates,searchTerm, sortField, sortOrder]);

  return (
    <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto w-full relative">
      
      
      <div className="max-w-[1400px] mx-auto p-8 xl:p-10 space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2 flex items-center gap-3">
              Candidate Management
            </h1>
            <p className="text-slate-500 text-sm">Discover and rank the best candidates using AI-driven resume analysis</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search names, emails, roles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-600/50 transition-all placeholder:text-slate-500 shadow-inner"
              />
            </div>
            
          </div>
        </div>

        {/* Top Action Bar */}
        <div className="flex items-center justify-between py-2 border-b border-slate-200">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{filteredAndSortedCandidates.length}</span> candidates
          </div>

        </div>

        {/* Table */}
        <div className="bg-white  border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-5 cursor-pointer hover:text-slate-800 transition-colors w-16" onClick={() => handleSort('final_score')}>
                    <div className="flex items-center gap-1">Rank {sortField === 'final_score' ? (sortOrder === 'asc' ? <SortAsc className="h-3 w-3"/> : <SortDesc className="h-3 w-3"/>) : null}</div>
                  </th>
                  <th className="px-6 py-5 cursor-pointer hover:text-slate-800 transition-colors" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">Candidate Name {sortField === 'name' ? (sortOrder === 'asc' ? <SortAsc className="h-3 w-3"/> : <SortDesc className="h-3 w-3"/>) : null}</div>
                  </th>
                  <th className="px-6 py-5 cursor-pointer hover:text-slate-800 transition-colors w-72" onClick={() => handleSort('final_score')}>
                    <div className="flex items-center gap-1">Final ATS Score {sortField === 'final_score' ? (sortOrder === 'asc' ? <SortAsc className="h-3 w-3"/> : <SortDesc className="h-3 w-3"/>) : null}</div>
                  </th>
                  <th className="px-6 py-5">Recommendation</th>
                  <th className="px-6 py-5 text-right">View Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                {filteredAndSortedCandidates.map((c, index) => {
                  const recommendation = c.recommendation;
                  return (
                    <tr 
                      key={c.email} 
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-mono font-medium ${index < 3 && sortField === 'final_score' && sortOrder === 'desc' ? 'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm' : 'bg-white border border-slate-200 text-slate-500'}`}>
                          #{index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100 flex items-center justify-center border border-slate-300 font-medium">
                              {c.name.charAt(0) || "?"}
                           </div>
                           <div>
                              <div className="font-medium text-slate-900 flex items-center gap-2 mb-0.5">
                                {c.name}
                                {c.final_score >= 90 && <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm" title="Top Match" />}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {"Candidate"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {c.email}
                                </span>
                              </div>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`font-mono text-sm font-semibold w-8 ${c.final_score >= 85 ? 'text-emerald-700' : c.final_score >= 70 ? 'text-amber-700' : 'text-red-700'}`}>
                            {c.final_score}
                          </div>
                          <div className="w-full max-w-[160px] h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${c.final_score >= 85 ? 'bg-emerald-500 shadow-sm' : c.final_score >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                              style={{ width: `${c.final_score}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${recommendation === "Strong Match"
                                  ? "bg-green-100 text-green-700 border-green-200": recommendation === "Consider"? "bg-yellow-100 text-yellow-700 border-yellow-200": "bg-red-100 text-red-700 border-red-200"}`}>
                          {recommendation}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => onSelectCandidate(c)}
                          className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors inline-flex items-center gap-2 group-hover:border-slate-300"
                        >
                          View Profile
                          <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-700 transition-colors" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredAndSortedCandidates.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No candidates available. Upload resumes to start screening.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
