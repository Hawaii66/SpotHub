import { GetPlayState } from "@/utils/spotify";
import { GetToken } from "@/utils/token";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const token = GetToken(request);
  if (token === undefined) {
    return NextResponse.json({}, { status: 400 });
  }

  const result = await fetch("https://api.spotify.com/v1/me/player/previous", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return NextResponse.json({
    success: result.status === 204 ? true : false,
  });
};
