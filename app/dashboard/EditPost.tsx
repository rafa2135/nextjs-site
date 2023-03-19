"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Toggle from "./Toggle";
import toast from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};
export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  //Toggle
  const [toggle, setToggle] = useState(false);
  //toast
  let deleteToastID: string = "delete";
  //QueryClient
  const queryClient = useQueryClient();
  //delete post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting that post", { id: deleteToastID });
      },
      onSuccess: (data) => {
        toast.success("Post deleted", { id: deleteToastID });
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );
  const deletePost = () => {
    toast.loading("Deleting Post", { id: deleteToastID });

    mutate(id);
  };
  return (
    <>
      <div className="bg-white my-8 py-8 px-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full ml-1"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700 ">{name}</h3>
        </div>
        <div className="my-8">
          <p className=" break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button
            onClick={(e) => {
              setToggle(true);
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
