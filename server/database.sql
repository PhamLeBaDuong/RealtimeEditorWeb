CREATE DATABASE editorweb;

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE documents (
    id UUID PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    owner_id BIGSERIAL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE document_permissions (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    document_id BIGSERIAL REFERENCES documents(id),
    user_id BIGSERIAL REFERENCES users(id),
    permission_level VARCHAR(50) NOT NULL -- read, write, admin
);

CREATE TABLE document_history (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    document_id BIGSERIAL REFERENCES documents(id),
    user_id BIGSERIAL REFERENCES users(id),
    edit_timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
    changes JSONB -- diff of changes
);