import React from "react";
import ThreadForm from "./thread/ThreadForm";
import Threads from "./thread/Threads";

export default function Home() {
  return (
    <section className="text-gray-600 w-full body-font">
      <div className="mx-auto flex flex-col">
        <div className="">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-full bg-gray-100 sm:mt-0  sm:text-left">
              <ThreadForm />
              <section className="text-gray-600 body-font">
                <div>
                  <div className=" font-bold  text-center text-green-500"></div>
                  <div className=" grid grid-cols-1  ">
                    <Threads />
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
