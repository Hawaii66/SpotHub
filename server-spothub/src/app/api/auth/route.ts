import { clientID } from "@/utils/spotify";
import { NextRequest, NextResponse } from "next/server";

const generateRandomString = function (length: number) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export async function GET(req: NextRequest) {
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email user-modify-playback-state user-read-playback-state user-library-read user-library-modify playlist-read-collaborative playlist-modify-public playlist-modify-private playlist-read-private";
  console.log(scope);

  return NextResponse.json({
    href: `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&scope=${scope}&redirect_uri=${"http://localhost:3000/redirect/auth/spotify"}&state=${state}`,
  });
}
