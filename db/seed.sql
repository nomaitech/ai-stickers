\c ai_stickers_db

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  current_transaction TRANSACTION,
  amount integer,
  user_id integer REFERENCES users (id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  original_img TEXT,
  generated_img TEXT,
  transaction_id integer REFERENCES transactions (id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password) VALUES
  ('alpha@example.com', '12345'),
  ('beta@example.com', '67890'),
  ('gamma@example.com', '45678')
ON CONFLICT (email) DO NOTHING;