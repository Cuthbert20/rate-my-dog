--user table
CREATE TABLE rate_users (
user_id serial PRIMARY KEY,
username VARCHAR(50),
hash TEXT

--dummy data for user table
INSERT INTO rate_users (username, hash)
VALUES
('bob', '1'),
('joel', '1'),
('spencer', '1')

