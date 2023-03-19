"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPostsType } from "../types/AuthPosts";
import EditPost from "./EditPost";

const feachAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPostsType>({
    queryFn: feachAuthPosts,
    queryKey: ["auth-posts"],
  });
  if (isLoading) return <h1>Posts are loading...</h1>;

  return (
    <div>
      {data?.post?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.Comment}
        />
      ))}
    </div>
  );
}
