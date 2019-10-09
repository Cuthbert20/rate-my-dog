INSERT INTO rate_users (username, hash)
VALUES
(${username}, ${password})

RETURNING *;