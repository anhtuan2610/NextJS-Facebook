"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import searchIcon from "@/assets/images/icons8-search-64.png";
import facebookIcon from "@/assets/images/facebook-icon.png";
import menuIcon from "@/assets/images/icons8-menu-40.png";
import homeIcon from "@/assets/images/icons8-home-40.png";
import videoIcon from "@/assets/images/icons8-video-40.png";
import marketIcon from "@/assets/images/icons8-market-40.png";
import friendIcon from "@/assets/images/icons8-friend-40.png";
import gameIcon from "@/assets/images/icons8-game-40.png";
import Messenger from "@/app/_components/messenger/messenger-trigger";
import Profile from "./profile/profile-trigger";
import Notification from "./notification/notification-trigger";
import { getUser } from "@/services/auth-api";
import { TUser } from "@/utils/type-common";

export default function Navbar() {
  const [user, setUser] = useState<TUser | null>();
  const router = useRouter();

  function handleLogout() {
    deleteCookie("accessToken");
    setUser(null);
    router.push("/login");
  }

  async function getUserInfo() {
    const userData = await getUser();
    if (userData) {
      setUser(userData);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);
  

  if (!user) {
    return null;
  }

  return (
    <div className="w-full flex justify-between items-center bg-white px-4 h-14 shadow-md fixed">
      {/* left */}
      <div className="flex gap-3">
        <div className="w-10">
          <Image
            src={facebookIcon}
            alt="Facebook Icon"
            width={40}
            height={40}
          />
        </div>
        <div className="w-10">
          <Image src={searchIcon} alt="Search Icon" width={40} height={40} />
        </div>
      </div>
      {/* center */}
      <div className="w-[40.4%] hidden lg:flex h-full justify-center">
        <div className="px-10 cursor-pointer hover:bg-slate-200 flex items-center">
          <div className="w-10">
            <Image src={homeIcon} alt="Home Icon" width={40} height={40} />
          </div>
        </div>

        <div className="px-10 cursor-pointer hover:bg-slate-200 flex items-center">
          <div className="w-10">
            <Image src={videoIcon} alt="Video Icon" width={40} height={40} />
          </div>
        </div>

        <div className="px-10 cursor-pointer hover:bg-slate-200 flex items-center">
          <div className="w-10">
            <Image src={marketIcon} alt="Market Icon" width={40} height={40} />
          </div>
        </div>

        <div className="px-10 cursor-pointer hover:bg-slate-200 flex items-center">
          <div className="w-10">
            <Image src={friendIcon} alt="Friend Icon" width={40} height={40} />
          </div>
        </div>

        <div className="px-10 cursor-pointer hover:bg-slate-200 flex items-center">
          <div className="w-10">
            <Image src={gameIcon} alt="Game Icon" width={40} height={40} />
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex gap-3 h-full py-2">
        <div className="w-11 flex justify-center items-center bg-[#E4E6EB] rounded-full hover:bg-[#d3d5da] cursor-pointer">
          <Image src={menuIcon} alt="Menu Icon" width={25} height={25} />
        </div>

        <Messenger user={user}/>

        <Notification />

        <Profile user={user} handleLogout={handleLogout} />
      </div>
    </div>
  );
}
