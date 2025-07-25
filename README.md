# ComponentLab: AI-Powered React Component Playground

Deployed link : https://componentlab-ai.netlify.app/


## Overview
ComponentLab is a full-stack, AI-driven platform for building, previewing, and exporting React components. Users can chat with an AI to generate JSX/TSX and CSS code, preview components live, and manage sessions—all with a modern, hacker-themed UI.

- **Frontend:** Next.js (App Router), React 19, deployed on Netlify
- **Backend:** Node.js, Express.js, MongoDB, Redis, deployed on Render
- **AI:** Google Gemini API for code generation

---

## Features
- User authentication (signup/login) with JWT
- Dashboard to list and create sessions
- Playground for chat-driven component generation
- Live preview of generated components
- Code/CSS tabs with copy and download options
- Persistent session history and auto-save
- Responsive, hacker-themed UI

---

## Architecture

```
[ User ]
   |
   v
[ Netlify Frontend (Next.js) ]
   |
   |  (API requests: /api/*)
   v
[ Render Backend (Express.js) ]
   |         |         |
   |         |         |
   v         v         v
[ MongoDB ] [ Redis ] [ Gemini API ]
```

---

## Getting Started (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kumarshivam27december/ComponentLAB.git
   cd ComponentLAB
   ```
2. **Start the backend:**
   ```bash
   cd backend
   npm install
   node index.js
   ```
3. **Start the frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000)

- The frontend proxies `/api/*` requests to the backend on port 5000.
- Requires MongoDB and Redis (cloud URLs are preconfigured).

---

## Deployment

### Backend
- Deploy the backend to [Render](https://render.com/) or any Node.js hosting platform.

### Frontend
- Deploy the frontend to [Netlify](https://www.netlify.com/):
  - **Base directory:** `frontend`
  - **Build command:** `npm run build`
  - **Publish directory:** `frontend`
  - Add a `netlify.toml` file in `frontend/`:
    ```toml
    [build]
      command = "npm run build"
      publish = ".next"

    [functions]
      directory = "netlify/functions"

    [[plugins]]
      package = "@netlify/plugin-nextjs"
    ```
  - Ensure `public/_redirects` exists with:
    ```
    /api/* https://componentlab.onrender.com/api/:splat 200
    ```
  - In `next.config.ts`, set:
    ```js
    destination: 'https://componentlab.onrender.com/api/:path*'
    ```

---

## Environment Variables
- Configure MongoDB, Redis, and Gemini API keys in the backend `.env` file.
- No sensitive keys should be in the frontend.

---

## License
MIT

---

## Author
Shivam Kumar (kumarshivam27december)

---

## Credits
- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Netlify](https://www.netlify.com/)
- [Render](https://render.com/)
- [Google Gemini API](https://ai.google.dev/gemini-api)
