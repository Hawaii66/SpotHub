import { GetToken } from "@/utils/token";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const token = GetToken(request);

  console.log(token);

  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const me = await result.json();

  return NextResponse.json(me);
};
