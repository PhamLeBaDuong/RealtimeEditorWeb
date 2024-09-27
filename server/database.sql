CREATE DATABASE editorweb;

CREATE TABLE users(
    soccerfield_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100),
    email VARCHAR(50)
);