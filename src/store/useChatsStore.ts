import { create } from "zustand";
import axios from "axios";
import { DrizzleChat } from "@/lib/db/schema";
import toast from "react-hot-toast";

export const useChatsStore = create((set) => ({
  chats: [] as DrizzleChat[],
  lastChat: {} as DrizzleChat,

  newChatAdd: (newChat: DrizzleChat) => {
    set((state: { chats: DrizzleChat[] }) => ({
      chats: [...state.chats, newChat],
    }));
  },

  fetchChats: async () => {
    const { data } = await axios.get("/api/get-chats");
    set({ chats: data });
    set((state: { chats: DrizzleChat[] }) => ({
      lastChat: state.chats[state.chats.length - 1],
    }));
  },

  deleteChat: async (chatID: number, fileKey: string) => {
    const response = await axios.delete(`/api/delete-chat`, {
      data: { chatID, fileKey },
    });
    toast.success(response.data.message);
    set((state: { chats: DrizzleChat[] }) => ({
      chats: state.chats.filter((chat) => chat.id !== chatID),
    }));
    set((state: { chats: DrizzleChat[] }) => ({
      lastChat: state.chats[state.chats.length - 1],
    }));
  },
}));
