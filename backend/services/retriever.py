import logging
from typing import List, Dict, Any
from pipeline.ingest.embedder import Embedder
from pipeline.ingest.vector_store import VectorStore

logger = logging.getLogger(__name__)

class Retriever:
    def __init__(self, vector_store: VectorStore, embedder: Embedder):
        self.vector_store = vector_store
        self.embedder = embedder

    def search(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """
        Retrieves context using Dense Vector Search (Qdrant) and BM25 (Sparse)
        For MVP, we just do dense vector search using Qdrant.
        """
        query_embedding = self.embedder.model.encode([query])[0].tolist()
        
        logger.info(f"Searching Qdrant for query: {query}")
        search_result = self.vector_store.client.search(
            collection_name=self.vector_store.collection_name,
            query_vector=query_embedding,
            limit=top_k
        )
        
        results = []
        for point in search_result:
            results.append({
                "text": point.payload.get("text", ""),
                "score": point.score,
                "metadata": {
                    "source": point.payload.get("source", "Unknown"),
                    "page": point.payload.get("page", 0)
                }
            })
            
        return results

# Normally instantiated per request or app lifespan
