DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_recipes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS recipes_comments

-- postgres recipe description not varchar, want text
-- same for profile info and comment info 

CREATE TABLE recipes (
  recipe_id SERIAL PRIMARY KEY NOT NULL,
  recipe_name VARCHAR NOT NULL,
  image_url VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  user_id INT NOT NULL REFERENCES users(user_id)
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR NOT NULL,
  password_digest VARCHAR NOT NULL,
  profile_pic VARCHAR,
  profile_info VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);


CREATE TABLE users_recipes (
  user_recipe_id SERIAL PRIMARY KEY NOT NULL,
  recipe_id INT REFERENCES NOT NULL recipes(recipe_id),
  user_id INT REFERENCES NOT NULL users(user_id)
);

CREATE TABLE comments (
  comment_id INT PRIMARY KEY NOT NULL,
  comment_info VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE recipes_comments (
  recipe_comment_id SERIAL PRIMARY KEY NOT NULL,
  recipe_id INT REFERENCES NOT NULL recipes(recipe_id),
  comment_id INT REFERENCES NOT NULL comments(comment_id),
  user_id INT REFERENCES NOT NULL users(user_id)
);