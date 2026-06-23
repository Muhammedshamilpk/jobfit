
from parser import extract_from_pdf

SKILLS_DB={
    "python",
    "sql",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "flask",
    "django",
    "aws",
    "docker",
    "git",
    "power bi",
    "excel",
    "data analysis",
    "nlp",
    "numpy",
    "seaborn",
    "TensorFlow",
    "PyTorch",
    "Machine Learning",
    "NLP",
    "LangChain",
    "RAG",
    "FastAPI"
}

def extract_skills(text):
    text=text.lower()

    found_skills=[]

    for skills in SKILLS_DB:
        if skills in text:
            found_skills.append(skills)
    
    return list(set(found_skills))


