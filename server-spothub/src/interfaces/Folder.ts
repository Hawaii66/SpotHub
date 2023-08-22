import { Playlist } from "./Playlits";

export type Folder = {
  id: number;
  name: string;
  description: string;
  playlists: Playlist[];
};
