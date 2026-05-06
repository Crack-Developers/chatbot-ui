from fastapi import APIRouter, HTTPException
import json
import os
from datetime import datetime

router = APIRouter()

JSON_DB_PATH = "data/daily_news.json"

@router.get("/daily-news/{date}")
async def get_daily_news(date: str):
    """
    Fetch news analysis for a specific date.
    Format: YYYY-MM-DD
    """
    if not os.path.exists(JSON_DB_PATH):
        # Fallback for demo if no data exists yet
        return {"error": "No news data found. Run the scraper pipeline first."}

    try:
        with open(JSON_DB_PATH, 'r') as f:
            db_content = json.load(f)
        
        if date in db_content:
            return db_content[date]
        else:
            raise HTTPException(status_code=404, detail=f"No news found for {date}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/daily-news/latest")
async def get_latest_news():
    """Fetch the most recent news analysis available"""
    if not os.path.exists(JSON_DB_PATH):
        return {"error": "No news data found."}

    try:
        with open(JSON_DB_PATH, 'r') as f:
            db_content = json.load(f)
        
        if not db_content:
            return {"error": "Database is empty."}
            
        # Get the latest date
        dates = sorted(db_content.keys(), reverse=True)
        return db_content[dates[0]]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
