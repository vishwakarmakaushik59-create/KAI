Deployment Guide
================

1) Backend (Render)
   - Create account on render.com
   - New -> Web Service -> Connect GitHub repo -> backend directory
   - Set environment variables (RAZORPAY keys, FIREBASE service account if used)
   - Deploy

2) Frontend (Vercel)
   - Create account on vercel.com
   - Import GitHub repo -> frontend directory
   - Add env variables: VITE_BACKEND_URL, VITE_RAZORPAY_KEY_ID
   - Deploy

3) Firebase
   - Create project, enable Auth (Phone), Firestore, Storage
   - Get config and add to frontend (safest: use server-side tokens or env vars)

4) Domain
   - Use GitHub Pages / Vercel custom domain or Freenom free domain
   - Point CNAME to hosting provider

5) Webhooks
   - When backend is live, set webhook URL in Razorpay dashboard to <https://your-backend.com/webhook>
