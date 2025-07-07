# Cold Email SaaS – Advanced Edition ✉️🤖

A next‑gen outreach platform that *beats* Smartlead/Instantly with deep AI personalization, omnichannel steps, and deliverability autopilot.

## Feature Highlights
- Gemini‑powered copy with real‑time intel via Serper.dev  
- Reply intelligence (Hugging Face intent / sentiment)  
- BullMQ queues: warm‑up, rotation, domain‑health scans  
- LinkedIn DM integration via Phantombuster  
- Visual flow builder placeholder in dashboard  
- Stripe subscriptions + metered emails

## Quick Start

```bash
docker compose up -d   # Postgres + Redis
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

## Deployment

Deploy on **Vercel** (Next.js) and **Railway** (Postgres + Redis).
"# Coldemail" 
