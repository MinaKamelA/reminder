CREATE TABLE IF NOT EXISTS periods (
    id SERIAL PRIMARY KEY,
    interval VARCHAR(6) DEFAULT 'Day',
    every INT NOT NULL,
    option BIGINT REFERENCES options(id)
);