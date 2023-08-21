import React from "react";
import { Playlist } from "../interfaces/Playlits";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";

interface Props {
  playlist: Playlist;
}

function Playlits({ playlist }: Props) {
  console.log(playlist.image);
  return (
    <div className="w-80 shadow-2xl pb-4 rounded-2xl">
      <div className="aspect-square rounded-2xl">
        <img
          src={
            playlist.image || `/color${Math.floor(Math.random() * 3) + 1}.png`
          }
          className="rounded-t-2xl"
          alt="what"
        />
      </div>
      <div className="px-2 flex flex-row w-full justify-between align-top">
        <div className="w-5/6">
          <h3 className="w-full text-2xl font-semibold text-black truncate underline">
            {playlist.name}
          </h3>
          <p className="w-full text-sm font-normal text-black">
            {playlist.description}
          </p>
        </div>
        <div className="flex flex-col">
          <Link
            href={`/profile/playlist?id=${playlist.id}`}
            className="aspect-square"
          >
            <PlayArrowIcon color={"success"} fontSize="large" />
          </Link>
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
    </div>
  );
}

export default Playlits;