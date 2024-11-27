import numpy as np
from typing import List, Dict, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy.orm import Session
from ..core.models import Document

class VectorSearchService:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=5000,
            stop_words='english'
        )
        self.document_vectors = None
        self.document_ids = None

    def index_documents(self, db: Session):
        """Index all documents in the database"""
        documents = db.query(Document).all()

        if not documents:
            return

        texts = [doc.content for doc in documents]
        self.document_ids = [doc.id for doc in documents]

        # Create document vectors using TF-IDF
        self.document_vectors = self.vectorizer.fit_transform(texts)

    def search(self, query: str, limit: int = 10) -> List[Tuple[int, float]]:
        """Search for documents similar to the query"""
        if self.document_vectors is None:
            return []

        # Transform query to vector
        query_vector = self.vectorizer.transform([query])

        # Calculate similarity scores
        similarities = cosine_similarity(query_vector, self.document_vectors)[0]

        # Get top results
        top_indices = np.argsort(similarities)[-limit:][::-1]

        return [
            (self.document_ids[idx], float(similarities[idx]))
            for idx in top_indices
            if similarities[idx] > 0
        ]

    def find_similar_documents(self, doc_id: int, limit: int = 5) -> List[Tuple[int, float]]:
        """Find documents similar to a given document"""
        if self.document_vectors is None:
            return []

        try:
            doc_index = self.document_ids.index(doc_id)
        except ValueError:
            return []

        doc_vector = self.document_vectors[doc_index]
        similarities = cosine_similarity(doc_vector, self.document_vectors)[0]

        # Get top results (excluding the document itself)
        top_indices = np.argsort(similarities)[-(limit+1):][::-1]

        # Remove the query document from results
        results = [
            (self.document_ids[idx], float(similarities[idx]))
            for idx in top_indices
            if self.document_ids[idx] != doc_id and similarities[idx] > 0
        ]

        return results[:limit]
