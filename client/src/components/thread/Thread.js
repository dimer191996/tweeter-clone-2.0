import React, { useState } from "react";

import moment from "moment";
import Comments from "./thread.comments/Comments";
import PActions from "./shared/PActions";
import { IconMore } from "../z_icons";
import Counts from "./shared/Counts";
import { displayBody } from "../z_utils";

export default function Thread({ post }) {
  const [openComments, setOpenComments] = useState(true);

  return (
    <div className=" flex ">
      <div className="w-full relative">
        <div className="py-5 px-6">
          <div className="bg-white rounded-md xl:px-8 px-2   flex flex-col w-full shadow pt-2">
            <div className="inline-flex" href="/">
              <div className=" absolute right-10">
                <div className=" p-1 cursor-pointer active:bg-gray-200 hover:bg-gray-100 bg-gray-0 rounded-full">
                  <IconMore
                    circle=""
                    classes="text-gray-700"
                    height="24"
                    width="24"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex-grow  flex flex-col">
                  <div className="flex justify-between w-full ">
                    <div className=" flex relative items-center ">
                      <img
                        alt="blog"
                        src="https://dummyimage.com/103x103"
                        className="w-10 h-10 mr-4 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <div className=" text-black opacity-75 text-sm">
                        <div className=" font-bold">@{post.creator}</div>
                        <div className="font-medium">
                          {moment(post.createdAt).fromNow()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="w-full p-2 mt-1 mb-2 rounded-lg">
                    <p
                      dangerouslySetInnerHTML={displayBody(post.body)}
                      style={{ fontSize: "15px", wordBreak: "break-word" }}
                      className="leading-tight text-black"
                    ></p>
                  </div>
                </div>
              </div>
            </div>{" "}
            {post.picture && (
              <div className="relative flex items-center">
                <div className="flex justify-center w-full pb-2 overflow-visible">
                  {[1].map((p) => (
                    <div className="overflow-hidden">
                      <img
                        alt="blog"
                        src={`${post.picture}`}
                        className=" object-cover opacity-75 hover:opacity-100 cursor-pointer rounded-md h-64 border w-full  "
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Counts
              countComments={post.comments.length}
              isLiked={post.liked}
              likesCount={post.likesCount}
            />
            <PActions
              handleOpenComment={() =>
                setOpenComments((openComments) => !openComments)
              }
              post={post}
            />
            <Comments
              isOpen={openComments}
              mode="comment "
              comments={post.comments}
              postId={post._id}
            />
          </div>
        </div>

        {/* <div className=" ml-5">votes</div> */}
      </div>
    </div>
  );
}
