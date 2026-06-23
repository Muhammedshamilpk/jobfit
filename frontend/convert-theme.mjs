import fs from 'fs';
import path from 'path';

const dirs = [path.join(process.cwd(), 'src'), path.join(process.cwd(), 'src', 'components')];

const replacements = [
  // Specific Buttons
  [/bg-white text-zinc-950/g, 'bg-blue-600 text-white'],
  [/bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950/g, 'bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white'],
  [/px-4 py-2 bg-white text-zinc-950 rounded-xl text-sm font-semibold hover:bg-zinc-200 transition shadow-sm shrink-0 flex items-center gap-2/g, 'px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-sm shrink-0 flex items-center gap-2'],
  // Drop dark background tags mapped to Sidebar and App background
  [/bg-\[\#111827\]/g, 'bg-white'],
  
  // Backgrounds
  [/bg-zinc-950\/50/g, 'bg-slate-50'],
  [/bg-zinc-950\/20/g, 'bg-slate-50'],
  [/bg-zinc-950\/40/g, 'bg-slate-50 border-y border-slate-200'],
  [/bg-zinc-950\b/g, 'bg-slate-50'],
  [/bg-zinc-900\/60/g, 'bg-slate-50'],
  [/bg-zinc-900\/50/g, 'bg-slate-50'],
  [/bg-zinc-900\/40/g, 'bg-white'],
  [/bg-zinc-900\b/g, 'bg-white'],
  [/bg-zinc-800\/30/g, 'bg-slate-50'],
  [/hover:bg-zinc-800/g, 'hover:bg-slate-100'],
  [/bg-zinc-800\b/g, 'bg-slate-100'],
  [/bg-zinc-700\b/g, 'bg-slate-200'],
  [/bg-zinc-600\b/g, 'bg-slate-300'],
  
  // Borders & Dividers
  [/divide-white\/\[0\.02\]/g, 'divide-slate-200'],
  [/divide-zinc-800/g, 'divide-slate-200'],
  [/border-white\/\[0\.[0-9]+\]/g, 'border-slate-200'],
  [/border-zinc-900\b/g, 'border-slate-200'],
  [/border-zinc-800\/50/g, 'border-slate-200'],
  [/border-zinc-800\b/g, 'border-slate-200'],
  [/border-zinc-700\/80/g, 'border-slate-300'],
  [/border-zinc-700\/50/g, 'border-slate-200'],
  [/border-zinc-700\b/g, 'border-slate-300'],
  [/border-zinc-600\b/g, 'border-slate-300'],
  
  // Text Colors
  [/text-zinc-50\b/g, 'text-slate-900'],
  [/text-white\b/g, 'text-slate-900'],
  [/text-zinc-100\b/g, 'text-slate-900'],
  [/text-zinc-200\b/g, 'text-slate-800'],
  [/text-zinc-300\b/g, 'text-slate-700'],
  [/text-zinc-400\b/g, 'text-slate-500'],
  [/text-zinc-500\b/g, 'text-slate-500'],
  
  // Indigo -> Blue
  [/bg-indigo-500\/10/g, 'bg-blue-50'],
  [/bg-indigo-500\/20/g, 'bg-blue-100'],
  [/border-indigo-500\/20/g, 'border-blue-200'],
  [/border-indigo-500\/50/g, 'border-blue-300'],
  [/border-indigo-500\/10/g, 'border-blue-100'],
  [/text-indigo-400/g, 'text-blue-600'],
  [/text-indigo-300/g, 'text-blue-700'],
  [/text-indigo-200\/70/g, 'text-blue-800'],
  [/text-indigo-100/g, 'text-blue-900'],
  [/bg-indigo-500/g, 'bg-blue-600'],
  [/ring-indigo-500/g, 'ring-blue-600'],
  [/accent-indigo-500/g, 'accent-blue-600'],
  
  // Gradients to flat
  [/bg-gradient-to-t from-slate-50 via-slate-50\/95 to-transparent/g, 'bg-slate-50/90'],
  [/bg-gradient-to-b from-slate-50 via-slate-50\/95 to-transparent/g, 'bg-slate-50/90'],
  
  // Update icons and extra buttons
  [/px-6 py-3 bg-white text-slate-900 rounded-xl text-sm font-semibold hover:bg-slate-100 transition shadow-sm flex items-center gap-2/g, 'px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2']
];

for (const dir of dirs) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  for (const f of files) {
    const p = path.join(dir, f);
    let c = fs.readFileSync(p, 'utf8');
    
    // Custom logic to fix buttons that just got mangled
    // "bg-blue-600 text-slate-900" should be "bg-blue-600 text-white"
    
    for (const [r, target] of replacements) {
      c = c.replace(r, target);
    }
    
    c = c.replace(/text-slate-900(.*?)bg-blue-600/g, 'text-white$1bg-blue-600');
    c = c.replace(/bg-blue-600(.*?)text-slate-900/g, 'bg-blue-600$1text-white');
    
    fs.writeFileSync(p, c);
  }
}
console.log('Done');
