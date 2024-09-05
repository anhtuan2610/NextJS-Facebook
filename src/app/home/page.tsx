"use client";

import { useEffect, useState } from "react";
import { authStorage } from "../_utils/auth-storage";
import { useRouter } from "next/navigation";
import { getUser } from "../_services/auth-api";
import { User } from "../_utils/type-common";

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
