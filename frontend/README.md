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


## Deployment Notes

- When deploying the frontend to Netlify and the backend to Render, all API calls are automatically proxied via `/api/*` using the Netlify `_redirects` file and Next.js `rewrites`.
- No code changes are needed for API URLs; keep using `/api/*` in your frontend code.
- Make sure the file `public/_redirects` exists with this line:

  /api/* https://componentlab.onrender.com/api/:splat 200

- In `next.config.ts`, the rewrites should point to the Render backend:

  destination: 'https://componentlab.onrender.com/api/:path*'

- This setup ensures your frontend works seamlessly on Netlify with the backend on Render.
