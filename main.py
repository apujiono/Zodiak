from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from plugins.chat.routes import router as chat_router
from plugins.duel.routes import router as duel_router
from plugins.quest.routes import router as quest_router
from plugins.user_management.routes import router as user_router
from plugins.analytics.routes import router as analytics_router
from core.auth import register, login, logout
from config.settings import ALLOWED_ORIGINS
from config.database import init_db
from contextlib import asynccontextmanager
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(duel_router)
app.include_router(quest_router)
app.include_router(user_router)
app.include_router(analytics_router)

app.post("/register")(register)
app.post("/login")(login)
app.get("/logout")(logout)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/", response_class=HTMLResponse)
async def serve_html(request: Request):
    try:
        with open("index.html", "r") as f:
            logger.info("Serving index.html")
            return HTMLResponse(content=f.read(), status_code=200)
    except FileNotFoundError:
        logger.error("index.html not found")
        return HTMLResponse(content="<h1>500 - Internal Server Error</h1>", status_code=500)
    except Exception as e:
        logger.error(f"Error serving HTML: {str(e)}")
        return HTMLResponse(content="<h1>500 - Internal Server Error</h1>", status_code=500)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        logger.info("Initializing database")
        await init_db()
        logger.info("Database initialization completed")
    except Exception as e:
        logger.error(f"Startup failed: {str(e)}")
        raise
    yield

app.lifespan = lifespan

# Serve static files (CSS, JS)
app.mount("/static", StaticFiles(directory="."), name="static")