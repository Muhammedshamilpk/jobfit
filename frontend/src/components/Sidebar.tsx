import { LayoutDashboard, Users, FileText, Settings, Sparkles, Inbox, PieChart, UploadCloud, BrainCircuit, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { UserCheck } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (v: string) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'screening', label: 'Resume Screening', icon: UploadCloud },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: "interviews", label: "Interview Pipeline", icon: UserCheck },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-200">
          <Sparkles className="h-4 w-4 text-blue-600" />
        </div>
        <span className="font-semibold text-slate-900 tracking-tight">JobFit</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-1">
        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
        {navItems.map((item) => {
          const active = currentView === item.id || (currentView === 'candidate' && item.id === 'candidates');
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors relative ${
                active ? 'text-blue-600 font-medium' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="active-bg-nav"
                  className="absolute inset-0 bg-blue-50 rounded-lg border border-blue-200"
                  transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
                />
              )}
              <item.icon className="h-4 w-4 relative z-10" />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-3">
          <div className="h-8 w-8 rounded-full bg-slate-100 shrink-0 overflow-hidden border border-slate-300">
            <img src="https://i.pravatar.cc/150?img=68" alt="User" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-slate-800">Alex Recruiter</span>
            <span className="text-xs text-slate-500">Startup Inc.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
