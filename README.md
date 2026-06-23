# 🚀 Resume Screening & Candidate Intelligence Platform

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38BDF8)
![ChromaDB](https://img.shields.io/badge/ChromaDB-VectorDB-orange)
![RAG](https://img.shields.io/badge/RAG-AI-red)
![LLM](https://img.shields.io/badge/Groq-LLM-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

# 📌 Overview

The **AI-Powered Resume Screening & Candidate Intelligence Platform** is an intelligent Applicant Tracking System (ATS) designed to automate candidate screening using Artificial Intelligence, Natural Language Processing (NLP), Retrieval-Augmented Generation (RAG), Semantic Search, and Large Language Models (LLMs).

The system helps recruiters evaluate candidates efficiently by analyzing resumes against job descriptions, generating AI-driven insights, ranking applicants, and creating interview-ready candidate profiles.

---

# 🎯 Problem Statement

Traditional resume screening is:

* Time-consuming
* Subjective
* Difficult to scale
* Prone to human bias
* Inefficient when handling hundreds of resumes

Recruiters often spend significant time manually reviewing resumes before identifying qualified candidates.

---

# 💡 Proposed Solution

This platform automates the screening process by:

* Extracting resume information
* Generating semantic embeddings
* Storing candidate data in ChromaDB
* Comparing resumes against job descriptions
* Calculating ATS compatibility scores
* Ranking candidates automatically
* Generating AI-powered summaries
* Recommending hiring decisions
* Creating interview pipelines

---

# ✨ Key Features

### Resume Screening

✅ Upload multiple resumes (PDF)

✅ Job Description matching

✅ Resume parsing

✅ Candidate ranking

✅ ATS score generation

---

### AI Evaluation

✅ Keyword Matching Score

✅ Semantic Similarity Score

✅ Hybrid ATS Score

✅ AI Candidate Summary

✅ Strengths Analysis

✅ Weaknesses Analysis

✅ Hiring Recommendation

---

### Candidate Intelligence

✅ Resume Viewer

✅ Resume Chat Assistant

✅ Interview Question Generator

✅ Candidate Comparison

✅ Interview Pipeline

---

### Dashboard Analytics

✅ Total Candidates

✅ Best Match Score

✅ Average Match Score

✅ Shortlisted Candidates

✅ Candidate Distribution Analysis

---

# 🏗 System Architecture

```text
                    ┌────────────────────┐
                    │ React Frontend     │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ FastAPI Backend    │
                    └─────────┬──────────┘
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼

      Resume Parser      Groq LLM        ChromaDB
      (PDF Extract)      Analysis        Vector DB

             ▼                ▼                ▼

      Candidate Data   AI Summary      Embeddings

             ▼                ▼                ▼

          ATS Scoring & Candidate Ranking
                              │
                              ▼

                 Interview Pipeline
```

---

# 🔄 Project Workflow

```text
Resume Upload
      │
      ▼
Resume Parsing
      │
      ▼
Information Extraction
      │
      ▼
Embedding Generation
      │
      ▼
ChromaDB Storage
      │
      ▼
Semantic Search
      │
      ▼
Keyword Matching
      │
      ▼
Hybrid ATS Scoring
      │
      ▼
Candidate Ranking
      │
      ▼
AI Analysis
      │
      ▼
Interview Pipeline
```

---

# 🛠 Tech Stack

| Category      | Technologies                    |
| ------------- | ------------------------------- |
| Frontend      | React, TypeScript |
| Backend       | FastAPI, Python                 |
| AI/ML         | NLP, Sentence Transformers      |
| LLM           | Groq API                        |
| Database      | ChromaDB                        |
| Vector Search | Embeddings + Semantic Search    |
| Deployment    | Localhost / Cloud Ready         |

---

# 📂 Project Structure

```text
Resume-Screening-System/

│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── backend/
│   ├── main.py
│   ├── rag.py
│   ├── llm.py
│   ├── parser.py
│   ├── uploads/
│   └── chroma_db/
│
├── requirements.txt
├── package.json
├── README.md
└── .gitignore
```

---

# ⚙️ Installation Guide

## Backend Setup

```bash
git clone <repository-url>

cd backend

python -m venv env

env\Scripts\activate

pip install -r requirements.txt
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

---

# ▶ Running the Application

### Backend

```bash
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

---

### Frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

| Endpoint        | Method | Description                    |
| --------------- | ------ | ------------------------------ |
| /analyze_resume | POST   | Analyze uploaded resumes       |
| /candidates     | GET    | Fetch candidates               |
| /api/analytics  | GET    | Dashboard analytics            |
| /db_count       | GET    | ChromaDB count                 |
| /db_documents   | GET    | View vector database documents |
| /db_search      | GET    | Search resumes                 |
| /db_clear       | DELETE | Clear ChromaDB                 |

---

# 🤖 AI Components

### 1. Resume Parser

Extracts:

* Name
* Email
* Phone Number
* Resume Text

---

### 2. Keyword Matching

Matches:

* Skills
* Technologies
* Requirements

between resume and job description.

---

### 3. Semantic Similarity

Uses Sentence Transformers to compare:

```text
Resume Meaning
        vs
Job Description Meaning
```

---

### 4. Hybrid ATS Score

```text
Final Score =
(Keyword Score × Weight)
+
(Semantic Score × Weight)
```

Provides more accurate candidate ranking.

---

# 🔍 RAG Implementation

The system uses Retrieval-Augmented Generation (RAG).

### Workflow

```text
Resume
   │
   ▼
Embedding
   │
   ▼
ChromaDB
   │
   ▼
Retrieval
   │
   ▼
Groq LLM
   │
   ▼
Candidate Analysis
```

Benefits:

* Context-aware analysis
* Better recommendations
* Reduced hallucination

---

# 🗄 ChromaDB Integration

ChromaDB stores:

* Resume embeddings
* Candidate metadata
* Semantic vectors

Used for:

* Similarity search
* Resume retrieval
* Context generation

---

# 👨‍💼 Interview Pipeline Module

Shortlisted candidates are automatically moved to:

```text
Interview Pipeline
```

Displays:

* Candidate Name
* Email
* Phone Number
* Final Score
* Recommendation

Status:

* Strong Match
* Consider
* Reject

---

# 💬 Resume Chat Assistant

Recruiters can ask:

```text
What projects has the candidate completed?

What programming languages does the candidate know?

Does the candidate have FastAPI experience?
```

The chatbot answers directly from resume content.

---

# 📊 Dashboard Screens

### Recruitment Dashboard

* Total Candidates
* Best Match Score
* Average Match Score
* Shortlisted Candidates

### Candidate Details

* Resume Viewer
* AI Summary
* ATS Scores

### Interview Pipeline

* Shortlisted Candidates
* Hiring Recommendations



---

# 📚 Learning Outcomes

This project provided hands-on experience with:

* FastAPI Development
* React & TypeScript
* Vector Databases
* ChromaDB
* Retrieval-Augmented Generation
* NLP
* Sentence Transformers
* Semantic Search
* Groq LLM Integration
* Full Stack AI Application Development

---

# 📸 Screenshots

Add screenshots here:


<img width="1910" height="920" alt="Screenshot 2026-06-23 205712" src="https://github.com/user-attachments/assets/f2c053ae-708a-4a86-bb61-1fb354649b05" />

<img width="1915" height="962" alt="Screenshot 2026-06-23 205737" src="https://github.com/user-attachments/assets/2a989c98-5701-4958-984e-2e231e30f514" />

<img width="1917" height="977" alt="Screenshot 2026-06-23 210101" src="https://github.com/user-attachments/assets/5e0171b9-aaa0-4fce-a7d0-0a4a19b79ad0" />

<img width="1918" height="967" alt="Screenshot 2026-06-23 210138" src="https://github.com/user-attachments/assets/c9a6353d-a0fe-4956-8a09-0fd808bc1738" />

<img width="1918" height="982" alt="Screenshot 2026-06-23 210158" src="https://github.com/user-attachments/assets/e96d67c0-d13b-4882-a815-d8d052c0a57e" />




---

# 👨‍💻 Author

**Muhammed Shamil P K**

