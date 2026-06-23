from langchain_text_splitters import RecursiveCharacterTextSplitter  
from sentence_transformers import SentenceTransformer
import chromadb
import uuid 


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

client = chromadb.PersistentClient(
    path="/.chroma_db"
)


collection=client.get_or_create_collection(
    name="resumes"
)

def chunk_text(text):
    
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap = 100
    )
    
    return splitter.split_text(text)

def create_embeddings(chunks):
    
    embeddings = model.encode(chunks)
    
    return embeddings

def store_resumes(text):
    chunks = chunk_text(text)
    
    embeddings = create_embeddings(chunks)
    
    ids = [
        str(uuid.uuid4()) 
        for _ in range(len(chunks))
        ]
    
    collection.add(
        documents=chunks,
        embeddings=embeddings.tolist(),
        ids=ids
    )
    
    return len(chunks)

def search_resume(query):
    
    query_embedding = model.encode(query)
    
    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=3
    ) 
    
    return results["documents"][0]

def retrieve_context(query):
    
    print("Documents:",collection.count())
    
    query_embedding = model.encode(query)
    
    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results = 3
    )
    
    docs = results["documents"][0]
    
    return "\n".join(docs)