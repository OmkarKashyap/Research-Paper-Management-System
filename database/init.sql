CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE papers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    abstract TEXT
);
