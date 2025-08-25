from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file

MONGO_URI = os.getenv("mongodb+srv://apujiono11:jaA64xwDjTsIr04C@zodiak-cosmo.zjs0drb.mongodb.net/?retryWrites=true&w=majority&appName=zodiak-cosmo")

SECRET_KEY = os.getenv("superrahasia123")
ALLOWED_ORIGINS = ("https://zodiak-production.up.railway.app")