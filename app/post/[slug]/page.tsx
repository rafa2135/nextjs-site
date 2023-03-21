"use client";

import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PostDetailsType } from "@/app/types/PostDetails";
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
        comment={data?.Comment}
      />
    </div>
  );
}
