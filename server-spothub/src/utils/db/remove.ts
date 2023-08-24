import { DatabaseFactory } from "../database";
import { GetFolder } from "./get";

export const RemovePlaylistFromFolder = async (
  playlistId: string,
  folderId: number,
  token: string
) => {
  const db = new DatabaseFactory().GetDB();
  await db.query(
    "DELETE FROM foldered_playlists WHERE playlist_id=? AND folder_id=?",
    [playlistId, folderId]
  );

  return GetFolder(folderId, token);
};
