import { AddPlaylistToFolder } from "@/utils/db/create";
import { GetToken } from "@/utils/token";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const token = GetToken(request);
  const { searchParams } = new URL(request.url);
  const folderId = parseInt(searchParams.get("folder") || "");
  const playlistId = searchParams.get("playlist") || "";

  if (isNaN(folderId) || playlistId === "") {
    return NextResponse.json({}, { status: 401 });
  }

  const folder = await AddPlaylistToFolder(folderId, playlistId, token || "");

  return NextResponse.json(folder);
};
