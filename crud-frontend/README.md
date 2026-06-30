# CRUD Frontend

React + TypeScript + Vite frontend for the MERN user CRUD app.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Environment

Create a `.env` file in `crud-frontend/`:

```env
VITE_API_URL=http://localhost:3001
```

Use `.env.example` as the starter file.

Notes:

- `VITE_API_URL` should point to the backend origin only, without `/api`
- local example: `http://localhost:3001`
- production example: `https://your-backend-service.vercel.app`

The frontend builds API URLs like:

```text
${VITE_API_URL}/api/users
```

## Frontend behavior

- Fetches users from the backend API
- Supports create, update, and delete flows
- Shows loading, error, success, and empty states
- Uses field-level validation for name, email, and age
- Uses an in-app confirmation dialog before deleting a user

## Deployment checklist

- Set `VITE_API_URL` in the frontend hosting platform
- Make sure the backend allows the deployed frontend origin in CORS
- Run `npm run build` before deploying
