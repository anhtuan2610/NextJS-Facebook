import Image from "next/image";
import { useState } from "react";
import userIcon from "@/assets/images/icons8-user-40.png";
import userImg from "@/assets/images/user-img.jpg";
import logoutImg from "@/assets/images/logout-icon.png";
import { TUser } from "@/utils/type-common";

type TProps = {
  user: TUser;
  handleLogout: () => void;
}

export default function Profile({user, handleLogout} : TProps) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="w-10 flex justify-center items-center bg-[#E4E6EB] rounded-full hover:bg-[#d3d5da] cursor-pointer">
      <div className="relative">
        <Image
          src={userIcon}
          alt="User Icon"
          width={30}
          height={30}
          onClick={() => setIsShow(!isShow)}
        />
        <div className={isShow ? "block" : "hidden"}>
          <div className="absolute w-[368px] h-auto top-10 right-2 p-4 bg-white shadow-lg rounded-lg">
            <div className="p-4 shadow-lg rounded-lg">
              <div className="flex items-center gap-3 ">
                <div className="w-12 h-12 flex justify-center items-center bg-[#E4E6EB] rounded-full">
                  <Image
                    src={userImg}
                    alt="User Icon"
                    className="rounded-full"
                  />
                </div>
                <div className="font-semibold text-xl">{user.fullName}</div>
              </div>
              <div className="border-t-2 border-gray-400 mt-4"></div>
            </div>
            <div className="flex items-center gap-3 mt-4 p-2 rounded-lg hover:bg-slate-200" onClick={handleLogout}>
              <div className="w-12 h-12 flex justify-center items-center p-2 bg-[#E4E6EB] rounded-full">
                <Image src={logoutImg} alt="logout image" className="rounded-full" />
              </div>
              <div className="font-semibold text-lg">Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
