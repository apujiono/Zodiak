from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from plugins.chat.routes import router as chat_router
from plugins.duel.routes import router as duel_router
from plugins.quest.routes import router as quest_router
from plugins.user_management.routes import router as user_router
from plugins.analytics.routes import router as analytics_router
from core.auth import register, login, logout
from config.settings import ALLOWED_ORIGINS
from config.database import init_db
from contextlib import asynccontextmanager

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

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()  # Jalankan init_db saat startup
    yield  # App jalan
    # Optional: cleanup code saat shutdown
    # Misalnya: client.close() kalau pake MongoDB

app.lifespan = lifespan