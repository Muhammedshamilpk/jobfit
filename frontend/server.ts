import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { Candidate } from "./src/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory "Database"
  let candidates: Candidate[] = [
    {
      id: "1",
      name: "Alex Rivera",
      role: "Senior Frontend Engineer",
      email: "alex.rivera@example.com",
      phone: "+1 (555) 123-4567",
      appliedDate: new Date().toISOString(),
      status: "Interviewing",
      overallScore: 92,
      keywordScore: 95,
      semanticScore: 89,
      experience: 6,
      education: "BS Computer Science, UC Berkeley",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS"],
      missingSkills: ["Python", "AWS"],
      aiSummary: "Alex is a highly qualified candidate with strong frontend experience. Their expertise in React and modern tooling directly aligns with the required skills.",
      strengths: ["Deep React knowledge", "TypeScript migration experience", "Mentorship background"],
      weaknesses: ["Lacks backend cloud architecture (AWS)", "No Python experience"],
      interviewQuestions: [
        {
          question: "Can you describe a challenging TypeScript migration you led?",
          rationale: "To gauge their architectural decision-making and leadership.",
        },
        {
          question: "How do you handle state management in large React applications?",
          rationale: "To assess their understanding of scalability in the frontend.",
        }
      ]
    },
    {
      id: "2",
      name: "Jamie Lin",
      role: "Senior Frontend Engineer",
      email: "jamie.l@example.com",
      phone: "+1 (555) 987-6543",
      appliedDate: new Date().toISOString(),
      status: "Shortlisted",
      overallScore: 85,
      keywordScore: 82,
      semanticScore: 88,
      experience: 4,
      education: "MS Software Engineering, MIT",
      skills: ["React", "JavaScript", "Redux", "AWS"],
      missingSkills: ["TypeScript", "Tailwind CSS"],
      aiSummary: "Jamie has a solid computer science background and great experience with React. While missing some specific tooling requested (TypeScript), their general engineering skills are easily transferable.",
      strengths: ["Strong problem solving", "Cloud deployment experience", "Performance optimization"],
      weaknesses: ["No production TypeScript", "Used legacy styling solutions"],
      interviewQuestions: [
        {
          question: "How would you approach learning TypeScript on the job?",
          rationale: "To see their continuous learning mindset.",
        }
      ]
    }
  ];

  // API Routes
  app.get("/api/candidates", (req, res) => {
    res.json(candidates);
  });

  app.post("/api/upload", (req, res) => {
    // Simulate resume parsing
    const names = ["Jordan Smith", "Taylor Swift", "Chris Evans", "Morgan Freeman", "Casey Johnson"];
    const name = names[Math.floor(Math.random() * names.length)];
    const role = "Frontend Engineer";
    const overallScore = Math.floor(Math.random() * 40) + 60; // 60-100
    
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      name,
      role,
      email: `${name.replace(' ', '.').toLowerCase()}@example.com`,
      phone: "+1 (555) 000-0000",
      appliedDate: new Date().toISOString(),
      status: "New",
      overallScore,
      keywordScore: Math.min(100, overallScore + 5),
      semanticScore: Math.max(0, overallScore - 5),
      experience: Math.floor(Math.random() * 5) + 1,
      education: "BS Computer Science",
      skills: ["React", "JavaScript", "HTML/CSS"],
      missingSkills: ["TypeScript"],
      aiSummary: `AI generated summary for ${name}. Solid base skills found in the resume.`,
      strengths: ["Basic frontend stack"],
      weaknesses: ["Needs senior architecture experience"],
      interviewQuestions: [
        { question: "Can you write a custom React hook?", rationale: "Basic react knowledge test." }
      ]
    };

    candidates.push(newCandidate);
    
    setTimeout(() => {
      res.json(newCandidate);
    }, 2000); // Simulate processing delay
  });

  app.get("/api/analytics", (req, res) => {
    const total = candidates.length;
    const avgScore = candidates.reduce((acc, c) => acc + c.overallScore, 0) / (total || 1);
    const shortlistedCount = candidates.filter(c => c.status === "Shortlisted" || c.status === "Interviewing").length;
    
    // Skill aggregation
    const skillCounts: Record<string, number> = {};
    candidates.forEach(c => {
      c.skills.forEach(s => {
        skillCounts[s] = (skillCounts[s] || 0) + 1;
      });
    });
    
    // Sort skills by count desc
    const sortedSkills = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count], i) => {
        const colors = ['bg-sky-500', 'bg-blue-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-amber-500'];
        return {
          name,
          count,
          perc: (count / total) * 100,
          color: colors[i % colors.length]
        };
      });

    // Score array for bar chart
    const scoreBuckets = Array(10).fill(0);
    candidates.forEach(c => {
      let bucket = Math.floor(c.overallScore / 10);
      if (bucket >= 10) bucket = 9;
      scoreBuckets[bucket]++;
    });

    res.json({
      totalResumes: total,
      topScore: total > 0 ? Math.max(...candidates.map(c => c.overallScore)) : 0,
      avgScore: avgScore.toFixed(1),
      shortlisted: shortlistedCount,
      distribution: [
        { range: '90-100', label: 'Exceptional', count: candidates.filter(c => c.overallScore >= 90).length, percentage: (candidates.filter(c => c.overallScore >= 90).length / (total || 1)) * 100, bar: 'bg-emerald-500' },
        { range: '75-89', label: 'Strong Match', count: candidates.filter(c => c.overallScore >= 75 && c.overallScore < 90).length, percentage: (candidates.filter(c => c.overallScore >= 75 && c.overallScore < 90).length / (total || 1)) * 100, bar: 'bg-indigo-500' },
        { range: '50-74', label: 'Consider', count: candidates.filter(c => c.overallScore >= 50 && c.overallScore < 75).length, percentage: (candidates.filter(c => c.overallScore >= 50 && c.overallScore < 75).length / (total || 1)) * 100, bar: 'bg-amber-500' },
        { range: '0-49', label: 'Weak Match', count: candidates.filter(c => c.overallScore < 50).length, percentage: (candidates.filter(c => c.overallScore < 50).length / (total || 1)) * 100, bar: 'bg-rose-500' },
      ],
      funnel: [
        { stage: 'Uploaded Resumes', count: total + 10, percentage: 100 },
        { stage: 'Parsed Successfully', count: total, percentage: (total / (total + 10)) * 100 },
        { stage: 'AI Screened', count: total, percentage: (total / (total + 10)) * 100 },
        { stage: 'Shortlisted', count: shortlistedCount, percentage: (shortlistedCount / (total + 10)) * 100 },
        { stage: 'Interview Ready', count: Math.floor(shortlistedCount / 2), percentage: (Math.floor(shortlistedCount / 2) / (total + 10)) * 100 },
      ],
      topSkills: sortedSkills,
      scoreBuckets
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
