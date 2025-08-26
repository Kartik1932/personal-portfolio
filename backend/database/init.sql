-- This runs automatically when the container starts
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    visit_date DATE DEFAULT CURRENT_DATE,
    count INTEGER DEFAULT 1
);

-- Insert initial visit count
INSERT INTO visits (count) VALUES (0) ON CONFLICT DO NOTHING;