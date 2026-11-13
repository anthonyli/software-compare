CREATE TABLE votes (
  product_id TEXT NOT NULL,
  voter_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (product_id, voter_id)
);
CREATE TABLE vote_counts (
  product_id TEXT PRIMARY KEY,
  total INTEGER NOT NULL DEFAULT 0 CHECK (total >= 0)
);
CREATE TRIGGER votes_insert AFTER INSERT ON votes BEGIN
  INSERT INTO vote_counts (product_id, total) VALUES (NEW.product_id, 1)
  ON CONFLICT(product_id) DO UPDATE SET total = total + 1;
END;
CREATE TRIGGER votes_delete AFTER DELETE ON votes BEGIN
  UPDATE vote_counts SET total = total - 1 WHERE product_id = OLD.product_id;
END;
CREATE TABLE vote_rate_limits (
  bucket TEXT PRIMARY KEY,
  hits INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX vote_rate_limits_expiry ON vote_rate_limits(expires_at);
