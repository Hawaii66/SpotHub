import { User } from "@/interfaces/User";
import { DatabaseFactory } from "../database";
import { Playlist } from "@/interfaces/Playlits";
import { Folder } from "@/interfaces/Folder";
import {
  DBFolder,
  DBFolderedPlaylists,
  DBPlaylist,
  DBUser,
  DBUserFolders,
} from "@/interfaces/Database";

export const GetUser = async (userid: string): Promise<User | undefined> => {
  const db = new DatabaseFactory().GetDB();
  const result = await db.query<DBUser>("SELECT * FROM users WHERE id=?", [
    userid,
  ]);
  if (result.rows.length === 0) {
    return undefined;
  }

  const user = result.rows[0];

  const folders = await GetFolders(userid);

  console.log(folders, userid);

  return {
    ...user,
    folders: folders,
  };
};

export const GetUserFromToken = async (
  token: string
): Promise<User | undefined> => {
  const spotifyUser = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await spotifyUser.json();

  const id = json.id;
  const user = await GetUser(id);
  return user;
};

export const GetFolders = async (userid: string): Promise<Folder[]> => {
  const db = new DatabaseFactory().GetDB();
  const result = await db.query<DBFolder>(
    "SELECT * FROM folders WHERE user_id=?",
    [userid]
  );

  const foldersPromises: Promise<Folder>[] = [];
  result.rows.forEach((row) => foldersPromises.push(GetFolder(row.id)));
  return Promise.all(foldersPromises);
};

export const GetFolder = async (folderid: number): Promise<Folder> => {
  const db = new DatabaseFactory().GetDB();
  const result = await db.query<DBFolder>("SELECT * FROM folders WHERE id=?", [
    folderid,
  ]);
  const folder = result.rows[0];
  const playlistsInFolder = await db.query<DBFolderedPlaylists>(
    "SELECT * FROM foldered_playlists WHERE folder_id=?",
    [folderid]
  );

  const playlistPromises: Promise<Playlist>[] = [];
  playlistsInFolder.rows.forEach((foldered) =>
    playlistPromises.push(GetPlaylist(foldered.playlist_id))
  );
  const playlists = await Promise.all(playlistPromises);

  return {
    ...folder,
    playlists,
  };
};

export const GetPlaylist = async (playlistid: string): Promise<Playlist> => {
  const db = new DatabaseFactory().GetDB();
  const result = await db.query<DBPlaylist>(
    "SELECT * FROM playlists WHERE id=?",
    [playlistid]
  );
  const playlist = result.rows[0];

  return playlist;
};
