from fastapi import FastAPI,UploadFile,File,Form
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from parser import extract_from_pdf
from skills import extract_skills
from scorer import calculate_match_score
from semantic_score import semantic_score
from groq_utils import generate_candidate_summary,ask_resume_chat
from candidate_utils import extract_email,extract_phone,extract_name
from rag import store_resumes, collection ,retrieve_context
from pydantic import BaseModel
import os
from typing import List

class ChatRequest(BaseModel):
    query:str
    resume_text:str


app = FastAPI()
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
candidates = []
@app.get("/")
def home():
    
    return{
        "message":"JobFit Backend is running"
    }
    
@app.post("/analyze_resume")
async def analyze_resume(files:List[UploadFile] =File(...),jd_text:str = Form(...)):
     
    os.makedirs("uploads", exist_ok=True)
    
    results=[]

    for file in files:
    
        file_path = f"uploads/{file.filename}"
        contents = await file.read()

        with open(file_path, "wb") as f:
            f.write(contents)
        
        from io import BytesIO
        #Extract PDF text
        text = extract_from_pdf(BytesIO(contents))
        
        store_resumes(text)
        
        
        
        jd_skills = extract_skills(jd_text)
        resume_skills = extract_skills(text)
        
        
        name = extract_name(text)
        email= extract_email(text)
        phone = extract_phone(text)
        keyword_score = calculate_match_score(
            jd_skills,
            resume_skills
        )

        semantic = semantic_score(
            jd_text,
            text
        )

        final_score = round(
            (0.4 * keyword_score) +
            (0.6 * semantic),
            2
        )

        summary = generate_candidate_summary(
        text,
        jd_text
        )
        summary = summary.replace("**", "")
        
        
        if final_score >= 85:
            recommendation = "Strong Match"
        elif final_score >= 70:
            recommendation = "Consider"
        else:
            recommendation = "Reject"
            

            
        candidates_data = {
            "name":name,
            "email":email,
            "phone":phone,
            "keyword_score":keyword_score,
            "semantic_score":semantic,
            "final_score":final_score,
            "recommendation":recommendation,
            "summary":summary,
            "resume_text":text,
            "resume_file":file_path,
            "interview_status": "Pending",
        }
        
        candidates.append(candidates_data)
        
        results.append(candidates_data)

    return results
        
@app.get("/candidates")
def get_candidates():
    return sorted(
        candidates,
        key=lambda x:x["final_score"],
        reverse = True
    )
    
    
    
@app.get("/api/analytics")
def analytics():

    total = len(candidates)

    if total == 0:
        return {
            "totalResumes": 0,
            "topScore": 0,
            "avgScore": 0,
            "shortlisted": 0
        }

    top_score = max(
        candidate["final_score"]
        for candidate in candidates
    )

    avg_score = round(
        sum(
            candidate["final_score"]
            for candidate in candidates
        ) / total,
        2
    )

    shortlisted = len([
        c for c in candidates
        if c["recommendation"] != "Reject"
    ])

    return {
        "totalResumes": total,
        "topScore": top_score,
        "avgScore": avg_score,
        "shortlisted": shortlisted
    }
    
@app.post("/upload_resume")
async def upload_resume(file:UploadFile = File(...)):
    
    text = extract_from_pdf(file.file)
    
    name = extract_name(text)
    email= extract_email(text)
    phone = extract_phone(text)
    
    
    return {
        "name":name,
        "email":email,
        "phone":phone,
        "characters":len(text),
        
    }
    
@app.get("/db_count")
def db_count():
    return {
        "documents":collection.count()
    }
    
@app.post("/chat")
async def chat(data:ChatRequest):
    
    context = retrieve_context(data.query)
    
    answer = ask_resume_chat(
        data.query,
        data.resume_text
    )
    
    return {
        "answer":answer
    }
    
@app.delete("/db_clear")
def db_clear():

    data = collection.get()

    if data["ids"]:
        collection.delete(ids=data["ids"])

    return {
        "message": "Database cleared successfully"
    }
    
@app.delete("/clear_candidates")
def clear_candidates():
    candidates.clear()

    return {
        "message": "Candidates cleared"
    }