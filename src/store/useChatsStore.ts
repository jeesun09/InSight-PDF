import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { DrizzleChat } from "@/lib/db/schema";

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
      
      set((state: any) => ({
        chats: [...state.chats, response.data],
        lastChat: response.data,
      }));
      return response.data.id.toString();
    } catch (error) {
      console.log("Error creating chat", error);
    }
  },

  fetchChats: async () => {
    try {
      const { data } = await axios.get("/api/get-chats");
      set({
        chats: data || [],
        lastChat: data.length > 0 ? data[data.length - 1] : null,
      })
    } catch (error) {
      toast.error("Error fetching chats");
      set({ chats: [], lastChat: null})
    }
  },

  deleteChat: async (chatID: number, fileKey: string) => {
    try {
      const response = await axios.delete(`/api/delete-chat`, {
        data: { chatID, fileKey },
      });
      toast.success(response.data.message);
      set((state: any) => ({
        chats: state.chats.filter((chat: { id: number; }) => chat.id !== chatID),
        lastChat: state.chats.length > 0 ? state.chats[state.chats.length - 2] : null,
      }));
    } catch (error) {
      toast.error("Error deleting chat");
      console.log("Error deleting chat", error);
    }
  },
}));
