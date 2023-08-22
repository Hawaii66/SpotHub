CREATE TABLE IF NOT EXISTS playlists (
    id VARCHAR(250) PRIMARY KEY,
    name TEXT,
    description TEXT,
    image TEXT,
    href TEXT
);

CREATE TABLE IF NOT EXISTS folders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    description TEXT,
    user_id VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(250) PRIMARY KEY,
    name TEXT,
    href TEXT,
    email TEXT
);

CREATE TABLE IF NOT EXISTS foldered_playlists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    playlist_id VARCHAR(250),
    folder_id INT
);

CREATE TABLE IF NOT EXISTS user_folders (
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id VARCHAR(250),
	folder_id INT
);

DELETE FROM playlists;
DELETE FROM folders;
DELETE FROM foldered_playlists;
DELETE FROM users;
DELETE FROM user_folders;