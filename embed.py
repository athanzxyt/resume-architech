import os
import pandas as pd
from transformers import AutoTokenizer, TFAutoModel
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
import params
import json

os.environ['KMP_DUPLICATE_LIB_OK']='True'

def cls_pooling(model_output):
    return model_output.last_hidden_state[:, 0]

def get_embeddings(text_list):
    encoded_input = tokenizer(
        text_list, padding=True, truncation=True, return_tensors="tf"
    )
    encoded_input = {k: v for k, v in encoded_input.items()}
    model_output = model(**encoded_input)
    return cls_pooling(model_output)

def embed_data(data):
    data["embedding"] = data["bullet"].apply(lambda x: get_embeddings(x).numpy())
    return data

if __name__ == "__main__":

    # Step 1: Load the data
    data = []
    with open("dummydata.json", "r") as f:
        json_data = json.load(f)
        for project in json_data:
            for bullet in json_data[project]['bullets']:
                data.append((bullet, json_data[project]['title']))
    data = pd.DataFrame(data, columns=["bullet", "title"])

    # Step 2: Embed the data
    tokenizer = AutoTokenizer.from_pretrained(params.model_ckpt)
    model = TFAutoModel.from_pretrained(params.model_ckpt, from_pt=True)
    data["embedding"] = data["bullet"].apply(lambda x: get_embeddings(x).numpy())


    job_desc = open("dummyjob.txt", "r").read()
    query_embedding = get_embeddings(job_desc).numpy()
    data['similarity'] = data["embedding"].apply(lambda x: cosine_similarity(query_embedding, x))

    # rank the bullets by simliarty and then print the top 5
    data = data.sort_values(by='similarity', ascending=False)
    print(data['bullet'].head(5))


    # # Step 3: Store
    # client = MongoClient(params.mongodb_conn_string)
    # collection = client[params.db_name][params.collection_name]

    # # Reset w/out deleting the Search Index 
    # collection.delete_many({})

    # # Insert the documents in MongoDB Atlas with their embedding
    # # https://github.com/hwchase17/langchain/blob/master/langchain/vectorstores/mongodb_atlas.py
    # docsearch = MongoDBAtlasVectorSearch.from_documents(
    #     docs, embeddings, collection=collection, index_name=params.index_name
    # )