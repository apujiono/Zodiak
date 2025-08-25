from pydantic import BaseModel

class Message(BaseModel):
    room: str
    username: str
    text: str
    timestamp: str