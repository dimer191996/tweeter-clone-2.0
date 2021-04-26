import React from "react";
import PostForm from "./post/post-form/PostForm";
import { PostCardStore } from "./post/PostCard";

export default function Home() {
  return (
    <section className="text-gray-600 body-font">
      <div className="mx-auto flex flex-col">
        <div className="">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-full bg-gray-100 sm:mt-0 text-center sm:text-left">
              <div className=" overflow-hidden">
                <PostForm />
              </div>
              <section className="text-gray-600 body-font">
                <div>
                  <div className=" font-bold  text-center text-green-500"></div>
                  <div className=" grid grid-cols-1  ">
                    <PostCardStore />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
