"use client";

export const apiFetch = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  data?: T
) => {
  const token = localStorage.getItem("spotify-token");

  const result = await fetch(path, {
    method: method,
    body: data === undefined ? undefined : JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
};
