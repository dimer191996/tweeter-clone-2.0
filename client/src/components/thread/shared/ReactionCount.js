import { IconThumbUp } from "../../z_icons";

export default function ReactionCount({ isLiked, likesCount, isError }) {
  return (
    !isError &&
    likesCount !== 0 && (
      <div className=" absolute -right-8 -bottom-1 flex items-center  ">
        <div className="w-auto relative  flex items-center justify-center flex-wrap">
          <span className="flex -left-4 absolute items-center justify-center bg-white   rounded-xl top-auto">
            <div className="  flex justify-center items-center h-5 w-5 shadow  rounded-full overflow-hidden">
              <IconThumbUp
                height="20"
                width="20"
                classes={isLiked ? `text-blue-500` : "text-blue-300"}
              />
            </div>
          </span>
          <div className="mt-1">
            <span className="px-3 bg-white shadow tracking-tighter pt-1 rounded-r-full  text-xs font-bold">
              {likesCount}
            </span>
          </div>
        </div>
      </div>
    )
  );
}
