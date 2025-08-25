from fastapi import WebSocket, WebSocketDisconnect
from config.database import db  # Ubah dari ..config jadi config

connections = {}

async def handle_chat(websocket: WebSocket, room: str, username: str):
    await websocket.accept()
    if room not in connections:
        connections[room] = []
    connections[room].append(websocket)
    try:
        await websocket.send_text(f"{username} enters {room} Temple!")
        await db.messages.insert_one({"room": room, "username": username, "text": "entered", "timestamp": "now"})
        while True:
            data = await websocket.receive_text()
            await db.messages.insert_one({"room": room, "username": username, "text": data, "timestamp": "now"})
            for conn in connections[room]:
                await conn.send_text(f"{username}: {data}")
    except WebSocketDisconnect:
        connections[room].remove(websocket)
        for conn in connections[room]:
            await conn.send_text(f"{username} leaves {room} Temple!")
    except Exception as e:
        from utils.logger import log_error  # Ubah dari ..utils jadi utils
        log_error(e)