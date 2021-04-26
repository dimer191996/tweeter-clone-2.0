import React, { useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
} from "../../icons";
export default function SidebarLinks({ mobile = false }) {
  const { uid, loading } = useContext(uic);
  const links = [
    {
      loading: loading,
      show: true,
      path: "/",
      name: "Home",
      icon: <IconHome />,
    },
    {
      loading: loading,
      show: true,
      path: "/explore",
      name: "Explore",
      icon: <IconHashtag />,
    },
    {
      loading: loading,
      show: uid,
      path: "/notifications",
      name: "Notifications",
      icon: <IconNotifications />,
    },
    {
      loading: loading,
      show: uid,
      path: "/messages",
      name: "Messages",
      icon: <IconMessages />,
    },
    {
      loading: loading,
      show: uid,
      path: "/favorites",
      name: "Favorites",
      icon: <IconFavorite />,
    },
    {
      loading: loading,
      show: uid,
      path: "/profile",
      name: "Profile",
      icon: <IconProfile />,
    },
    {
      loading: loading,
      show: uid,
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
    <li className="rounded-sm py-1 mx-2">
      {link.show && !link.loading && (
        <NavLink
          exact
          to={link.path}
          activeClassName="bg-blue-200 rounded-full"
          className=" inline-flex px-5 hover:bg-blue-100 rounded-full items-center p-1 space-x-3 rounded-md"
        >
          {link.icon}
          {!mobile && <span>{link.name}</span>}
        </NavLink>
      )}
      {link.loading && (
        <div className="">
          <div class="animate-pulse inline-flex py-2 px-5 hover:bg-blue-100 rounded-full items-center p-1 space-x-3 rounded-md">
            <div class="flex items-center ">
              <div class="h-8 bg-blue-400 mx-1 w-8  rounded-full"></div>
            </div>
            {!mobile && (
              <div class="flex-1 mx-2 space-y-4">
                <div class="h-6 bg-blue-400 rounded w-32"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
};
