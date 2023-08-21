"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function login() {
  const { push } = useRouter();

  const authSpotify = async () => {
    const link = await fetch(`/api/auth`);
    const href = (await link.json()).href;
    push(href);
  };

  const useLocalCode = () => {
    const token = localStorage.getItem("spotify-code");
    if (token !== null) {
      push("/");
    }
  };

  useEffect(() => {
    useLocalCode();
  }, []);

  return (
    <div>
      <button onClick={() => authSpotify()}>Auth</button>
    </div>
  );
}

export default login;
