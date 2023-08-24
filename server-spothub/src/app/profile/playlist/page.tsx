"use client";

import { Playlist } from "@/interfaces/Playlits";
import { apiFetch } from "@/utils/apiFetch";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const searchParams = useSearchParams();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  const getPlaylist = async (id: string) => {
    const result = await apiFetch("GET", `/api/spotify/playlist?id=${id}`);
    setPlaylist(await result.json());
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) getPlaylist(id);
  }, [searchParams]);

  if (!playlist) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h1>{playlist.name}</h1>
    </div>
  );
}

export default page;
