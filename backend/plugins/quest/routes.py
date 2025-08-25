from fastapi import APIRouter, Depends
from ..core.auth import get_current_user
from ..config.database import db

router = APIRouter(prefix="/quest", tags=["quest"])

@router.get("/daily")
async def get_daily_quest(username: str = Depends(get_current_user)):
    try:
        quest = {"task": "Chat with 3 Saints", "reward": 10}
        return quest
    except Exception as e:
        from ..utils.logger import log_error
        log_error(e)
        raise HTTPException(500, "Server error")