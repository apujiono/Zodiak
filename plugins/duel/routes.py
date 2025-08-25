from fastapi import APIRouter, Depends, HTTPException
from core.auth import get_current_user
from .logic import calculate_duel

router = APIRouter(prefix="/duel", tags=["duel"])

@router.get("/start/{opponent}")
async def start_duel(opponent: str, user: str = Depends(get_current_user)):
    try:
        result = calculate_duel(user, opponent)
        return {"msg": f"{user} vs {opponent}: {result}"}
    except Exception as e:
        from utils.logger import log_error  # Ubah dari ..utils jadi utils
        log_error(e)
        raise HTTPException(500, "Server error")