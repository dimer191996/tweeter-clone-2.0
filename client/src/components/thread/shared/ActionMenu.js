import React from "react";
import { IconTriangle } from "../../z_icons";

const ActionMenu = (props) => {
  return (
    props.isOpen &&
    props.isReady &&
    !props.isError && (
      <div className="ease-in-out duration-500">
        <div className="z-10  absolute rounded-lg border mt-1   w-52 bottom-auto top-auto  -right-0 bg-white shadow-xl h-30">
          <IconTriangle
            bottom=""
            top="-16px"
            left="calc(174px)"
            direction="up"
            height="25"
            width="25"
          />
          <div className="">
            <ul className="p-2">
              <li
                onClick={() => props.handleShowComfirmationModal()}
                className="py-1 hover:bg-gray-100 text-sm border-b px-2 font-bold rounded-lg cursor-pointer"
              >
                Delete
              </li>
              <li
                onClick={() => props.handleShowComfirmationModal()}
                className="py-1 hover:bg-gray-100 text-sm border-b px-2 font-bold rounded-lg cursor-pointer"
              >
                Share
              </li>
              <li
                onClick={() => props.handleShowComfirmationModal()}
                className="py-1 hover:bg-gray-100 text-sm border-b px-2 font-bold rounded-lg cursor-pointer"
              >
                Repport
              </li>
              <li
                onClick={() => props.handleShowComfirmationModal()}
                className="py-1 hover:bg-gray-100 text-sm px-2 font-bold rounded-lg cursor-pointer"
              >
                Add as Favorite
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default ActionMenu;
