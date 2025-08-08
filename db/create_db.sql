CREATE DATABASE IF NOT EXISTS ai_stickers_db;

\c ai_stickers_db

CREATE TYPE transaction AS ENUM ('top_up', 'image_generation', 'gift');