CREATE TABLE IF NOT EXISTS options (
    id SERIAL PRIMARY KEY,
    option_name VARCHAR(50) NOT NULL,
    option_description VARCHAR(250) DEFAULT 'No Description',
    periodic BOOLEAN DEFAULT false,
    event BIGINT REFERENCES events(id)
);