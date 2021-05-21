import React, { useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uic } from "../../../context";
import { userSelector } from "../../../store/selector/user.selector";
import { useClickOutSide } from "../../z_hooks/clickOutside.hook";
import { IconTriangle } from "../../z_icons";
import { LogoutButton } from "./LogoutButton";

export function UserLogSettingsButton({ isUser }) {
  const user = useSelector(userSelector);
  const [DropDownIsOpen, setDropDownIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutSide(wrapperRef, closeDropDown);

  function closeDropDown() {
    setDropDownIsOpen(false);
  }
  return (
    <div
      ref={wrapperRef}
      className="flex relative  justify-end items-center p-2 mt-2 space-x-4"
    >
      {DropDownIsOpen && <UserLogSettingsButtonDropDownCard user={user} />}
      {isUser && (
        <Button
          user={user}
          isOpen={DropDownIsOpen}
          handelClick={() =>
            setDropDownIsOpen((DropDownIsOpen) => !DropDownIsOpen)
          }
        />
      )}
    </div>
  );
}
export function Button(props) {
  return (
    <div className="w-64">
      <button
        onClick={props.handelClick}
        className={`flex justify-start items-center  p-1 rounded-lg   hover:bg-blue-100 px-10 ${
          props.isOpen && `bg-blue-100`
        } focus:outline-none  cursor-pointer`}
      >
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className="w-12 h-12 mr-4 rounded-full"
        />
        <div className="">
          <h2 className="text-lg font-semibold">{props.user.name}</h2>
          <span className="flex items-center space-x-1">
            <Link
              to={`/profile/${props.user.name}`}
              className="text-xs hover:underline text-coolGray-600"
            >
              @{props.user.name}
            </Link>
          </span>
        </div>
      </button>
    </div>
  );
}

export const UserLogSettingsButtonDropDownCard = ({ user }) => {
  return (
    <div className="absolute top-auto bottom-20">
      <div className="block  bg-white">
        <div className="w-64 border border-gray-300 rounded-lg flex flex-col text-sm  text-gray-500 shadow-lg">
          <ul className="p-2">
            <li className="hover:bg-gray-100 px-4 rounded-lg flex items-center leading-tight">
              <div className="w-14 p-1 mr-5">
                <img
                  src="https://source.unsplash.com/100x100/?portrait"
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div>
                <div className="text-lg font-bold">{user.name}</div>
                <div>@{user.name}</div>
              </div>
            </li>
          </ul>
          <hr className=" border-gray-300" />
          <LogoutButton></LogoutButton>
        </div>
      </div>
      <IconTriangle left="calc(125px)" height="25" width="25" />
    </div>
  );
};

export function SkeletonLoader() {
  return (
    <div className=" flex-row-reverse flex ">
      <div className=" w-64 ">
        <div className="flex justify-start w-full">
          <div className="animate-pulse inline-flex py-3 hover:bg-blue-100 rounded-full items-center p-1 space-x-3 ">
            <div className="flex  mx-2 items-center ">
              <div className="h-12 bg-blue-400 mx-1 w-12  rounded-full"></div>
            </div>
            <div className="flex-1  space-y-2 leading-tight">
              <div className="h-4 bg-blue-400 rounded w-24"></div>
              <div className="h-2 bg-blue-400 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserLogSettings() {
  const { uid, loading } = useContext(uic);
  return !loading ? <UserLogSettingsButton isUser={uid} /> : <SkeletonLoader />;
}
