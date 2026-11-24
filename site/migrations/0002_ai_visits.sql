CREATE TABLE ai_visits (
  session_id TEXT PRIMARY KEY,
  started_at INTEGER NOT NULL DEFAULT (unixepoch()),
  source TEXT NOT NULL,
  landing_path TEXT NOT NULL,
  filtered INTEGER NOT NULL DEFAULT 0,
  opened_product INTEGER NOT NULL DEFAULT 0,
  visited_official INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX ai_visits_started_at ON ai_visits(started_at);
