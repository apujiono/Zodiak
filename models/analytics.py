from pydantic import BaseModel
from typing import Dict

class Stats(BaseModel):
    total_users: int
    total_messages: int
    zodiac_distribution: Dict[str, int]