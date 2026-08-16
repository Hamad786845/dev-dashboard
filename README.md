# Dev Dashboard

A dashboard that aggregates data from multiple public APIs (GitHub activity, remote job listings) into one view — built as a portfolio project to demonstrate backend architecture: API integration, caching, rate-limit handling, and error handling.

**Live demo:** https://dev-dashboard-2lpkayr3x-hamad786845s-projects.vercel.app
**Backend API:** https://dev-dashboard-n70n.onrender.com

> Note: the backend is on Render's free tier, so it may take 20-30 seconds to "wake up" if it's been idle.

## Stack
- **Backend:** Node.js + Express (in-memory caching, API aggregation)
- **Frontend:** React + Vite

## Project Structure

```
dev-dashboard/
├── backend/
│   ├── server.js          # Express app entry point
│   ├── routes/
│   │   ├── github.js      # GitHub API integration (cached)
│   │   └── jobs.js        # Remotive job listings integration (cached)
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Local Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Roadmap
1. ✅ Scaffold
2. ✅ GitHub API route — pull recent public activity, with in-memory caching
3. ✅ Second data source — remote job listings via the Remotive API
4. ✅ Independent error/loading states per panel
5. ✅ Deployed — backend on Render, frontend on Vercel
6. Stretch ideas: swap in-memory cache for Redis, add a manual "refresh" button, add a third data source

## Why this project
Shows real backend engineering decisions — not just CRUD: handling multiple external dependencies, caching to avoid rate limits, graceful degradation when an API fails. Good talking points for interviews.