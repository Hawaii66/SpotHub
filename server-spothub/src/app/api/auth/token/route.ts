import { clientID } from "@/utils/spotify";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("clientId");

  const params = new URLSearchParams();
  params.append("client_id", clientID);
  params.append("grant_type", "authorization_code");
  params.append("code", code!);
  params.append("redirect_uri", "http://localhost:3000/redirect/auth/spotify");
  params.append("client_secret", "15db8a292e4e46998c2fa626fdbf0ace");

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();

  return NextResponse.json({
    token: access_token,
  });
};
