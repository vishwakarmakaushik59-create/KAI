KAI - Full Starter Kit
======================

This repository is a full starter kit for KAI (frontend + backend + branding + deployment instructions).
It's designed so you can copy it directly into a GitHub repository and deploy.

Structure:
- backend/    -> Node/Express Razorpay backend
- frontend/   -> Vite + React frontend (dark glass UI)
- branding/   -> About, Tagline, Splash texts
- deployment/ -> Deploy guides for Vercel / Render / Firebase

Quick local run (frontend + backend):
1) Backend:
   cd backend
   cp .env.example .env
   # fill in keys
   npm install
   npm run dev

2) Frontend:
   cd frontend
   npm install
   npm run dev
   Open http://localhost:5173

Important:
- Do NOT commit real secrets to GitHub. Use GitHub secrets / environment variables in deployments.
- Add your Firebase & Razorpay keys to backend .env (never to frontend).
