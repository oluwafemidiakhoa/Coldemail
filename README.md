<!-- README.md -->

<h1 align="center">
  Cold Email SaaS&nbsp;🚀📧
</h1>

<p align="center">
  <em>AI-personalised, omni-channel outreach & deliverability autopilot — built with Gemini, OpenAI, Serper.dev, Hugging Face, Stripe, Prisma & BullMQ.</em>
</p>

<div align="center">
  <a href="#-features">Features</a> •
  <a href="#-stack">Stack</a> •
  <a href="#-quick-start">Quick&nbsp;Start</a> •
  <a href="#-deploy">Deploy</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contributing">Contributing</a>
</div>

---

## ✨ Why This Project?

Every cold-email platform promises “personalisation.”  
Few actually reference a prospect’s **fresh news, funding rounds, or blog posts**. Even fewer combine **LinkedIn DMs**, spam-score checks, **warm-up automation**, and an **AI Copilot** that writes and adapts sequences for you.

**Cold Email SaaS** ships all that in an extensible, developer-friendly codebase so you can launch your own outreach product or internal tool in days, not months.

---

## 💎 Features
| Category | Highlights |
| -------- | ---------- |
| **AI Copy** | • Gemini-powered email generation<br>• OpenAI fallback & tone tweaks<br>• Hugging Face sentiment & intent tagging |
| **Lead Intel** | • Serper.dev Google Search → inject latest headlines, funding, blog posts into prompts |
| **Deliverability** | • Domain health scan (SPF / DKIM / DMARC)<br>• Warm-up queue (BullMQ + Redis)<br>• Inbox rotation placeholders |
| **Omni-Channel** | • LinkedIn DM queue via Phantombuster<br>• Placeholder for X / WhatsApp steps |
| **Billing** | • Stripe subscriptions **+ metered emails** |
| **DX** | • TypeScript, Prisma, Next.js 14, Tailwind<br>• Docker Compose for Postgres ± Redis<br>• GitHub Actions CI template |

---

## 🛠 Stack

| Layer | Tech |
| ----- | ---- |
| Front-end | **Next.js 14** (App Router) • Tailwind CSS |
| Back-end | **Next.js API** routes • Node 20 • TypeScript |
| Database | **PostgreSQL + Prisma** |
| Queues | **BullMQ + Redis** |
| AI / ML | **Gemini** • **OpenAI** • **Hugging Face** |
| Lead Search | **Serper.dev** |
| Billing | **Stripe** |
| Auth (stub) | Clerk / NextAuth (plug-n-play) |
| Infra | Docker | GitHub Actions | Vercel | Railway |

---

## ⚡ Quick Start

```bash
# 1 — clone & move in
git clone https://github.com/your-handle/Coldemail.git
cd Coldemail

# 2 — environment
cp .env.example .env      # add your API keys & DATABASE_URL

# 3 — local infra (Postgres + Redis)
docker compose up -d

# 4 — install & migrate
npm install
npx prisma migrate dev --name init

# 5 — run everything
npm run dev               # Next.js + queues
Open http://localhost:3000 and log in.
Queue workers auto-start via concurrently.

☁ Deploy
Service	Role	Guide
Vercel	Next.js app & API routes	Import repo → add env vars → build command npm run build
Railway	PostgreSQL & Redis	One-click Postgres & Redis → copy URLs into your Vercel env
Stripe	Billing & webhooks	Dashboard → Developers → Webhooks → https://<domain>/api/stripe-webhook

Automated CI example is in .github/workflows/ci.yml.

🗺 Roadmap
 Visual drag-and-drop sequence builder (Flowchart)

 Reply-aware auto-follow-ups

 Multi-tenant email-warm-up pools

 Web-based template marketplace

 SOC 2 / GDPR starter policies

Have ideas? Open an issue or a PR!

🤝 Contributing
Fork → create branch → commit → PR.

Follow Conventional Commits (feat:, fix:, chore:).

Run npm run lint & npm test before pushing.

📄 License
MIT – do anything, just give credit.

