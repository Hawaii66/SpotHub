import { GetPlayState } from "@/utils/spotify";
import { GetToken } from "@/utils/token";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const token = GetToken(request);
  if (token === undefined) {
    return NextResponse.json({}, { status: 400 });
  }

  const state = await GetPlayState(token);

  if (state.is_playing) {
    const result = await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json({
      success: result.status === 204 ? true : false,
    });
  } else {
    const result = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        position_ms: 0,
      }),
    });
    return NextResponse.json({
      success: result.status === 204 ? true : false,
    });
  }
};
