import { create } from "zustand";
import axios from "axios";
import { DrizzleChat } from "@/lib/db/schema";
import toast from "react-hot-toast";

export const useChatsStore = create((set) => ({
  chats: [],
  lastChat: null,

  createChat: async (file_key: string, file_name: string) => {
    try {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      console.log("Chat created", response.data);
      
      set((state: { chats: DrizzleChat[] }) => {
        state.chats = [...state.chats, response.data];
      });
      return response.data.id;
    } catch (error) {
      console.log("Error creating chat", error);
    }
  },

  fetchChats: async () => {
    try {
      const { data } = await axios.get("/api/get-chats");
      set({
        chats: data,
        lastChat: data.length > 0 ? data[data.length - 1] : null,
      })
    } catch (error) {
      toast.error("Error fetching chats");
      console.error("Error fetching chats", error);
    }
  },

  deleteChat: async (chatID: number, fileKey: string) => {
    try {
      const response = await axios.delete(`/api/delete-chat`, {
        data: { chatID, fileKey },
      });
      toast.success(response.data.message);
      set((state: { chats: DrizzleChat[]; lastChat: DrizzleChat | null }) => {
        state.chats = state.chats.filter((chat) => chat.id !== chatID);
        state.lastChat =
          state.chats.length > 0 ? state.chats[state.chats.length - 1] : null;
      });
    } catch (error) {
      toast.error("Error deleting chat");
    }
  },
}));
