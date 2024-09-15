import { TResponseLastedChat } from "@/utils/type-common";
import { get } from "./axiosConfig";

type TParams = {
  userId?: number,
  searchString?: string,
}

export async function getLastedChatInfo({ userId, searchString} : TParams) {
  return await get<TResponseLastedChat[]>({url:"/chat/lasted", params: {userId, searchString: searchString || undefined}});
}
