"use client";

import { useToken } from "@/hooks/useToken";
import { apiFetch } from "@/utils/apiFetch";
import React, { useEffect, useState } from "react";
import { Playlist } from "../interfaces/Playlits";
import Playlits from "../components/Playlits";

function page() {
  useToken();

  const [result, setResult] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const test = async () => {
    const result = await apiFetch("GET", "/api/spotify");
    console.log(await result.json());
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
      <div className="grid grid-cols-4 gap-4 mx-12 my-4 w-screen">
        {playlists
          .sort((a, b) => a.order - b.order)
          .map((playlist) => (
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
