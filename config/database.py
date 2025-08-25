from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import MONGO_URI
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client["zodiak_db"]
    logger.info("Connected to MongoDB Atlas")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {str(e)}")
    raise

async def init_db():
    try:
        # Create indexes for performance
        await db.users.create_index("username", unique=True)
        await db.messages.create_index("room")
        logger.info("MongoDB indexes created successfully")
    except Exception as e:
        logger.error(f"Failed to create indexes: {str(e)}")
        raise