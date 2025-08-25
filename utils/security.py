import bcrypt
import jwt
from config.settings import SECRET_KEY

def hash_password(pw: str):
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt())

def verify_password(pw: str, hashed: str):
    return bcrypt.checkpw(pw.encode(), hashed)

def create_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm="HS256")