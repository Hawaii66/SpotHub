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
    description TEXT
);

CREATE TABLE IF NOT EXISTS foldered_playlist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    playlist_id VARCHAR(250),
    folder_id INT
);

DELETE FROM playlists
DELETE FROM folders
DELETE FROM foldered_playlist