"use client";

import { useToken } from "@/hooks/useToken";
import { apiFetch } from "@/utils/apiFetch";
import React, { useEffect, useState } from "react";
import PlaylistCard from "../../components/PlaylistCard";
import { Playlist } from "@/interfaces/Playlits";
import { User } from "@/interfaces/User";
import Link from "next/link";
import FolderCard from "@/components/FolderCard";
import ChooseFolder from "@/components/ChooseFolder";

function page() {
  useToken();

  const [result, setResult] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [changeFolder, setChangeFolder] = useState<Playlist | null>(null);

  const test = async () => {
    await apiFetch("GET", "/api/spotify");

    const result = await apiFetch("GET", "/api/user");
    const user = await result.json();
    setUser(user);
  };

  const newFolder = async (name: string, description: string) => {
    const result = await apiFetch("POST", "/api/folder", {
      name,
      description,
    });
    const folder = await result.json();
    if (user === null) return;
    setUser({ ...user, folders: [...user.folders, folder] });
  };

  const play = async () => {
    setResult("Loading");
    const result = await apiFetch("GET", "/api/spotify/player/play");
    setResult(await result.json());
  };

  const previous = async () => {
    setResult("Loading");
    const result = await apiFetch("GET", "/api/spotify/player/previous");
    setResult(await result.json());
  };

  const next = async () => {
    setResult("Loading");
    const result = await apiFetch("GET", "/api/spotify/player/next");
    setResult(await result.json());
  };

  const addPlaylistToFolder = async (folderId: number) => {
    if (changeFolder === null) return;

    const result = await apiFetch(
      "POST",
      `/api/folder/playlist?folder=${folderId}&playlist=${changeFolder.id}`
    );

    const newFolder = await result.json();

    if (user === null) {
      return;
    }

    setUser({
      ...user,
      folders: [...user.folders.filter((f) => f.id !== folderId), newFolder],
    });
  };

  const all = async () => {
    setResult("Loading");
    const result = await apiFetch("GET", "/api/spotify/playlist/all");
    const data = await result.json();
    setResult(data);
    setPlaylists(data.playlists);
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <div className="w-full">
      <div
        style={{
          width: "20vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={previous}>{"<-"}</button>
        <button onClick={play}>Play</button>
        <button onClick={next}>{"->"}</button>
      </div>
      <div>
        <button onClick={all}>All playlists</button>
      </div>
      <h1>Result</h1>
      {user && (
        <>
          <div>
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <Link href={user.href}>Visit</Link>
          </div>
          <div>
            <button
              onClick={() => {
                const name = prompt("Name");
                const desc = prompt("Desc");
                newFolder(name || "", desc || "");
              }}
            >
              New Folder
            </button>
            {user.folders.map((folder) => (
              <div>
                <h1>{folder.name}</h1>
                <h2>{folder.description}</h2>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="grid grid-cols-5 gap-8 my-4 w-full px-12">
        {user && user.folders.map((folder) => <FolderCard folder={folder} />)}
      </div>
      <div className="grid grid-cols-5 gap-8 my-4 w-full px-12">
        {playlists.map((playlist) => (
          <PlaylistCard
            onAddToFolder={() => setChangeFolder(playlist)}
            playlist={playlist}
          />
        ))}
      </div>

      {user && changeFolder && (
        <ChooseFolder
          onChoose={(folder) => {
            setChangeFolder(null);
            addPlaylistToFolder(folder.id);
          }}
          folders={user.folders}
          onClose={() => {
            setChangeFolder(null);
          }}
        />
      )}
    </div>
  );
}

export default page;
