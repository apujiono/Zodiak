from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from ..core.auth import get_current_user
from .websocket import handle_chat

router = APIRouter(prefix="/chat", tags=["chat"])

@router.websocket("/{room}")
async def websocket_chat(websocket: WebSocket, room: str, username: str = Depends(get_current_user)):
    await handle_chat(websocket, room, username)