import { GetToken } from "@/utils/token";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const token = GetToken(request);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const result = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(await result.json());
};
