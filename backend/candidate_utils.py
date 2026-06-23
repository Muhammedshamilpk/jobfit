
print("CANDIDATE MODULE LOADED")
import re

def extract_email(text):

    pattern = r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
    emails = re.findall (pattern,text) 

    return emails[0] if emails else "no email found" 

def extract_phone(text):

    pattern = r'(\+91[\-\s]?\d{10}|\d{10})'
    phones = re.findall (pattern,text)

    return phones[0] if phones else "no phone found"

def extract_name(text):

    lines = text.split("\n")

    for line in lines[:10]:

        line = line.strip()

        if (
            len(line.split()) >= 2
            and len(line.split()) <= 5
            and line.isupper()
        ):
            return line

    return "Not Found"