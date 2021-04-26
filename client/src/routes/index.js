import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/pages/Home";
import Profile from "../components/pages/profile";
import Navbar from "../components/nav/Navbar";
import Login from "../components/pages/auth/Login";
import Register from "../components/pages/auth/Register";
import { AuthRouter, PublicRouter } from "./AuthRouter";
import Sidebar from "../components/nav/Sidebar";
import Leftbar from "../components/nav/Leftbar";
import PodNav from "../components/nav/PodNav";

export default function index() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <PodNav />
        <div className="w-full">
          <Navbar />
          <Switch>
            <PublicRouter path="/login" exact component={Login} />
            <PublicRouter path="/register" exact component={Register} />
            <Route path="/" exact component={Home} />
            <AuthRouter path="/profile" exact component={Profile} />
            {/* <Redirect to="/" /> */}
          </Switch>
        </div>
        <Leftbar />
      </div>
    </Router>
  );
}
