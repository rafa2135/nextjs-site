"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
export default function CreatePost() {
  const [title, settitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  //create a post

  return (
    <form className="bg-white my-6 p-4 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => settitle(e.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : " text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          type="submit"
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        >
          Create a post
        </button>
      </div>
    </form>
  );
}
