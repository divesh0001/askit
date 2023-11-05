import torch
from transformers import AutoTokenizer, AutoModel
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Load a pre-trained BERT model and tokenizer
model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

# Define a query and a set of documents
query = "natural language processing"
documents = [
    "NLP is a subfield of artificial intelligence.",
    "BERT is a powerful model used in NLP tasks.",
    "Information retrieval is crucial in NLP.",
    "Basketball is a popular sport."
]

# Tokenize the query and documents
query_tokens = tokenizer(query, padding=True, truncation=True, return_tensors="pt")
document_tokens = tokenizer(documents, padding=True, truncation=True, return_tensors="pt", many_docs=True)

# Get embeddings for the query and documents
with torch.no_grad():
    query_embeddings = model(**query_tokens).last_hidden_state.mean(dim=1)
    document_embeddings = model(**document_tokens).last_hidden_state.mean(dim=1)

# Calculate cosine similarity between query and documents
similarities = cosine_similarity(query_embeddings, document_embeddings)

# Rank the documents by similarity
ranked_documents = np.argsort(similarities, axis=1)[0][::-1]

# Print the ranked documents
for i, idx in enumerate(ranked_documents):
    print(f"Rank {i + 1}: {documents[idx]}")