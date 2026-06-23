from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = Groq(
    api_key=GROQ_API_KEY
)

def generate_candidate_summary(resume_text,jd_text):
    
    
    prompt = f"""
     You are an ATS recruiter.

    Job Description:
    {jd_text}

    Resume:
    {resume_text}

    Analyze the candidate and provide:

    1. Professional Summary
    2. Strengths
    3. Weaknesses
    4. Hiring Recommendation

    Keep the response concise.
    """
    
    response = client.chat.completions.create(
         model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    
    return response.choices[0].message.content

def generate_interview_questions(resume_text,jd_text):
    
    prompt=f"""
    job_description:
    {jd_text}
    
    Resume:
    {resume_text}
    
   Generate EXACTLY 10 technical interview questions.

STRICT RULES:
1. Return ONLY questions.
2. Do NOT explain the questions.
3. Do NOT provide answers.
4. Do NOT provide descriptions.
5. Do NOT write introductory text.
6. Do NOT write concluding text.
7. Each line must contain only one question.
8. Number the questions from 1 to 10.

Example Output:

1. What is TF-IDF?
2. Explain cosine similarity.
3. What is RAG?
4. How does FastAPI work?

Now generate the questions.
        
    """
    
    response = client.chat.completions.create(
        model = "llama-3.3-70b-versatile",
        messages=[
            {
            "role":"user",
            "content":prompt
            }
        ]
    )
    return response.choices[0].message.content

def answer_question(context,question):
    
    prompt = f"""
    Context:
    {context}
    
    
    Question:
    {question}
    
    Answer only using the context provided.
    If the answer is not found, say:
    'Information not found in resume.'
    """
    
    response = client.chat.completions.create(
        model = "llama-3.3-70b-versatile",
        messages = [
            {
                "role":"user",
                "content":prompt
            }
        ]
    )
    
    return response.choices[0].message.content

def ask_resume_chat(question,resume_text):
    
    
    prompt = f"""
    
    You are an ATS assistant .
    
    Resume Context:
    {resume_text}
    
    Question:
    {question}
    
    Answer only using the resume.
    """
    
    response = client.chat.completions.create(
        model = "llama-3.1-8b-instant",
        messages = [
            {
                    "role":"user",
                    "content":prompt
                }
            ]
        )
    return response.choices[0].message.content
    