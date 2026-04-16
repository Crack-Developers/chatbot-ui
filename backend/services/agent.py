from .llm_client import llm_client
import logging

logger = logging.getLogger(__name__)

class AgenticLoop:
    def __init__(self):
        # We would initialize LangGraph StateGraph here in production
        self.max_retries = 3

    def decompose_query(self, query: str) -> list[str]:
        """
        Breaks down complex query into sub-queries.
        Example: "Compare 1919 and 1935 Acts" -> ["Features of 1919 Act", "Features of 1935 Act"]
        """
        prompt = f"Decompose this UPSC query into sub-questions if needed: '{query}'. If simple, return as is."
        response = llm_client.generate(prompt, model="Qwen/Qwen2.5-7B-Instruct")
        return [query] # Mock returning original for now

    def process(self, query: str) -> str:
        """
        1. Decompose Query
        2. Retrieve Chunks per sub-query
        3. Rerank
        4. Self-Correct (if not relevant, re-query)
        5. Generate final answer
        """
        logger.info(f"Agentic Loop starting for: {query}")
        sub_queries = self.decompose_query(query)
        
        # Mocking Retrieval
        retrieved_context = "Mock context from Vector Store: The Government of India Act 1919 introduced Dyarchy."
        
        # Final Generation Prompt
        final_prompt = f"""
        You are an expert UPSC Mentor. Answer the following question using ONLY the provided context.
        Cite your sources.
        
        Context: {retrieved_context}
        Question: {query}
        """
        
        final_answer = llm_client.generate(final_prompt, model="deepseek-ai/DeepSeek-R1-Chat")
        return final_answer

# Singleton instance
agent = AgenticLoop()
