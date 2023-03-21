"use client";

//imports

import { useState } from "react";
import {
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

//types

type CommentProps = {
  id?: string;
};
type Comment = {
  postId?: string;
  title: string;
};

//code
export default function AddComment({ id }: CommentProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const QueryClient = useQueryClient();
  let commentToast: string = "comment";
  const { mutate } = useMutation(
    async (data: Comment) => axios.post("/api/posts/addComment", { data }),
    {
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        QueryClient.invalidateQueries(["detail-post"]);
        toast.success("comment added", { id: commentToast });
      },
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, { id: commentToast });
        }
      },
    }
  );
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    toast.loading("adding comment", { id: commentToast });
    mutate({ title, postId: id });
  };
  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Add a comment</h3>
      <div className=" flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  );
}
