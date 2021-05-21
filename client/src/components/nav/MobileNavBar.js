import React from "react";
import { Logo } from "../z_icons";
import SidebarLinks from "./nav.partials/SidebarLinks";

export default function PodNav() {
  return (
    <div className=" sm:w-20 md:w-60 flex-col block  lg:hidden  lg:border-r sticky top-0 h-screen bg-coolGray-50 text-coolGray-800 ">
      <div className=" ">
        <div className="flex   justify-end items-center ">
          <Logo height="70" width="70" />
        </div>

        <div className="flex-1">
          <div className="pt-2 pb-4 justify-end flex text-xl font-bold space-y-1 ">
            <ul className=" leading-8 mt-12 grid grid-cols-1 gap-2">
              <SidebarLinks mobile={true} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
