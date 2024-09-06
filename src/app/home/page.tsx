"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStorage } from "@/utils/auth-storage";
import { getUser } from "@/services/auth-api";
import { User } from "@/utils/type-common";

export default function HomePage() {
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<User>();
  const router = useRouter();
  useEffect(() => {
    const storedToken = authStorage.getToken();
    if (storedToken) {
      setToken(storedToken);
      handleInfo(storedToken);
    }
  }, []);

  async function handleInfo(currentToken: string) {
    if (currentToken) {
      const user = await getUser({ stringUrl: "user", token: currentToken });
      setUserInfo(user);
    }
  }

  function handleLogout() {
    authStorage.removeToken();
    setToken("");
    setUserInfo(undefined);
    router.push("/login"); // Navigate to login or home after logout
  }

  return (
    <div>
      <div>home</div>
          <div>{userInfo?.username}</div>
          <div onClick={handleLogout} className="cursor-pointer">logout</div>
    </div>
  );
}
