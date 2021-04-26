import React, { useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { uic } from "../../../context";
import { userSelector } from "../../../store/selector/user.selector";
import { useClickOutSide } from "../../hooks/clickOutside.hook";
import { IconLogout, IconTriangle } from "../../icons";
import { LogoutButton } from "../../nav/partials/LogoutButton";

export function Button(props) {
  return (
    <button
      onClick={props.handelClick}
      className="hover:bg-blue-100 px-10 focus:outline-none focus:bg-blue-100 cursor-pointer flex p-1 rounded-lg justify-end items-center "
    >
      <img
        src="https://source.unsplash.com/100x100/?portrait"
        alt=""
        className="w-12 h-12 mx-2 rounded-full"
      />
      <div class="">
        <h2 className="text-lg font-semibold">{props.user.name}</h2>
        <span className="flex items-center space-x-1">
          <a href="#" className="text-xs hover:underline text-coolGray-600">
            @{props.user.name}
          </a>
        </span>
      </div>
    </button>
  );
}
export function UserLogSettingsButton({ isUser }) {
  const user = useSelector(userSelector);
  const [showDropDown, setShowDropDown] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutSide(wrapperRef, closeDropDown);

  function closeDropDown() {
    setShowDropDown(false);
  }
  return (
    <div
      ref={wrapperRef}
      className="flex relative  justify-end items-center p-2 mt-2 space-x-4"
    >
      {showDropDown && <UserLogSettingsButtonDropDownCard user={user} />}
      {isUser && (
        <Button user={user} handelClick={() => setShowDropDown(true)} />
      )}
    </div>
  );
}
export function SkeletonLoader() {
  return (
    <div className=" flex justify-end">
      <div class="animate-pulse inline-flex py-3 px-5 hover:bg-blue-100 rounded-full items-center p-1 space-x-3 rounded-md">
        <div class="flex  mx-2 items-center ">
          <div class="h-12 bg-blue-400 mx-1 w-12  rounded-full"></div>
        </div>
        <div class="flex-1  space-y-2 leading-tight">
          <div class="h-4 bg-blue-400 rounded w-24"></div>
          <div class="h-2 bg-blue-400 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
export const UserLogSettingsButtonDropDownCard = ({ user }) => {
  return (
    <div className="absolute top-auto bottom-20">
      <div className="block  bg-white">
        <div className="w-64 border border-gray-300 rounded-lg flex flex-col text-sm  text-gray-500 shadow-lg">
          <div className="flex p-2 rounded-t-lg  items-center  rounded">
            <div className="w-8 text-gray-900">
              <div className=" bg-blue-200 h-10 w-10 flex justify-center items-center rounded-full ">
                <div className=" bg-blue-100 h-8 w-8 flex justify-center items-center rounded-full ">
                  <span className="p-1">PL</span>
                </div>
              </div>
            </div>
            <div className="items-center mx-4 leading-tight  flex-col justify-center">
              <div className="text-lg font-bold">{user.name}</div>
              <div>@{user.name}</div>
            </div>
          </div>
          <hr className=" border-gray-300" />
          <div className="flex items-center py-2 mb-2 hover:bg-gray-100 pl-3 rounded">
            <div className="w-8 text-gray-900 italic">
              <IconLogout />
            </div>

            <LogoutButton></LogoutButton>
          </div>
        </div>
      </div>
      <IconTriangle height="25" width="25" />
    </div>
  );
};
export default function UserLogSettings() {
  const { uid, loading } = useContext(uic);
  return !loading ? <UserLogSettingsButton isUser={uid} /> : <SkeletonLoader />;
}
