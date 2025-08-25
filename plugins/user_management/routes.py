from fastapi import APIRouter, Depends, HTTPException
from core.auth import get_current_user
from models.user import UserUpdate
from config.database import db  # Ubah dari ..config jadi config
from utils.security import hash_password  # Ubah dari ..utils jadi utils

router = APIRouter(prefix="/user", tags=["user_management"])

@router.get("/me")
async def get_profile(username: str = Depends(get_current_user)):
    try:
        user = await db.users.find_one({"username": username})
        if not user:
            raise HTTPException(404, "User not found")
        return {"username": user["username"], "zodiac": user["zodiac"], "bio": user["bio"], "cosmo_points": user["cosmo_points"]}
    except Exception as e:
        from utils.logger import log_error  # Ubah dari ..utils jadi utils
        log_error(e)
        raise HTTPException(500, "Server error")

@router.put("/profile")
async def update_profile(update: UserUpdate, username: str = Depends(get_current_user)):
    try:
        update_data = update.dict(exclude_unset=True)
        if "password" in update_data:
            update_data["password"] = hash_password(update_data["password"])
        result = await db.users.update_one({"username": username}, {"$set": update_data})
        if result.modified_count == 0:
            raise HTTPException(400, "No changes made")
        return {"msg": "Profile updated"}
    except Exception as e:
        from utils.logger import log_error  # Ubah dari ..utils jadi utils
        log_error(e)
        raise HTTPException(500, "Server error")

@router.delete("/delete")
async def delete_account(username: str = Depends(get_current_user)):
    try:
        await db.users.update_one({"username": username}, {"$set": {"is_active": False}})
        return {"msg": "Account deactivated"}
    except Exception as e:
        from utils.logger import log_error  # Ubah dari ..utils jadi utils
        log_error(e)
        raise HTTPException(500, "Server error")