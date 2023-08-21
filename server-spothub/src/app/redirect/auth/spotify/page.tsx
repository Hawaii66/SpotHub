"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const saveCode = () => {
    const code = searchParams.get("code");

    if (code === null) {
      return;
    }

    localStorage.setItem("spotify-clientid", code);
    push("/");
  };

  useEffect(() => {
    saveCode();
  }, [searchParams]);

  return (
    <div>
      <h1>Cant find token</h1>
    </div>
  );
}

export default page;
