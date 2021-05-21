import React from "react";
import { useSelector } from "react-redux";
import {
  loadingPostSelector,
  postSelector,
} from "../../store/selector/post.selector";

import Thread from "./Thread";

export default function Threads(props) {
  const posts = useSelector(postSelector);
  const loading = useSelector(loadingPostSelector);
  console.log();

  return !loading
    ? posts.map((post) => <Thread key={post._id} post={post} />)
    : [1, 2, 3, 4].map((s) => <SkeletonLoader key={s} />);
}

export function SkeletonLoader() {
  return (
    <div className=" flex mx-6">
      <div className="w-full my-4">
        <div className=" bg-white rounded-md shadow  ">
          <div className="flex items-start"></div>
          <div className=" shadow rounded-md p-4 w-full ">
            <div className="animate-pulse  space-x-4">
              <div className="flex-1 mx-4 space-y-4 py-1">
                <div className="h-4 bg-blue-400 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-blue-400 rounded"></div>
                  <div className="h-4 bg-blue-400 rounded w-5/6"></div>
                </div>
              </div>
              <div className="flex items-center py-1">
                <div className="rounded-full bg-blue-400 h-12 w-12"></div>
                <div className="h-4 bg-blue-400 mx-4  rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
