"use client";
import { uploadToS3 } from "@/lib/s3";
import { useChatsStore } from "@/store/useChatsStore";
import { Inbox, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const FileUpload = () => {
  const router = useRouter();
  const { createChat } = useChatsStore() as {
    createChat: (file_key: string, file_name: string) => Promise<string>;
  };
  const [uploading, setUploading] = useState<boolean>(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data?.file_name) {
          toast.error("Error uploading file");
          return;
        }
        const chatId = await createChat(data.file_key, data.file_name);
        router.push(`/chats/${chatId}`);
      } catch (error) {
        toast.error("Error uploading file");
        console.log("Error uploading file", error);
      } finally {
        setUploading(false);
      }
    },
  });

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
        {uploading ? (
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
