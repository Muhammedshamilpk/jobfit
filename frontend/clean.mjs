import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove unwanted glowing background blob elements
  content = content.replace(/<div className="absolute[^"]*blur-\[120px\][^"]*"\s*\/>/g, '');
  content = content.replace(/<div className="absolute[^"]*blur-\[150px\][^"]*"\s*\/>/g, '');
  content = content.replace(/<div className="absolute[^"]*blur-\[100px\][^"]*"\s*\/>/g, '');
  content = content.replace(/<div className="absolute[^"]*blur-\[50px\][^"]*"\s*\/>/g, '');
  content = content.replace(/<div className="absolute[^"]*bg-indigo-500\/5 blur-\[[^"]*"\s*\/>/g, '');
  content = content.replace(/<div className="absolute[^"]*bg-indigo-500\/10 blur-\[[^"]*"\s*\/>/g, '');

  content = content.replace(/<div className="absolute inset-0 bg-gradient-[^"]*opacity-0 group-hover[^"]*"\s*\/>/g, '');
  content = content.replace(/<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white\/20[^"]*"\s*\/>/g, '');
  content = content.replace(/<div className="absolute inset-0 bg-gradient-to-r from-transparent to-white\/10"\s*\/>/g, '');
  
  // Remove shadows
  content = content.replace(/shadow-\[0_0_[^\]]*\]/g, 'shadow-sm');
  content = content.replace(/drop-shadow-\[0_0_[^\]]*\]/g, 'drop-shadow-sm');

  // Replace component specific gradients
  content = content.replace(/bg-gradient-to-b from-zinc-800 to-zinc-900/g, 'bg-zinc-800');
  content = content.replace(/bg-gradient-to-r from-zinc-800 to-zinc-700/g, 'bg-zinc-700');
  content = content.replace(/<div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-black\/20 to-transparent" \/>/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
}

// Sidebar bg-zinc-950 -> bg-[#111827]
const sidebarPath = path.join(componentsDir, 'Sidebar.tsx');
let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
sidebarContent = sidebarContent.replace(/className="w-64 bg-zinc-950/g, 'className="w-64 bg-[#111827]');
fs.writeFileSync(sidebarPath, sidebarContent, 'utf8');

console.log('Cleaned glowing effects.');
