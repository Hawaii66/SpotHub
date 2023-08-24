"use client";

import FolderCard from "@/components/FolderCard";
import PlaylistCard from "@/components/PlaylistCard";
import { Folder } from "@/interfaces/Folder";
import { User } from "@/interfaces/User";
import { apiFetch } from "@/utils/apiFetch";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [folder, setFolder] = useState<Folder | null>(null);

  const test = async () => {
    await apiFetch("GET", "/api/spotify");

    const result = await apiFetch("GET", "/api/user");
    const user = (await result.json()) as User;
    setUser(user);

    const matches = user.folders.find(
      (i) => i.id === parseInt(searchParams.get("id") || "-1")
    );
    if (matches === undefined) {
      router.back();
      return;
    }
    setFolder(matches);
  };

  const deleteFromFolder = async (playlistId: string) => {
    const result = await apiFetch(
      "DELETE",
      `/api/folder?playlist_id=${playlistId}&folder_id=${folder?.id}`
    );
    const updatedFolder = await result.json();
    setFolder(updatedFolder);
  };

  useEffect(() => {
    test();
  }, []);

  if (!folder || !user) {
    return <div>Laddar</div>;
  }

  return (
    <div className="w-full">
      <h1>{folder.name}</h1>
      <p>{folder.description}</p>
      <div className="grid grid-cols-5 gap-8 my-4 w-full px-12">
        {folder.playlists.map((playlist) => (
          <PlaylistCard
            onDeleteFromFolder={() => deleteFromFolder(playlist.id)}
            playlist={playlist}
          />
        ))}
      </div>
    </div>
  );
}

export default page;
