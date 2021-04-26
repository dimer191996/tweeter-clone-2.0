import React, { useState } from "react";
import { Logo } from "../icons";
import UserLogSettings from "../pages/reusables/UserLogSettings";
import SidebarLinks from "./partials/SidebarLinks";

export default function Sidebar() {
  return (
    <div className="flex flex-col hidden  lg:block relative lg:border-r   w-2/3 sticky top-0 h-screen w-60 bg-coolGray-50 text-coolGray-800">
      <div className="">
        <div className=" h-24 w-full relative">
          <div className=" absolute right-0 -top-6">
            <div className="flex   justify-end items-center mr-12 p-2  space-x-4">
              <Logo />
            </div>
          </div>
        </div>
        <div className="space-y-3 ">
          <div className="flex-1">
            <div className="pt-2 pb-4 justify-end flex text-xl font-bold space-y-1 text-sm">
              <ul className=" leading-loose">
                <SidebarLinks />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <UserLogSettings />
    </div>
  );
}
