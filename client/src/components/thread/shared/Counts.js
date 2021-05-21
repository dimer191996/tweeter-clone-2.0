import React from "react";
import FlexWrapper from "./FlexWrapper";

export default function Counts({ countComments, likesCount, isLiked }) {
  return (
    <FlexWrapper mx="6" border="border-none" position="between" classes="mb-1">
      <div className="">
        <div className=" flex justify-center items-center">
          <span className=" font-bold">
            {!isLiked ? "🙃" : "😊"} {likesCount}
          </span>
        </div>
      </div>
      <div className=" text-sm font-normal hover:underline cursor-pointer">
        {countComments} Comment
      </div>
    </FlexWrapper>
  );
}
