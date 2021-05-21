import React from "react";
import { Logo } from "../z_icons";
import UserLogSettings from "./nav.partials/UserLogSettings";
import SidebarLinks from "./nav.partials/SidebarLinks";

export default function Sidebar() {
  return (
    <div className=" hidden overflow-y-auto  lg:block  lg:border-r sticky top-0 h-screen w-1/2 bg-coolGray-50 text-coolGray-800">
      <div className="flex justify-end ">
        <div className=" flex justify-start h-24 w-64 relative">
          <div className="justify-start flex w-full items-start">
            <div className=" absolute left-0 -top-4">
              <div className="flex hover:shadow ease-in-out duration-700 cursor-pointer   justify-end items-center mr-20 border-b rounded-full p-2  space-x-4">
                <Logo
                  height="90"
                  width="90"
                  classes="p-3 fill-current text-blue-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-end ">
        <div className="space-y-3 w-64">
          <div className="flex-1">
            <div className="pt-2 pb-4 flex text-xl font-bold space-y-1">
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
