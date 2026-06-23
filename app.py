
print("APP LOADED")
import streamlit as st
from backend.parser import extract_from_pdf
from backend.skills import extract_skills
from backend.scorer import calculate_match_score
# from candidate import extract_email, extract_phone, extract_name

from backend.groq_utils import generate_candidate_summary,generate_interview_questions,answer_question
from backend.rag import retrieve_context
from backend.semantic_score import semantic_score




import backend.candidate_utils as candidate_utils
st.write(candidate_utils.__file__)


jd_text = st.text_area("Paste the Job Description")

st.title("AI Resume Screening System")



uploaded_file = st.file_uploader("Upload Resume PDF",type=["pdf"],accept_multiple_files=True)

import pandas as pd

results = []

if uploaded_file and jd_text:

    # Extract JD Skills once
    jd_skills = extract_skills(jd_text)

    for file in uploaded_file:

        # Extract Resume Text
        text = extract_from_pdf(file)

        # Extract Resume Skills
        resume_skills = extract_skills(text)

        # Calculate Match Score
        score = calculate_match_score(
            jd_skills,
            resume_skills
        )
        
        #semantic 
        semantic = semantic_score(
            jd_text,
            text
        )
        
        final_score=round(
            (0.4*score)+
            (0.6*semantic),2
        )
        
        if final_score>=75:
            recommendation = "✅ Strong Match"
        elif final_score >=50:
            recommendation = "🟡 Consider"
        else:
            recommendation ="❌ Weak Match"

        summary = generate_candidate_summary(text, jd_text)
        
        
        # Candidate Details
        try:
            name = candidate_utils.extract_name(text)
            email = candidate_utils.extract_email(text)
            phone = candidate_utils.extract_phone(text)
        except:
            name = "Not Found"
            email = "Not Found"
            phone = "Not Found"

        # Matched Skills
        matched = list(
            set(jd_skills).intersection(set(resume_skills))
        )

        # Missing Skills
        missing = list(
            set(jd_skills).difference(set(resume_skills))
        )

        results.append({
            "Resume": file.name,
            "Name": name,
            "Email": email,
            "Phone": phone,
            "Keyword Score": score,
            "Semantic Score": semantic,
            "Final Score": final_score,
            "Matched Skills": ", ".join(matched),
            "Missing Skills": ", ".join(missing),
            "Summary": summary
        })

    # Ranking Table
    df = pd.DataFrame(results)

    df = df.sort_values(
        by="Final Score",
        ascending=False
    )

    st.subheader("Candidate Ranking")
    
    
      
    st.dataframe(
        df,
        use_container_width=True
    )
    
    top_candidate = df.iloc[0]
    st.subheader("Top Candidate AI Evaluation")
    st.write(top_candidate["Summary"])
    
    
    
    if st.button("Generate Interview Questions"):
        
        questions = generate_interview_questions(
            text,
            jd_text
        )
        st.subheader("Interview Questions")
        st.write(questions)
        
    st.subheader("Chat With Resume")
    
    question = st.text_input("Ask About Candidate")
    
    if st.button("Ask Candidate"):
        context = retrieve_context(question)
        answer = answer_question(context,question)
        st.write(answer)
    
    csv = df.to_csv(index=False)
    
    st.download_button(
        label = "Download Results CSV",
        data = csv,
        file_name = "candidate_ranking.csv",
        mime = "text/csv"
    )