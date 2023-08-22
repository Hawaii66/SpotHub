import { Folder } from "@/interfaces/Folder";
import Link from "next/link";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface Props {
  folder: Folder;
}

function FolderCard({ folder }: Props) {
  return (
    <div className="shadow-2xl pb-4 rounded-2xl">
      <div className="aspect-square rounded-2xl w-full">
        <img
          src={
            "https://images.unsplash.com/photo-1536420113339-670e1666cbdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9vZHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          }
          className="rounded-t-2xl aspect-square w-full"
          alt="what"
        />
      </div>
      <div className="px-2 flex flex-row w-full justify-between align-top">
        <div className="w-5/6">
          <h3 className="w-full text-2xl font-semibold text-black truncate underline">
            {folder.name}
          </h3>
          <p className="w-full text-sm font-normal text-black">
            {folder.description}
          </p>
        </div>
        <div className="flex flex-col">
          <Link
            href={`/profile/folder?id=${folder.id}`}
            className="aspect-square"
          >
            <PlayArrowIcon color={"success"} fontSize="large" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FolderCard;
