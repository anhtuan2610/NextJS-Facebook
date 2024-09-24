import {create} from "zustand";

type ChatConnectionState = {
  connection: signalR.HubConnection | null;
  setConnection: (newConnection: signalR.HubConnection | null) => void;
};

export const useChatConnectionStore = create<ChatConnectionState>((set) => ({
  connection: null,
  setConnection: (newConnection) => set({ connection: newConnection }),
}));