import os
import spacy
from spacy.cli import download
import params

os.environ['KMP_DUPLICATE_LIB_OK']='True'

def extract_keywords_spacy(job_desc):
    # Load the spaCy model
    try:
        nlp = spacy.load("en_core_web_sm")
        print(f"{params.MODEL_SPACY} is already installed.")
    except OSError:
        # If the model is not installed, catch the OSError and install the model
        print(f"{params.MODEL_SPACY} not found, installing...")
        download(params.MODEL_SPACY)
        # Load the model after installation to verify
        try:
            nlp = spacy.load(params.MODEL_SPACY)
            print(f"{params.MODEL_SPACY} has been successfully installed.")
        except OSError:
            print(f"Failed to install {params.MODEL_SPACY}. Please check your installation.")
    # Process the job description text
    doc = nlp(job_desc)
    
    # Initialize a list to store keywords
    keywords = []
    
    # Add proper nouns, nouns, and verbs to the keywords list
    for token in doc:
        if token.pos_ in ['PROPN', 'NOUN', 'VERB']:
            # Add the token's lemma to the list of keywords if it's not a stop word
            if not token.is_stop:
                keywords.append(token.lemma_)
    
    # Use a set to remove duplicates, then convert back to list
    unique_keywords = list(set(keywords))
    
    return unique_keywords

if __name__ == "__main__":
    job_desc = open("dummyjob.txt", "r").read()
    keywords = extract_keywords_spacy(job_desc)
    print(keywords)
