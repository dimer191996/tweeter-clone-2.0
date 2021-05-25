import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Home from "../components/Home";
import Profile from "../components/_page.profile";
import Navbar from "../components/nav/Navbar";
import Login from "../components/_page.auth/Login";
import Register from "../components/_page.auth/Register";
import { PublicRouter } from "./AuthRouter";
import Sidebar from "../components/nav/Sidebar";
import Leftbar from "../components/nav/Leftbar";
import MobileNav from "../components/nav/MobileNavBar";
import Explore from "../components/Explore";

export default function Index() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <MobileNav />
        <div className="lg:w-3/4 sm:w-full">
          <Navbar />
          <Switch>
            <PublicRouter path="/login" exact component={Login} />
            <PublicRouter path="/register" exact component={Register} />
            <Route path="/home" exact component={Home} />
            <Route path="/explore" component={Explore} />
            <Route path="/profile/:id" component={Profile}></Route>
            {/* <Redirect to="/" /> */}
          </Switch>
        </div>
        <Leftbar />
      </div>
    </Router>
  );
}
