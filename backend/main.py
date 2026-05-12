from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, generate, news
import logging, threading, time
from contextlib import asynccontextmanager

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    t = threading.Thread(target=_run_background_scheduler, daemon=True)
    t.start()
    logger.info("[Startup] Background news pipeline scheduler launched.")
    yield

app = FastAPI(title="UPSC AI Chatbot API", version="2.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/v1")
app.include_router(generate.router, prefix="/api/v1")
app.include_router(news.router, prefix="/api/v1")


def _run_background_scheduler():
    """Runs the news pipeline scheduler in a background thread."""
    import schedule as sched
    try:
        import sys, os
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
        from pipeline.news_scheduler import run_pipeline, daily_cleanup_and_run
        logger.info("[Scheduler] Starting background news pipeline (2x daily)...")
        run_pipeline()          # Run once on startup
        sched.every().day.at("08:00").do(run_pipeline)
        sched.every().day.at("20:00").do(run_pipeline)
        sched.every().day.at("06:00").do(daily_cleanup_and_run)
        while True:
            sched.run_pending()
            time.sleep(60)
    except Exception as e:
        logger.error(f"[Scheduler] Background scheduler error: {e}")


@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "2.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
