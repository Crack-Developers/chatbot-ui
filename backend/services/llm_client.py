import os
import requests
import json
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

class LLMClient:
    def __init__(self, provider: str = "groq"):
        self.provider = provider
        # Defaulting to Groq for DeepSeek-R1-70B for free and fast generation!
        self.api_key = os.environ.get("LLM_API_KEY", "YOUR_GROQ_API_KEY_HERE")
        
        if self.provider == "groq":
             # Groq is OpenAI-compatible natively
            self.base_url = "https://api.groq.com/openai/v1/chat/completions"
        elif self.provider == "together":
            self.base_url = "https://api.together.xyz/v1/chat/completions"
        else:
            self.base_url = "https://api.openai.com/v1/chat/completions"

    def generate(self, prompt: str, model: str = "deepseek-r1-distill-llama-70b", temperature: float = 0.3) -> str:
        """
        Calls the Remote LLM API.
        Default model is set to DeepSeek-R1 (Llama 70B Distill) via Groq.
        """
        if self.api_key == "YOUR_GROQ_API_KEY_HERE":
            logger.warning("No API key set. Returning mock response.")
            return f"[Mock {model} Response] - API call goes here once keys are set."

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": model, # deepseek-r1-distill-llama-70b on Groq
            "messages": [{"role": "user", "content": prompt}],
            "temperature": temperature,
            "max_completion_tokens": 2048 # Groq uses max_completion_tokens 
        }
        
        try:
            logger.info(f"Calling {model} via {self.provider.upper()} API...")
            response = requests.post(self.base_url, headers=headers, json=payload)
            
            if response.status_code != 200:
                logger.error(f"API Error: {response.text}")
                return "Error: Could not retrieve answer from API. Check your API key."

            result = response.json()
            # DeepSeek on Groq returns `<think>...</think>` blocks natively inside the content!
            return result["choices"][0]["message"]["content"]
            
        except Exception as e:
            logger.error(f"LLM API Request Error: {str(e)}")
            return "Error calling LLM."

# Singleton instance
llm_client = LLMClient(provider="groq")
