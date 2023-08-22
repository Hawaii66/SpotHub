import { CreateUser } from "@/utils/db/create";
import { GetUser } from "@/utils/db/get";
import { GetToken } from "@/utils/token";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const token = GetToken(request);

  const spotifyUser = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await spotifyUser.json();

  const id = json.id;
  var user = await GetUser(id);
  if (user === undefined) {
    user = await CreateUser({
      email: json.email,
      href: json.href,
      id: json.id,
      name: json.display_name,
    });
  } else {
    console.log("User already exists");
  }

  console.log(user);

  return NextResponse.json(user);
};
