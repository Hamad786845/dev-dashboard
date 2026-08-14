import { useEffect, useState } from "react";

function GithubActivityPanel() {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  useEffect(() => {
    fetch("/api/github/activity")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((json) => setState({ status: "success", data: json.data, error: null }))
      .catch((err) => setState({ status: "error", data: null, error: err.message }));
  }, []);

  return (
    <div style={styles.panel}>
      <h2>GitHub Activity</h2>
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && (
        <p style={{ color: "crimson" }}>Couldn't load GitHub activity: {state.error}</p>
      )}
      {state.status === "success" && (
        <ul>
          {state.data.map((event) => (
            <li key={event.id}>
              <strong>{event.type}</strong> on {event.repo} —{" "}
              {new Date(event.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function JobListingsPanel() {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  useEffect(() => {
    fetch("/api/jobs/listings")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((json) => setState({ status: "success", data: json.data, error: null }))
      .catch((err) => setState({ status: "error", data: null, error: err.message }));
  }, []);

  return (
    <div style={styles.panel}>
      <h2>Remote Job Listings</h2>
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && (
        <p style={{ color: "crimson" }}>Couldn't load job listings: {state.error}</p>
      )}
      {state.status === "success" && (
        <ul>
          {state.data.map((job) => (
            <li key={job.id}>
              <a href={job.url} target="_blank" rel="noreferrer">
                {job.title}
              </a>{" "}
              — {job.company}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div style={styles.container}>
      <h1>Dev Dashboard</h1>
      <div style={styles.grid}>
        <GithubActivityPanel />
        <JobListingsPanel />
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: "sans-serif", padding: "2rem", maxWidth: 900, margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" },
  panel: { border: "1px solid #ddd", borderRadius: 8, padding: "1rem" },
};