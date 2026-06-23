export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;

  keyword_score?: number;
  semantic_score?: number;
  final_score?: number;

  recommendation?: string;
  summary?: string;

  resume_text?: string;   // ADD THIS
  resume_file?:string

  role: string;
  appliedDate: string;
  status: string;

  overallScore: number;
  keywordScore: number;
  semanticScore: number;

  experience: number;
  education: string;
  skills: string[];
}


export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
