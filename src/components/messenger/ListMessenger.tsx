import useSWR from "swr";
import Image from "next/image";
import { getLastedChatInfo } from "@/services/chat-api";
import searchIcon from "../../assets/images/icons8-search-40.png";
import userImg from "../../assets/images/user-img.jpg";

const fetcher = (url: string) => getLastedChatInfo(url);

export default function ListMessenger() {
  const { data, isLoading, error } = useSWR("/chat/lasted/2", fetcher, {
    revalidateOnFocus: false
  });
  return (
    <div className="absolute w-[368px] h-auto top-10 right-20 translate-x-1/2 p-4 bg-white shadow-lg rounded-lg">
      
      {/* search */}
      <div className="relative">
        <input
          className="w-full bg-[#F0F2F5] px-3 py-2 rounded-2xl"
          type="text"
          placeholder="Search messenger by name"
        />
        <Image
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          width={25}
          src={searchIcon}
          alt="search icon"
        />
      </div>

      {/* list */}
      <div className="pt-4 flex flex-col gap-4">
        {isLoading ? (
          <p>...Loading</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          data?.map((c) => (
            <div className="flex items-center hover:bg-slate-100 p-1">
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
