from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str
    zodiac: str

class UserUpdate(BaseModel):
    username: str | None
    password: str | None
    zodiac: str | None
    bio: str | None