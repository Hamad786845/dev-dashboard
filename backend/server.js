import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import githubRouter from "./routes/github.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/github", githubRouter);

// TODO: add a second router here, e.g. /api/jobs or /api/weather
// import jobsRouter from "./routes/jobs.js";
// app.use("/api/jobs", jobsRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
