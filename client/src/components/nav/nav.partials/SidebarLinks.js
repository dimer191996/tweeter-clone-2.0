import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { uic } from "../../../context";
import {
  IconHome,
  IconHashtag,
  IconNotifications,
  IconMessages,
  IconFavorite,
  IconProfile,
  IconMore,
} from "../../z_icons";

export default function SidebarLinks({ mobile = false }) {
  const { uid, loading } = useContext(uic);
  const links = [
    {
      loading: loading,
      ifUserIn: true,
      path: "/home",
      name: "Home",
      icon: <IconHome />,
    },
    {
      loading: loading,
      ifUserIn: true,
      path: "/explore",
      name: "Explore",
      icon: <IconHashtag />,
    },
    {
      loading: loading,
      ifUserIn: uid,
      path: "/notifications",
      name: "Notifications",
      icon: <IconNotifications />,
    },
    {
      loading: loading,
      ifUserIn: uid,
      path: "/messages",
      name: "Messages",
      icon: <IconMessages />,
    },
    {
      loading: loading,
      ifUserIn: uid,
      path: "/favorites",
      name: "Favorites",
      icon: <IconFavorite />,
    },
    {
      loading: loading,
      ifUserIn: uid,
      path: "/profile/" + uid,
      name: "Profile",
      icon: <IconProfile />,
    },
    {
      loading: loading,
      ifUserIn: uid,
      path: "/more",
      name: "More",
      icon: <IconMore />,
    },
  ];
  return links.map((link) => (
    <Link mobile={mobile} key={link.path} link={link}></Link>
  ));
}

export const Link = ({ link, mobile }) => {
  return (
    <li className="rounded-sm mt-1 mx-2">
      {link.ifUserIn && link.loading === false && (
        <NavLink
          exact
          to={link.path}
          activeClassName=" text-blue-500 rounded-full"
          className="inline-flex px-3 lg:px-6 ease-in-out duration-500  hover:bg-blue-200 hover:text-blue-500 rounded-full items-center space-x-3 "
        >
          {link.icon}
          {!mobile && <span className="font-bold">{link.name}</span>}
        </NavLink>
      )}
      {link.loading === true && link.ifUserIn && (
        <div className="">
          <div className="animate-pulse inline-flex py-1 pr-3  hover:bg-blue-100 rounded-full items-center p-1 space-x-3">
            <div className="flex items-center ">
              <div className="h-8 bg-blue-400 mx-1 w-8  rounded-full"></div>
            </div>
            {!mobile && (
              <div className="flex-1 mx-2 space-y-4">
                <div className="h-6 bg-blue-400 rounded w-32 "></div>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
};
