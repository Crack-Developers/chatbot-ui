from fastapi import APIRouter, HTTPException, Query
import json, os, hashlib
from datetime import datetime, timedelta
from typing import Optional

router = APIRouter()
# Resolve absolute path so it works regardless of the working directory
JSON_DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "daily_news.json")
RETENTION_DAYS = 5


def _load_db() -> dict:
    if not os.path.exists(JSON_DB_PATH):
        return {}
    with open(JSON_DB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_db(data: dict):
    os.makedirs(os.path.dirname(JSON_DB_PATH), exist_ok=True)
    with open(JSON_DB_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def _last_n_dates(n: int) -> list[str]:
    return [(datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(n)]


# ─── GET all news (last 5 days, flat list) ───────────────────────────────────
@router.get("/daily-news")
async def get_all_news(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    date: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
):
    db = _load_db()
    valid_dates = set(_last_n_dates(RETENTION_DAYS))
    articles = []

    for day_key, day_data in db.items():
        if day_key not in valid_dates:
            continue
        for art in day_data.get("articles", []):
            articles.append(art)

    # filters
    if date:
        articles = [a for a in articles if a.get("date") == date]
    if category and category.lower() != "all":
        articles = [a for a in articles if a.get("tag", "").lower() == category.lower()]
    if priority and priority.lower() != "all":
        articles = [a for a in articles if a.get("priority", "").lower() == priority.lower()]
    if search:
        q = search.lower()
        articles = [a for a in articles if q in a.get("title", "").lower() or q in a.get("summary", "").lower()]

    articles.sort(key=lambda x: (x.get("date", ""), x.get("priority") == "high"), reverse=True)
    return {"articles": articles, "total": len(articles)}


# ─── GET full day data (overview + articles + categories) ─────────────────────
@router.get("/daily-news/day/{date}")
async def get_day_data(date: str):
    db = _load_db()
    if date not in db:
        raise HTTPException(404, f"No data found for {date}")
    day = db[date]
    # Normalize articles: handle both 'headline' (old) and 'title' (new) fields
    articles = []
    for a in day.get("articles", []):
        articles.append({
            **a,
            "title": a.get("title") or a.get("headline") or "Untitled",
            "tag": a.get("tag") or a.get("category") or "Polity",
            "summary": a.get("summary") or (a.get("analysis") or {}).get("summary") or "",
            "isImportant": a.get("isImportant") or a.get("is_most_important") or False,
        })
    return {
        "date": date,
        "title": day.get("title", f"UPSC Daily Briefing — {date}"),
        "overview": day.get("overview", ""),
        "categories": day.get("categories", {}),
        "source": day.get("source", "The Hindu + PIB"),
        "last_updated": day.get("last_updated", ""),
        "articles": articles,
        "total": len(articles),
    }


# ─── GET analysis for a specific date ────────────────────────────────────────
@router.get("/daily-news/analysis/{date}")
async def get_daily_analysis(date: str):
    db = _load_db()
    if date not in db:
        raise HTTPException(404, f"No analysis found for {date}")
    return db[date].get("analysis", {})


# ─── GET today's most important articles ─────────────────────────────────────
@router.get("/daily-news/important")
async def get_important_news():
    db = _load_db()
    today = datetime.now().strftime("%Y-%m-%d")
    day_data = db.get(today, {})
    important = [a for a in day_data.get("articles", []) if a.get("isImportant")]
    return {"articles": important, "date": today}


# ─── GET available dates (last 5 days that have data) ────────────────────────
@router.get("/daily-news/dates")
async def get_available_dates():
    db = _load_db()
    valid_dates = set(_last_n_dates(RETENTION_DAYS))
    available = sorted([d for d in db.keys() if d in valid_dates], reverse=True)
    return {"dates": available}


# ─── GET single article by id ─────────────────────────────────────────────────
@router.get("/daily-news/article/{article_id}")
async def get_article(article_id: str):
    db = _load_db()
    for day_data in db.values():
        for art in day_data.get("articles", []):
            if art.get("id") == article_id:
                return art
    raise HTTPException(404, "Article not found")


# ─── POST: Trigger pipeline manually ─────────────────────────────────────────
@router.post("/daily-news/run-pipeline")
async def run_pipeline_now():
    try:
        from pipeline.news_scheduler import run_pipeline
        result = run_pipeline()
        return {"status": "success", "message": result}
    except Exception as e:
        raise HTTPException(500, f"Pipeline error: {str(e)}")


# ─── DELETE: Cleanup old data ──────────────────────────────────────────────────
@router.delete("/daily-news/cleanup")
async def cleanup_old_data():
    db = _load_db()
    threshold = (datetime.now() - timedelta(days=RETENTION_DAYS)).strftime("%Y-%m-%d")
    old_keys = [k for k in db if k < threshold]
    for k in old_keys:
        del db[k]
    _save_db(db)
    return {"removed_dates": old_keys, "remaining_dates": list(db.keys())}


# ─── Health/stats ─────────────────────────────────────────────────────────────
@router.get("/daily-news/stats")
async def get_stats():
    db = _load_db()
    valid_dates = set(_last_n_dates(RETENTION_DAYS))
    total_articles = sum(len(v.get("articles", [])) for k, v in db.items() if k in valid_dates)
    return {
        "total_articles": total_articles,
        "dates_available": sorted([d for d in db if d in valid_dates], reverse=True),
        "last_updated": max(db.keys()) if db else None,
    }
