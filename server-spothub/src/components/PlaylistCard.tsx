import React from "react";
import { Playlist } from "../interfaces/Playlits";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Link from "next/link";

interface Props {
  onAddToFolder: () => void;
  playlist: Playlist;
}

function PlaylistCard({ playlist, onAddToFolder }: Props) {
  return (
    <div className="shadow-2xl pb-4 rounded-2xl">
      <div className="aspect-square rounded-2xl w-full">
        <img
          src={
            playlist.image || `/color${Math.floor(Math.random() * 3) + 1}.png`
          }
          className="rounded-t-2xl aspect-square w-full"
          alt="what"
        />
      </div>
      <div className="px-2 flex flex-col w-full justify-between align-top">
        <div className="w-full flex flex-row justify-between items-center mb-4">
          <h3 className="w-full text-2xl font-semibold text-black truncate underline">
            {playlist.name}
          </h3>
          <div className="flex flex-row gap-4">
            <Link
              href={`/profile/playlist?id=${playlist.id}`}
              className="aspect-square"
            >
              <PlayArrowIcon color={"success"} fontSize="large" />
            </Link>
            <button onClick={onAddToFolder} className="aspect-square">
              <FolderOpenIcon color={"success"} fontSize="large" />
            </button>
            <Link
              passHref
              href={playlist.href}
              className="aspect-square"
              target="_blank"
            >
              <OpenInNewIcon color={"success"} fontSize="large" />
            </Link>
          </div>
        </div>
        <p className="w-full text-sm font-normal text-black">
          {playlist.description}
        </p>
      </div>
    </div>
  );
}

export default PlaylistCard;
