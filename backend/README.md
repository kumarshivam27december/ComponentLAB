# Backend API

## Setup

1. `cd backend`
2. `npm install`
3. Create a `.env` file (see below)
4. `node index.js`

### .env Example
```
MONGODB_URI=YOUR_MONGO_URL_HERE
```

## API Endpoints

### Auth
- `POST /api/auth/signup` { email, password }
- `POST /api/auth/login` { email, password }

### Sessions
- `GET /api/sessions` (auth)
- `POST /api/sessions` (auth)
- `GET /api/sessions/:id` (auth)
- `PUT /api/sessions/:id` (auth, { chat, code, css, uiState })

### AI
- `POST /api/ai/generate` (auth, { prompt, code, css })

---

- MongoDB and Redis are preconfigured for cloud use.
- All endpoints (except signup/login) require Bearer JWT in `Authorization` header. 