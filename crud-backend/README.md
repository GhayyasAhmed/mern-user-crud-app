# CRUD Backend

Express + TypeScript + MongoDB backend for the MERN user CRUD app.

## Scripts

```bash
npm run dev
npm run check
npm run build
npm start
```

## Environment

Create a `.env` file in `crud-backend/` using `.env.example`:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/crud-backend
FRONTEND_URLS=http://localhost:5173
```

Notes:

- `FRONTEND_URLS` accepts a comma-separated list of allowed frontend origins
- local frontend example: `http://localhost:5173`
- deployed frontend example: `https://your-frontend-app.vercel.app`

## API routes

- `GET /api/health`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`

## Validation rules

- `name` is required, trimmed, and must be between 2 and 50 characters
- `email` is required, normalized to lowercase, must be valid, and must be unique
- `age` is required and must be a whole number between 13 and 120

## Deployment notes

- Run `npm run build` before starting production
- Production start command: `npm start`
- Set `MONGO_URI` to your MongoDB Atlas connection string when deploying
- Set `FRONTEND_URLS` to the deployed frontend origin so CORS allows browser requests
- On Vercel, route requests to `src/vercel.ts` instead of `src/server.ts`
- If Atlas still times out, make sure MongoDB Atlas Network Access allows Vercel traffic
