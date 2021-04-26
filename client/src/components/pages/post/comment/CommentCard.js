import React from "react";
import moment from "moment";
import CommentForm from "./CommentForm";
export function Comment({ comment }) {
  return (
    <div className=" pb-2 flex items-center">
      <div className=" w-16 flex justify-end">
        {!comment.isReady ? (
          <div
            type="button"
            class="inline-flex ease-in-out duration-350 items-center p-1   px-1   text-base leading-6 "
            disabled=""
          >
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`${
          !comment.isReady && "opacity-60"
        }  inline-flex  relative bg-white shadow  rounded-2xl bg-white  mb-1 pr-4`}
        href="/"
      >
        <img
          alt="blog"
          src="https://dummyimage.com/103x103"
          className="w-8 h-8 mx-2 rounded-full flex-shrink-0 object-cover object-center"
        />
        <div className="flex flex-col">
          <div className="flex-grow flex flex-col">
            <div className=" ">
              <div className="font-bold text-black text-xs">
                <div className=" mt-1 text-black opacity-75 text-sm">
                  <span className="font-bold text-indigo-400 w-40 pr-1 text-black text-xs">
                    {moment(comment.timestamp).fromNow()}
                  </span>
                  <span className=" font-medium">@{comment.creator}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <span
              style={{ fontWeight: "560", fontSize: "14.5px" }}
              className="leading-tight font-a-book text-justify"
            >
              {comment.body}.
            </span>
          </div>
        </div>

        {comment.likes.length === 0 && (
          <ReactionCount likesCount={comment.likes.length} />
        )}
      </div>
    </div>
  );
}
export function ReactionCount({ likesCount }) {
  return (
    <div>
      <div className="absolute  w-12 flex flex-col   -bottom-2 -right-8 ">
        <div className="w-auto flex flex-wrap">
          <div className="flex items-center justify-center bg-white text-indigo-700  shadow rounded-xl top-auto">
            <div className=" bg-blue-400 flex justify-center items-center h-5 w-5 rounded-full overflow-hidden">
              <span class=" items-center flex justify-center text-sm font-bold"></span>
            </div>
            <span className="px-1 text-sm font-bold">{likesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export function Comments({ comments }) {
  return comments.map((comment, index) => (
    <Comment key={index} comment={comment} />
  ));
}
export default function CommentCard({ comments, postId }) {
  return (
    <div>
      <Comments comments={comments} />
      <CommentForm postId={postId} />
    </div>
  );
}
