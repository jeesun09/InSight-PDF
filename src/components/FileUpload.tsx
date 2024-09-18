"use client";
import { DrizzleChat } from "@/lib/db/schema";
import { uploadToS3 } from "@/lib/s3";
import { useChatsStore } from "@/store/useChatsStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Inbox, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const FileUpload = () => {
  const router = useRouter();
  const { newChatAdd } = useChatsStore() as {
    newChatAdd: (newChat: DrizzleChat) => void;
  }
  const [uploading, setUploading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
    onSuccess: (data) => {
      newChatAdd(data);
      const { chatId } = data;
      console.log("Chat ID: ", chatId);
      if (chatId) {
        toast.success("Chat created successfully");
        router.push(`/chat/${chatId}`);
      } else {
        console.error("Chat ID missing in response:", data);
        toast.error("Failed to retrieve chat ID.");
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Error creating chat");
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        console.log("S3 Upload Response:", data); // Add this line

        if (!data?.file_key || !data?.file_name) {
          console.log("uploadToS3 response:", data);
          toast.error("Failed to retrieve upload data.");
          return;
        }
        mutation.mutate(data);
      } catch (error) {
        console.log("Upload error:", error);
        toast.error("Error uploading file");
      } finally {
        setUploading(false);
      }
    },
    [mutation]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop,
  });

  const isUploading = uploading || mutation.isPending;

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 dark:bg-slate-500 py-8 flex justify-center items-center flex-col",
          role: "button",
          "aria-label": "File upload dropzone",
          tabIndex: 0,
        })}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400 dark:text-stone-200">
              Uploading your PDF...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400 dark:text-stone-200">
              Drop PDF Here
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
