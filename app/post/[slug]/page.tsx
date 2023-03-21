"use client";

import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostDetailsType } from "@/app/types/PostDetails";
import AddComment from "@/app/components/AddComment";
import Image from "next/image";
import { motion } from "framer-motion";
type URL = {
  params: {
    slug: string;
  };
};
//Fetch post
const fetchDetails = async (slug: string) => {
  const res = await axios.get(`/api/posts/${slug}`);
  return res.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostDetailsType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading...";
  console.log(data);
  return (
    <div>
      <Post
        id={data?.id!}
        name={data?.user.name!}
        avatar={data?.user.image!}
        postTitle={data?.title!}
        Comment={data?.Comment}
      />
      <AddComment id={data?.id} />
      {data?.Comment?.map((Comment) => (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ ease: "easeOut" }}
          className="my-6 bg-white p-8 rounded-md"
          key={Comment.id}
        >
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={Comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{Comment?.user?.name}</h3>
            <h2 className="text-sm">{Comment.createdAt}</h2>
          </div>
          <div className="py-4">{Comment.title}</div>
        </motion.div>
      ))}
    </div>
  );
}
