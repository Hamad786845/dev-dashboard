import express from "express";

const router = express.Router();

// Simple in-memory cache: { data, expiresAt }
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes — avoids hammering GitHub's rate limit

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCached(key, data) {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

router.get("/activity", async (req, res) => {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    return res.status(400).json({ error: "GITHUB_USERNAME not set in .env" });
  }

  const cacheKey = `activity:${username}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return res.json({ source: "cache", data: cached });
  }

  try {
    const headers = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/events/public`,
      { headers }
    );

    if (!response.ok) {
      // GitHub returned an error (e.g. rate limited, user not found)
      return res.status(response.status).json({
        error: `GitHub API error: ${response.statusText}`,
      });
    }

    const events = await response.json();

    // Trim to the fields the frontend actually needs
    const simplified = events.slice(0, 10).map((e) => ({
      id: e.id,
      type: e.type,
      repo: e.repo?.name,
      createdAt: e.created_at,
    }));

    setCached(cacheKey, simplified);
    res.json({ source: "live", data: simplified });
  } catch (err) {
    console.error("Failed to fetch GitHub activity:", err.message);
    res.status(500).json({ error: "Failed to fetch GitHub activity" });
  }
});

export default router;
