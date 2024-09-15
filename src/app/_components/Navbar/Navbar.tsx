import Image from "next/image";
import searchIcon from "@/assets/images/icons8-search-64.png";
import facebookIcon from "@/assets/images/facebook-icon.png";
import menuIcon from "@/assets/images/icons8-menu-40.png";
import notificationIcon from "@/assets/images/icons8-notification-40.png";
import userIcon from "@/assets/images/icons8-user-40.png";
import homeIcon from "@/assets/images/icons8-home-40.png";
import videoIcon from "@/assets/images/icons8-video-40.png";
import marketIcon from "@/assets/images/icons8-market-40.png";
import friendIcon from "@/assets/images/icons8-friend-40.png";
import gameIcon from "@/assets/images/icons8-game-40.png";
import Messenger from "@/app/_components/Navbar/_components/Messenger/TriggerMessenger";

export default function Navbar() {
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

        <Messenger />

        <div className="w-11 flex justify-center items-center bg-[#E4E6EB] rounded-full hover:bg-[#d3d5da] cursor-pointer">
          <Image
            src={notificationIcon}
            alt="Search Icon"
            width={25}
            height={25}
          />
        </div>
        <div className="w-10 flex justify-center items-center bg-[#E4E6EB] rounded-full hover:bg-[#d3d5da] cursor-pointer">
          <Image src={userIcon} alt="Search Icon" width={30} height={30} />
        </div>
      </div>
    </div>
  );
}
