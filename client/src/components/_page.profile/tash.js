import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector/user.selector";
import moment from "moment";
import ThreadForm from "./../thread/ThreadForm";
import ProfileHome from "./ProfileHome";
// import ProfileInfo from "./ProfileInfo";
// import Thread from "../thread/Thread";

export const Profile = (props) => {
  const user = useSelector(userSelector);
  let { path, url } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <div className=" bg-gray-50 h-full">
            <section className="text-gray-600 body-font">
              <div className="container pb-3 mx-auto flex flex-col">
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
            <section className="mx-6">
              <div className="flex h-28 justify-between bg-white rounded-md border-b">
                <div className=" w-52   overflow-hidden p-3 rounded-md">
                  {user ? (
                    <div className=" ">
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
                      <h2 className="  text-gray-400 text-sm font-medium">
                        Join in {moment(user.createdAt).format("MMM Do Y")}
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
                <div className=" w-52 flex items-center pt-2 pl-3 justify-center  overflow-y-auto  rounded-md">
                  {user ? (
                    <div className="border-l-4 pl-1  flex justify-center items-center ">
                      {user.bio ?? (
                        <div className=" text-sm font-bold">no bio yet</div>
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
            <section>
              <ThreadForm />
            </section>
            <li>
              <Link to={`${url}/profileHome`}>Rendering with React</Link>
            </li>
          </div>
        </Route>
        <Route path={`${path}/ProfileHome`}>
          <ProfileHome />
        </Route>
      </Switch>
    </>
  );
};
export default Profile;
