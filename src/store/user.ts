import { create } from "zustand";
import { TUser } from "@/utils/type-common";

type TUserStore = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
};

export const useUserStore = create<TUserStore>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
