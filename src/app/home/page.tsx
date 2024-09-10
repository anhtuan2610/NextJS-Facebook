"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStorage } from "@/utils/auth-storage";
import { getUser } from "@/services/auth-api";
import { TUser } from "@/utils/type-common";
import NavbarHeader from "@/components/navbar/Header";

export default function HomePage() {
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<TUser>();
  const router = useRouter();
  useEffect(() => {
    const storedToken = authStorage.getToken();
    if (storedToken) {
      setToken(storedToken);
      handleInfo(storedToken);
    } else {
      router.push("/login");
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
    router.push("/login");
  }

  return (
    <div>
      <NavbarHeader />
      <div className="w-screen h-screen bg-[#F0F2F5] pt-14 ">
        <div>home</div>
        <div>{userInfo?.username}</div>
        <div onClick={handleLogout} className="cursor-pointer">
          logout
        </div>
      </div>
    </div>
  );
}
