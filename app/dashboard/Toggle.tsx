"use client";
type ToggleProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};
export default function Toggle({ deletePost, setToggle }: ToggleProps) {
  return (
    <div className="fixed bg-black/25 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-12 px-4 rounded-lg flex flex-col gap-6 ">
        <h2 className="text-xl ">
          Are you sure you want to delete this post?{" "}
          <button
            onClick={(e) => {
              setToggle(false);
            }}
            className="flex text-green-700"
          >
            click here to cancel
          </button>
        </h2>
        <h3 className=" text-red-600 text-sm">
          Pressing the delete button will permenantly delete your post
        </h3>
        <button
          onClick={(e) => {
            setToggle(false);
            deletePost();
          }}
          className="bg-red-600 text-sm text-white py-2 px-4 rounded-md"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}
