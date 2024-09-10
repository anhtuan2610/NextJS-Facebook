"use client";

import Image from "next/image";
import messengerIcon from "../../assets/images/icons8-messenger-40.png";
import { useState } from "react";
import ListMessenger from "./ListMessenger";

export default function Messenger() {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="w-10 flex justify-center items-center bg-[#E4E6EB] rounded-full hover:bg-[#d3d5da] cursor-pointer">
      <div className="relative">
        <Image
          src={messengerIcon}
          alt="Messenger Icon"
          width={25}
          height={25}
          onClick={() => setIsShow(!isShow)}
        />
        <div className={isShow ? "block" : "hidden"}>
          <ListMessenger />
        </div>
      </div>
    </div>
  );
}
