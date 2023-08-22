export type DBFolder = {
  id: number;
  name: string;
  description: string;
  user_id: string;
};

export type DBPlaylist = {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

export type DBUser = {
  id: string;
  name: string;
  href: string;
  email: string;
};

export type DBFolderedPlaylists = {
  id: number;
  playlist_id: string;
  folder_id: number;
};

export type DBUserFolders = {
  id: number;
  user_id: string;
  folder_id: number;
};
