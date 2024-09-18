import {
  TResponseChatBetweenUsers,
  TResponseLastedChat,
} from "@/utils/type-common";
import { get } from "./axiosConfig";

type ChatSearchParams = {
  userId?: number;
  searchString?: string;
};

type UserChatParams = {
  userId: number;
  receiverId: number;
};

export async function getLastedChatInfo({
  userId,
  searchString,
}: ChatSearchParams) {
  return await get<TResponseLastedChat[]>({
    url: "/chat/lasted",
    params: { userId, searchString },
  });
}

export async function getChatsBetweenUsers({
  userId,
  receiverId,
}: UserChatParams) {
  return await get<TResponseChatBetweenUsers[]>({
    url: `/chat/chatsWithUser/${userId}/${receiverId}`,
  });
}
