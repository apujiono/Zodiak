from motor.motor_asyncio import AsyncIOMotorClient
from .settings import MONGO_URI

client = AsyncIOMotorClient(MONGO_URI)
db = client["zodiak_db"]

# Tambah index untuk performa
async def init_db():
    await db.users.create_index("username")
    await db.messages.create_index("room")
init_db()