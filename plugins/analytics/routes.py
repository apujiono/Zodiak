from fastapi import APIRouter, Depends, HTTPException
from ..core.auth import get_current_user
from ..config.database import db

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/stats")
async def get_stats(username: str = Depends(get_current_user)):
    try:
        user = await db.users.find_one({"username": username})
        if user.get("role") != "admin":
            raise HTTPException(403, "Admins only")
        total_users = await db.users.count_documents({"is_active": True})
        total_messages = await db.messages.count_documents({})
        zodiac_dist = await db.users.aggregate([
            {"$group": {"_id": "$zodiac", "count": {"$sum": 1}}}
        ]).to_list(None)
        return {
            "total_users": total_users,
            "total_messages": total_messages,
            "zodiac_distribution": {item["_id"]: item["count"] for item in zodiac_dist}
        }
    except Exception as e:
        from ..utils.logger import log_error
        log_error(e)
        raise HTTPException(500, "Server error")