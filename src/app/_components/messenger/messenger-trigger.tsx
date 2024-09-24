"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import messengerIcon from "@/assets/images/icons8-messenger-40.png";
import ListMessenger from "./messenger-list";
import { TUser } from "@/utils/type-common";
import BoxMessenger from "./messenger-box";
import { useChatConnectionStore } from "@/store/chathub-connection";

type TProps = {
  user: TUser;
};

export default function Messenger({ user }: TProps) {
  const [isShow, setIsShow] = useState(false);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [receiverName, setReceiverName] = useState<string>("");
  const { setConnection } = useChatConnectionStore();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7164/chathub?userId=${user.id}`)
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(connection);

    connection
      .start()
      .then(() => {
        console.log("Connected to the chat hub");
      })
      .catch((error) => {
        console.error("Error connecting to chat hub: ", error);
      });
  }, []);

  return (
    <div className="w-11 flex justify-center items-center bg-[#E4E6EB] rounded-full hover:bg-[#d3d5da] cursor-pointer">
      <div className="relative">
        <Image
          src={messengerIcon}
          alt="Messenger Icon"
          width={25}
          height={25}
          onClick={() => setIsShow(!isShow)}
        />
        <div className={isShow ? "block" : "hidden"}>
          <ListMessenger
            user={user}
            setReceiverId={setReceiverId}
            setReceiverName={setReceiverName}
          />
        </div>
        {receiverId && (
          <BoxMessenger
            userId={user.id}
            receiverId={receiverId}
            receiverName={receiverName}
          />
        )}
      </div>
    </div>
  );
}
