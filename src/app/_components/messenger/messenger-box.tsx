import Image from "next/image";
import userImg from "@/assets/images/user-img.jpg";
import { useEffect } from "react";
import { getChatsBetweenUsers } from "@/services/chat-api";
import useSWR from "swr";

type TProps = {
  userId: number; // user đã login
  receiverId: number; // người gửi / nhận đã từng nhắn với user vừa được click
  receiverName: string;
};

export default function BoxMessenger({
  userId,
  receiverId,
  receiverName,
}: TProps) {
  const { data, isLoading } = useSWR(
    ["fetchChat", receiverId],
    () => getChatsBetweenUsers({ userId, receiverId }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div className="fixed flex flex-col justify-between w-[338px] h-[455px] pb-3 bottom-0 right-16 border border-gray-100 rounded-lg bg-white shadow-md cursor-auto">
      <div className="flex w-full items-center justify-between p-1 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-11 p-1">
            <Image className="rounded-full" src={userImg} alt="avatar" />
          </div>
          <div className="font-semibold">{receiverName}</div>
        </div>
        <div className="mr-2">X</div>
      </div>
      {/* chat list 1 : 1 */}

      <div className="flex-grow px-2 pt-2 overflow-y-auto">
        {data?.map((c) =>
          c.isSender ? (
            <div className="flex justify-end">
              <div className="inline-block max-w-full mb-2 py-2 px-3 text-base leading-5 font-medium text-white bg-[#0084FF] rounded-2xl break-words">
                {c.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start">
              <div className="inline-block max-w-full mb-2 py-2 px-3 text-base leading-5 font-medium text-black bg-[#F0F0F0] rounded-2xl break-words">
                {c.content}
              </div>
            </div>
          )
        )}
      </div>
      {/* type-send */}
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
  );
}
