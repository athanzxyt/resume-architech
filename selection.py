from sklearn.metrics.pairwise import cosine_similarity

def cls_pooling(model_output):
    return model_output.last_hidden_state[:, 0]

def get_embeddings(text_list):
    encoded_input = tokenizer(
        text_list, padding=True, truncation=True, return_tensors="tf"
    )
    encoded_input = {k: v for k, v in encoded_input.items()}
    model_output = model(**encoded_input)
    return cls_pooling(model_output)

if __na == "__main__":
    job_desc = open("dummyjob.txt", "r").read()
    query_embedding = get_embeddings(job_desc).numpy()
    data['similarity'] = data["embedding"].apply(lambda x: cosine_similarity(query_embedding, x))

    # rank the bullets by simliarty and then print the top 5
    data = data.sort_values(by='similarity', ascending=False)
    print(data['bullet'].head(5))