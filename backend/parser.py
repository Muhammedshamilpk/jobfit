import fitz  

def extract_from_pdf(pdf_file):
    
    
    pdf =fitz.open(stream=pdf_file.read(), filetype="pdf")
    
    text=""


    for page in pdf:
        text+=page.get_text()
        
    pdf.close()
    
    return text 

# with open ("shamil_resume_sabre.pdf","rb") as f:
#     print(extract_from_pdf(f))