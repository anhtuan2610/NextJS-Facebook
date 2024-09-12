import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { getLastedChatInfo } from "@/services/chat-api";
import { useUserStore } from "@/store/user";
import userImg from "@/assets/images/user-img.jpg";
import SearchMessenger from "./SearchMessenger";

export default function ListMessenger() {
  const [searchString, setSearchString] = useState<string>("");
  const { user } = useUserStore();
  const fetcher = (url: string) => getLastedChatInfo(url);

  const { data, isLoading, error } = useSWR(`/chat/lasted/${user?.id}?searchString=${searchString}`, fetcher, {
    revalidateOnFocus: false
  });

  function handleShowBoxChat(userId: number) {
    
  }

  return (
    <div className="absolute w-[368px] h-auto top-10 right-20 translate-x-1/2 p-4 bg-white shadow-lg rounded-lg">
      
      {/* search */}
      <SearchMessenger searchString={ searchString } setSearchString={setSearchString} />

      {/* list */}
      <div className="pt-4 flex flex-col gap-2">
        {isLoading ? (
          <div>...Loading</div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          data?.map((c) => (
            <div onClick={() => handleShowBoxChat(c.userId)} className="flex items-center hover:bg-slate-100 py-2 px-1">
              <div className="w-16 h-16 border-gray-600 flex justify-center items-center">
                <Image className="rounded-full" src={userImg} alt="avatar" />
              </div>
              <div className="pl-3">
                <p className="font-semibold">{c.fullName}</p>
                <p className="text-[#65676B] flex gap-1">{ c.isSender && <p className="font-bold">You:</p>}{c.lastMessage}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
