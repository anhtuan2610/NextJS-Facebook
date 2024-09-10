import { TResponseLastedChat } from "@/utils/type-common";
import { get } from "./axiosConfig";

export async function getLastedChatInfo(stringUrl: string) {
  return await get<TResponseLastedChat[]>({ url: stringUrl });
}
