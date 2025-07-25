# LLM Micro-Frontend Playground (Frontend)

## Features
- Auth (signup/login)
- Dashboard: list and create sessions
- Playground: chat-driven component generation, live preview, code/CSS tabs, copy/download
- All state is persisted and auto-saved

## Getting Started

1. Start the backend (`cd backend && npm install && node index.js`)
2. Start the frontend (`cd frontend && npm install && npm run dev`)
3. Open [http://localhost:3000](http://localhost:3000)

- The frontend proxies `/api/*` requests to the backend on port 5000.
- Requires MongoDB and Redis (cloud URLs are preconfigured).

---

- For deployment, set the backend API URL in the frontend as needed.
