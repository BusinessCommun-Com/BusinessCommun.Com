Local server for Premium Service

Setup

1. Copy `.env.example` to `.env` and set DB credentials.

2. Install dependencies:

```bash
cd Client/server
npm install
```

3. Create the database and seed sample data (MySQL must be installed):

```bash
# from project root or where seed.sql is
mysql -u <user> -p < Client/server/seed.sql
```

4. Run the server:

```bash
# development with auto-reload
npm run dev
# or
npm start
```

Notes
- The server listens on `PORT` from `.env` (default 5000).
- API endpoints:
  - `GET /api/premium/investors` (preview)
  - `GET /api/premium/investors?userId=ID` (full list if purchase exists)
  - `POST /api/premium/purchase` body: `{ userId, plan, amount }`

Client
- The React client can set `VITE_API_BASE` in `.env` to point to the server base URL (e.g. `http://localhost:5000/api/premium`).
