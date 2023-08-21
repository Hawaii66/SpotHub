"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useToken = () => {
  const { push } = useRouter();

  const [clientId, setClientId] = useState<null | string>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkCode = async () => {
    setLoading(true);

    const token = localStorage.getItem("spotify-token");
    if (token) {
      setLoading(false);
      return;
    }

    const code = localStorage.getItem("spotify-clientid");
    if (code) {
      setClientId(code);
      getToken(code);
    } else {
      push("/login/spotify");
    }
    setLoading(false);
  };

  const getToken = async (clientId: string) => {
    const result = await fetch(`/api/auth/token?clientId=${clientId}`);
    const token = (await result.json()).token;
    localStorage.setItem("spotify-token", token);
    console.log(token);
    setToken(token);
  };

  useEffect(() => {
    checkCode();
  }, []);

  return {
    clientId,
    token,
    loading,
  };
};
