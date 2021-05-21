import React from "react";

import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector/user.selector";
import moment from "moment";
import { IconCalendar } from "../z_icons";

export const Profile = (props) => {
  const user = useSelector(userSelector);
  return (
    <>
      <div className="">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-col">
            <div className=" mx-auto ">
              <div className=" relative">
                <div className="absolute top-40 -right-14 ">
                  <div className=" flex items-center bg-gray-50 px-2 z-10 justify-center  rounded-full h-28 w-28">
                    <div>
                      <img
                        src="https://source.unsplash.com/100x100/?portrait"
                        alt="content"
                        class=" border  rounded-full "
                      ></img>
                    </div>
                    <div className="absolute ease-in-out duration-500 font-bold opacity-0 text-white cursor-pointer hover:opacity-40 flex justify-center items-center bg-black w-full rounded-full h-full">
                      Change
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              alt="content"
              className="object-cover border-b object-center h-52 w-full"
              src="https://source.unsplash.com/1000x900/?portrait"
            />
          </div>
        </section>
        <section>
          <div className="flex h-38 justify-between bg-white ">
            <div className=" w-52   overflow-hidden p-3 rounded-md">
              {user ? (
                <div className=" flex flex-col tracking-wide  ">
                  {" "}
                  <h2 className=" text-2xl font-bold text-blue-400">
                    {user.name}
                  </h2>
                  {user.username ?? (
                    <span className="text-gray-300 text-sm">No name</span>
                  )}
                  <h2 className="  text-gray-600 text-sm font-bold">
                    {user.email}
                  </h2>
                  <div className=" flex items-center   text-gray-400 text-sm font-medium">
                    <IconCalendar
                      classes=" fill-current mr-2"
                      height="20"
                      width="20"
                    />{" "}
                    Join in {moment(user.createdAt).format("MMM Do Y")}
                  </div>
                  <h2 className="  text-gray-400 text-sm font-medium">
                    0 Following 0 Followers
                  </h2>
                </div>
              ) : (
                <div className="">
                  <div className="animate-pulse items-center">
                    <div className="flex-1">
                      <div className="h-6 bg-blue-400 my-2 rounded w-32 "></div>
                    </div>
                    <div className="flex-1 my-2 ">
                      <div className="h-5 bg-blue-400 rounded w-24 "></div>
                    </div>
                    <div className="flex-1 ">
                      <div className="h-2 bg-blue-400 rounded w-20 "></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className=" flex items-centerjustify-center  overflow-y-auto  rounded-md">
              {user ? (
                <div className=" px-3 pl-1 w-52  pt-2   flex justify-center items-center ">
                  {user.bio ?? (
                    <div className=" text-sm">
                      <div className=" flex justify-center font-bold text-red-500 items-center">
                        Bio
                      </div>
                      What makes you special? Don't think too hard, just have
                      fun with it.
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-pulse pt-2 items-center">
                  <div className="flex-1 ">
                    <div className="h-3 my-1 bg-blue-400 rounded w-full "></div>
                  </div>
                  <div className="flex-1 ">
                    <div className="h-3 my-1 bg-blue-400 rounded w-full "></div>
                  </div>
                  <div className="flex-1 ">
                    <div className="h-3 my-1 bg-blue-400 rounded w-full "></div>
                  </div>
                  <div className="flex-1 ">
                    <div className="h-3 my-1 bg-blue-400 rounded w-full "></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Profile;
