from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from pydantic import BaseModel
from ..utils.security import hash_password, verify_password
from ..config.database import db
from ..config.settings import SECRET_KEY

security = HTTPBearer()

class User(BaseModel):
    username: str
    password: str
    zodiac: str

async def get_current_user(creds: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(creds.credentials, SECRET_KEY, algorithms=["HS256"])
        return payload["sub"]
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

async def register(user: User):
    try:
        existing = await db.users.find_one({"username": user.username})
        if existing:
            raise HTTPException(400, "User exists")
        hashed_pw = hash_password(user.password)
        await db.users.insert_one({
            "username": user.username,
            "password": hashed_pw,
            "zodiac": user.zodiac,
            "cosmo_points": 0,
            "role": "user",
            "is_active": True,
            "bio": ""
        })
        return {"msg": "Registered"}
    except Exception as e:
        from ..utils.logger import log_error
        log_error(e)
        raise HTTPException(500, "Server error")

async def login(user: User):
    try:
        db_user = await db.users.find_one({"username": user.username})
        if not db_user or not verify_password(user.password, db_user["password"]):
            raise HTTPException(400, "Invalid credentials")
        token = jwt.encode({"sub": user.username}, SECRET_KEY)
        return {"token": token}
    except Exception as e:
        from ..utils.logger import log_error
        log_error(e)
        raise HTTPException(500, "Server error")

async def logout():
    return {"msg": "Logged out"}