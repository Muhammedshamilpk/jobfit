def calculate_match_score(jd_skills,resume_skills):
    if len(jd_skills) == 0:
        return 0

    matched =set(jd_skills).intersection(set(resume_skills))
    
    score = (len(matched)/len(jd_skills)) * 100

    return round(score , 2)


