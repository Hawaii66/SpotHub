insert into users
(id,name,href,email)
VALUES
('sebbe','sebbe','spotify-href','email');


insert into folders
(name,description,user_id)
VALUES
('folder-1','desc','sebbe');

insert into playlists
(id,name,description,image,href)
VALUES
('playlist-1','name-1','desc','img','href');
insert into playlists
(id,name,description,image,href)
VALUES
('playlist-2','name-2','desc','img','href');

insert into foldered_playlists
(playlist_id,folder_id)
VALUES
('playlist-1',1);
insert into foldered_playlists
(playlist_id,folder_id)
VALUES
('playlist-2',1);

insert into user_folders
(user_id,folder_id)
VALUES
('sebbe',1)