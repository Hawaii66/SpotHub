"use client";

import { useToken } from "@/hooks/useToken";
import { apiFetch } from "@/utils/apiFetch";
import React, { useEffect, useState } from "react";
import Playlits from "../../components/Playlits";
import { Playlist } from "@/interfaces/Playlits";
import { User } from "@/interfaces/User";
import Link from "next/link";

function page() {
  useToken();

  const [result, setResult] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [user, setUser] = useState<User | null>(null);

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
    <div className="w-screen">
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
      <div className="grid grid-cols-4 gap-4 mx-12 my-4 w-screen">
        {playlists.map((playlist) => (
          <Playlits playlist={playlist} />
        ))}
      </div>
      <p style={{ maxWidth: "90vw" }} className="text-clip">
        {JSON.stringify(result)}
      </p>
    </div>
  );
}

export default page;
