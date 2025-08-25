from motor.motor_asyncio import AsyncIOMotorClient
from .settings import MONGO_URI

# Inisialisasi MongoDB client
client = AsyncIOMotorClient(MONGO_URI)
db = client["zodiak_db"]  # Nama database: zodiak_db