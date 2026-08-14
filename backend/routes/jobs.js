import express from "express";

const router = express.Router();

const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

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

router.get("/listings", async (req, res) => {
  const category = req.query.category || "software-dev";
  const cacheKey = `listings:${category}`;

  const cached = getCached(cacheKey);
  if (cached) {
    return res.json({ source: "cache", data: cached });
  }

  try {
    const response = await fetch(
      `https://remotive.com/api/remote-jobs?category=${category}&limit=10`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Remotive API error: ${response.statusText}`,
      });
    }

    const json = await response.json();

    const simplified = (json.jobs || []).slice(0, 10).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company_name,
      url: job.url,
      publishedAt: job.publication_date,
    }));

    setCached(cacheKey, simplified);
    res.json({ source: "live", data: simplified });
  } catch (err) {
    console.error("Failed to fetch job listings:", err.message);
    res.status(500).json({ error: "Failed to fetch job listings" });
  }
});

export default router;