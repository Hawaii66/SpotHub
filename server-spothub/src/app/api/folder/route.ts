import { CreateFolder } from "@/utils/db/create";
import { GetUserFromToken } from "@/utils/db/get";
import { GetToken } from "@/utils/token";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const token = GetToken(request);
  if (!token) return NextResponse.json({}, { status: 401 });
  const user = await GetUserFromToken(token);
  if (!user) return NextResponse.json({}, { status: 402 });

  const { name, description } = await request.json();

  const folder = await CreateFolder(
    {
      description,
      name,
      user_id: user.id,
      id: -1,
    },
    token
  );

  return NextResponse.json(folder);
};
