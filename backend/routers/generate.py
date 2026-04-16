from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

class GenerationRequest(BaseModel):
    subject: str
    topic: str
    difficulty: str = "medium"

@router.post("/generate/prelims")
async def generate_prelims(request: GenerationRequest):
    """
    Generates Prelims MCQ in UPSC format based on the subject and topic.
    """
    return {
        "question": f"Sample MCQ for {request.subject} - {request.topic}",
        "options": ["A", "B", "C", "D"],
        "answer": "A",
        "explanation": "Because it is in the database."
    }

@router.post("/generate/mains")
async def generate_mains(request: GenerationRequest):
    """
    Generates Mains question and structured answer.
    """
    return {
        "question": f"Evaluate the impact of {request.topic} on {request.subject}.",
        "answer_structure": {
            "introduction": "Introductory sentence here.",
            "body_points": ["Point 1", "Point 2"],
            "conclusion": "Conclusion here."
        }
    }
