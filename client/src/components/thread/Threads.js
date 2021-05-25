import React from "react";

import Thread from "./Thread";

export default function Threads({ loading = true, posts = [] }) {
  const isDataReady = (loading, posts) => {
    switch (loading) {
      case false:
        return posts.map((post) => <Thread key={post._id} post={post} />);
      case true:
        return [1, 2, 3, 4].map((s) => <SkeletonLoader key={s} />);
      default:
        return;
    }
  };

  return isDataReady(loading, posts);
}

export function SkeletonLoader() {
  return (
    <div className="  ">
      <div className="w-full">
        <div className=" bg-white flex border-t">
          <div className="flex items-start"></div>
          <div className=" shadow  p-4 w-full ">
            <div className="animate-pulse  space-x-4">
              <div className="flex-1 mx-4 space-y-4 py-1">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-400  px-5 h-10 w-10"></div>
                  <div>
                    <div className="bg-blue-400 mx-2 px-2 mb-2 h-3 rounded-lg w-20"></div>
                    <div className=" bg-blue-400 mx-2 px-2 h-2  w-8 rounded-lg"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-blue-400 rounded w-5/6"></div>
                  <div className="h-4 bg-blue-400 rounded"></div>
                </div>
              </div>
              <div className="flex justify-between border-t border-b py-3 px-6 my-4">
                {[1, 2, 3].map((s) => (
                  <div className="flex">
                    <div className="rounded-full bg-blue-400 mx-2 px-2 h-5 w-5"></div>
                    <div className="bg-blue-400 mx-2 px-2 h-4 rounded-lg w-20"></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center py-1">
                <div className="rounded-full bg-blue-400  px-5 h-10 w-10"></div>
                <div className="h-8 mx-3 bg-blue-400    rounded-full w-full"></div>
                <div className="flex">
                  <div className="rounded-full bg-blue-400 mx-2 px-2 h-5 w-5"></div>
                  <div className="rounded-full bg-blue-400 mx-2 px-2 h-5 w-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
