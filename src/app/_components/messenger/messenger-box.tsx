import useSWR from "swr";
import { useEffect, useState } from "react";
import Image from "next/image";
import userImg from "@/assets/images/user-img.jpg";
import { addChatBetweenUsers, getChatsBetweenUsers } from "@/services/chat-api";
import { TNewChat, TResponseChatBetweenUsers } from "@/utils/type-common";
import { useChatConnectionStore } from "@/store/chathub-connection";

type TProps = {
  userId: number; // user logged
  receiverId: number; // receiverId / sender already messaged the user who just clicked
  receiverName: string;
};

export default function BoxMessenger({
  userId,
  receiverId,
  receiverName,
}: TProps) {
  const { connection } = useChatConnectionStore();
  const { data, isLoading } = useSWR(
    ["fetchChat", receiverId],
    () => getChatsBetweenUsers({ userId, receiverId }),
    {
      revalidateOnFocus: true,
    }
  );
  const [listMessage, setListMessage] = useState<TResponseChatBetweenUsers[]>(
    []
  );
  const [newMessage, setNewMessage] = useState<string>("");

  async function handleSendMessage() {
    try {
      if (newMessage) {
        const data: TNewChat = {
          senderId: userId,
          receiverId: receiverId,
          content: newMessage,
          isRead: true,
        };
        addChatBetweenUsers({ data });

        if (connection) {
          await connection.invoke(
            "SendMessage",
            userId,
            receiverId,
            newMessage
          );

          const addMessage: TResponseChatBetweenUsers = {
            content: newMessage,
            createAt: "a",
            isSender: true,
          };
          setListMessage((prev) => [...prev, addMessage]);
          console.log("Message sent!");
          setNewMessage(""); // Reset input
        }
      }
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }

  useEffect(() => {
    if (!connection) return;

    if (data) {
      setListMessage(data);
    }

    const onReceiveMessage = (newMessage: string) => {
      // nhận được
      const addMessage: TResponseChatBetweenUsers = {
        content: newMessage,
        createAt: "a",
        isSender: false,
      };
      setListMessage((prev) => [...prev, addMessage]);
    };

    connection.on("ReceiveMessage", onReceiveMessage);
    return () => {
      connection.off("ReceiveMessage", onReceiveMessage);
    };
  }, [connection, receiverId, data]);

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
        {listMessage?.map((c) =>
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

      {/* typing-send */}
      <div className="w-full h-9 flex flex-nowrap gap-2 px-2">
        <input
          className="w-full p-3 rounded-full bg-[#F0F2F5] text-sm text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
          type="text"
          placeholder="Aa"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="w-20 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
