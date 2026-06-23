from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import  cosine_similarity



model = None

def get_model():
    global model
    
    if model is None:
        model = SentenceTransformer(
                "all-MiniLM-L6-v2"
        )

    return model
def semantic_score(jd_text,resume_text):
    
    model = get_model()
    
    jd_embedding = model.encode([jd_text])
    
    resume_embedding = model.encode([resume_text])
    
    score = cosine_similarity(
        jd_embedding.reshape(1,-1),
        resume_embedding.reshape(1,-1)
    )[0][0]
    
    return float(round(score *100,2))


