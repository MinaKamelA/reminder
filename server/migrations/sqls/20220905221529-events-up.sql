CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(50) NOT NULL,
  event_description VARCHAR(250) DEFAULT 'No Description',
  "user" BIGINT REFERENCES users(id) NOT NULL
);