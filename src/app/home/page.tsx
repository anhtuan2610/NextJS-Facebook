"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserStore } from "@/store/user";
import { getUser } from "@/services/auth-api";
import userImg from "@/assets/images/user-img.jpg";
import NavbarHeader from "../_components/navbar/Header";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUserStore();
  const router = useRouter();

  async function getUserInfo() {
    const token = getCookie("jwt");
    if (token) {
      const user = await getUser({ stringUrl: "user", token: token });
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    }
  }

  function handleLogout() {
    deleteCookie("jwt");
    setUser(null);
    router.push("/login");
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <NavbarHeader />
      <div className="w-full h-full pt-14 ">
        <div>{user?.fullName}</div>
        <div className="cursor-pointer inline-block" onClick={handleLogout}>
          logout
        </div>
        {/* box chat */}
        <div className="fixed flex flex-col justify-between w-[338px] h-[455px] pb-3 bottom-0 right-16 border border-gray-100 rounded-lg bg-white shadow-md">
          <div className="flex w-full items-center justify-between p-1 shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-11 p-1">
                <Image className="rounded-full" src={userImg} alt="avatar" />
              </div>
              <div className="font-semibold">Trần Anh Tuấn</div>
            </div>
            <div className="mr-2">X</div>
          </div>
          <div className="flex-grow px-2 overflow-y-auto">
            <div>content</div>
          </div>
          <div className="w-full h-9 flex flex-nowrap gap-2 px-2">
            <input
              className="w-full p-3 rounded-full bg-[#F0F2F5] text-sm text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
              type="text"
              placeholder="Aa"
            />
            <button className="w-20 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
