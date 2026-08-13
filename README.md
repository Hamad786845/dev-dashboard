# Dev Dashboard

A dashboard that aggregates data from multiple public APIs (GitHub activity, remote job listings, weather) into one view — built as a portfolio project to demonstrate backend architecture: API integration, caching, rate-limit handling, and error handling.

## Stack
- **Backend:** Node.js + Express (in-memory caching, API aggregation)
- **Frontend:** React + Vite

## Project Structure
```
dev-dashboard/
├── backend/
│   ├── server.js          # Express app entry point
│   ├── routes/
│   │   └── github.js      # GitHub API integration (cached)
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
cp .env.example .env   # add your GitHub username / token
npm run dev             # runs on http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npm run dev             # runs on http://localhost:5173
```

## Roadmap (build in this order)
1. ✅ Scaffold (this repo)
2. GitHub API route — pull your repos + recent activity, add in-memory caching
3. Second data source — job listings (e.g. Remotive API, no key needed) or weather (OpenWeatherMap)
4. Error/loading states in the frontend for each panel independently (one API failing shouldn't break the whole page)
5. Deploy backend (Render/Railway) + frontend (Vercel/Netlify)
6. Stretch: swap in-memory cache for Redis, add a "refresh" button with rate-limit awareness

## Why this project
Shows real backend engineering decisions — not just CRUD: handling multiple external dependencies, caching to avoid rate limits, graceful degradation when an API fails. Good talking points for interviews.

## Push to GitHub
```bash
cd dev-dashboard
git init
git add .
git commit -m "Initial scaffold: Express backend + React frontend"
git branch -M main
git remote add origin https://github.com/<your-username>/dev-dashboard.git
git push -u origin main
```
