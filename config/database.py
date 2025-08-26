from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import MONGO_URI  # Asumsi MONGO_URI ada di settings.py
import logging

# Setup logging biar bisa cek error
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client["zodiak_db"]  # Nama database-mu
    logger.info("Connected to MongoDB Atlas")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {str(e)}")
    raise  # Raise error biar app nggak jalan kalau koneksi gagal

async def init_db():
    try:
        # Bikin index untuk collection users (unique username)
        await db.users.create_index("username", unique=True)
        # Bikin index untuk messages (filter berdasarkan room)
        await db.messages.create_index("room")
        logger.info("MongoDB indexes created successfully")
    except Exception as e:
        logger.error(f"Failed to create indexes: {str(e)}")
        raise  # Raise error kalau index gagal, biar app crash dan kamu tahu masalahnya

# Kalau mau panggil init_db() saat app start, tambahin di main.py pake lifespan
# Contoh di main.py:
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await init_db()
    except Exception as e:
        logger.error(f"Startup failed: {str(e)}")
        raise
    yield