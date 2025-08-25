-- Create database (run this manually in PostgreSQL first)
-- CREATE DATABASE portfolio_db;

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a simple visits table
CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    visit_date DATE DEFAULT CURRENT_DATE,
    count INTEGER DEFAULT 1
);