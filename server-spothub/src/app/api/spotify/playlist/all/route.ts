import { GetPlayState } from "@/utils/spotify";
import { GetToken } from "@/utils/token";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const token = GetToken(request);
  if (token === undefined) {
    return NextResponse.json({}, { status: 400 });
  }

  const playlists: any[] = [];

  const fetchLimit = 40;
  var url = `https://api.spotify.com/v1/me/playlists?limit=${fetchLimit}&offset=${0}`;
  while (true) {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await result.json();
    const nextFetch = data.next;

    data.items.forEach((i: any) => playlists.push(i));
    if (nextFetch !== null) {
      url = nextFetch;
    } else {
      break;
    }
  }

  return NextResponse.json({
    playlists: playlists.map((i, idx) => ({
      name: i.name,
      description: i.description,
      image: i.images[0] ? i.images[0].url : null,
      order: idx,
      id: i.id,
      href: i.external_urls.spotify,
    })),
  });
};
