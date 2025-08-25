# Zodiak Cosmo Chat

A *Saint Seiya*-themed chat app with real-time chat, user management, analytics, and offline support.

## Setup

### Backend
1. Install dependencies: `pip install -r backend/requirements.txt`
2. Set environment variables in `backend/config/settings.py`
3. Run: `uvicorn backend.main:app --reload`

### Frontend
1. Install dependencies: `npm install`
2. Run: `npm start`
3. Build for production: `npm run build`

## Deploy
- Backend: Railway (set MONGO_URI, SECRET_KEY)
- Frontend: Vercel

## Features
- Login/Register/Logout
- Real-time chat with zodiac themes
- User profile management
- Analytics dashboard (admin only)
- Offline support via PWA