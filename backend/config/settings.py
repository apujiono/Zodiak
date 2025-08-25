from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file

MONGO_URI = os.getenv("mongodb+srv://zodiak-admin:T172L3iEbsRax2ZE@zodiak-cosmo.zjs0drb.mongodb.net/?retryWrites=true&w=majority&appName=zodiak-cosmo")
SECRET_KEY = os.getenv("SECRET_KEY")
ALLOWED_ORIGINS = ["http://localhost:3000", "https://your-frontend-url"]