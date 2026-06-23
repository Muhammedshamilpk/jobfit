import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, FileText, ChevronDown, Check, Loader2 } from 'lucide-react';
import { Candidate, ChatMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function ResumeChat({ candidate }: { candidate: Candidate }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI sourcing assistant. I've successfully loaded and indexed **${candidate.name}'s** resume into my context window. \n\nYou can ask me to summarize their experience, extract specific skills, or evaluate their fit for a particular role. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [retrieving, setRetrieving] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, retrieving]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setRetrieving(true);
    
    

    try {

    console.log("Candidate:", candidate);
    console.log("Resume Text:", candidate.resume_text);

    
  const response = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: input,
      resume_text: candidate.resume_text
    }),
  });

  const data = await response.json();

  setRetrieving(false);
  setIsTyping(false);

  setMessages(prev => [
    ...prev,
    {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: data.answer,
      timestamp: new Date()
    }
  ]);

} catch (error) {
  console.error(error);

  setRetrieving(false);
  setIsTyping(false);

  setMessages(prev => [
    ...prev,
    {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Failed to connect to AI backend.",
      timestamp: new Date()
    }
  ]);
}
};
  return (
    <div className="w-full h-[700px] bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col relative overflow-hidden shadow-sm">
      
      {/* Settings / Top Bar */}
      <div className="h-14 border-b border-slate-200/80 flex items-center justify-between px-4 bg-slate-50  z-20 sticky top-0">
        <button className="flex items-center gap-2 hover:bg-white px-3 py-1.5 rounded-lg transition-colors text-slate-800 font-medium">
          Resume Assistant <span className="text-slate-500 font-normal">v4</span>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-medium">
            <Check className="h-3.5 w-3.5" />
            Resume Auto-Synced
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 min-h-full pb-32">
          {messages.length === 1 && (
            <div className="flex flex-col items-center justify-center pt-10 pb-8 opacity-80">
               <div className="h-16 w-16 mb-4 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                 <Sparkles className="h-8 w-8 text-slate-500" />
               </div>
               <h2 className="text-xl font-semibold text-slate-800 mb-2 tracking-tight">How can I help with this candidate?</h2>
               <p className="text-sm text-slate-500">I have context on their skills, experience, and education.</p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className="flex gap-4 sm:gap-6 group"
              >
                {/* Avatar */}
                <div className="shrink-0 flex flex-col items-center">
                  {msg.role === 'assistant' ? (
                     <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                       <Sparkles className="h-4 w-4 text-blue-600" />
                     </div>
                  ) : (
                     <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                       <User className="h-4 w-4 text-slate-500" />
                     </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 space-y-2 mt-1">
                   <div className="font-semibold text-[13px] text-slate-900 flex items-center gap-2">
                     {msg.role === 'assistant' ? 'Assistant' : 'Recruit Admin'}
                   </div>
                   
                   <div className="text-[15px] leading-relaxed text-slate-700 whitespace-pre-wrap">
                     {msg.content}
                   </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex gap-4 sm:gap-6 group"
               >
                 <div className="shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                    </div>
                 </div>
                 <div className="flex-1 mt-1 space-y-3 relative">
                    <div className="font-semibold text-[13px] text-slate-900">Assistant</div>
                    
                    {retrieving ? (
                       <div className="inline-flex flex-col gap-2">
                         <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-500 flex items-center gap-2">
                           <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-500" />
                           Reviewing `{candidate.name.toLowerCase().replace(' ', '_')}_resume.pdf`...
                         </div>
                       </div>
                    ) : (
                      <div className="flex items-center gap-1.5 h-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                 </div>
               </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      {/* Input Area (Sticky Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-50/90 backdrop-blur-sm border-t border-slate-200/50 pt-6 pb-6 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {["Summarize their background", "Identify their weaknesses", "Did they lead any features?"].map(q => (
                <button 
                  key={q} 
                  onClick={() => setInput(q)} 
                 className="text-[13px] font-medium px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <div className="relative">
            <form onSubmit={handleSend} className="relative flex items-end bg-white border border-slate-300 rounded-2xl shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all overflow-hidden pl-4 pr-12 py-3 min-h-[60px]">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e as unknown as React.FormEvent);
                  }
                }}
                placeholder="Ask anything about the candidate..."
                className="w-full bg-transparent border-none text-[15px] text-slate-900 focus:outline-none resize-none placeholder:text-slate-500 py-1"
                rows={1}
                style={{ minHeight: '24px', maxHeight: '200px' }}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="absolute right-3 bottom-2.5 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg transition-colors flex items-center justify-center shadow-sm"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="text-center mt-2 text-xs text-slate-500">
               Assistant may produce inaccurate information about candidates. Verify outputs.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
