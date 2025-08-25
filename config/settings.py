from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file

MONGO_URI = os.getenv("MONGO_URI=mongodb+srv://apujiono11:6M4Lath4xt0qXxfI@tuyul.yb1kw0z.mongodb.net/?retryWrites=true&w=majority&appName=Tuyul
FLASK_SECRET_KEY=umyWDQweHet4varHDoT7o9T0jrYKJhSL")
SECRET_KEY = os.getenv("superrahasia123")
ALLOWED_ORIGINS = ["http://localhost:8000", "https://your-frontend-url"]