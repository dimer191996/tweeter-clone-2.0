import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Profile from "./Profile";
import ProfileHome from "./ProfileHome";
import TalkAndReplies from "./TalkAndReplies";

// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.
//
// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Router app is the same as code-splitting
// any other React app.

export default function NestingExample() {
  let { path, url } = useRouteMatch();
  return (
    <div className="bg-gray-50 h-full">
      <Router>
        <Profile />
        <div>
          <div class=" bg-white">
            <ul class=" flex justify-between  ">
              <li className="p-1 px-4 hover:bg-blue-100 ">
                <Link className=" font-bold " to={`${url}`}>
                  News Feed
                </Link>
              </li>
              <li className="p-1 px-4   hover:bg-blue-100 ">
                <Link className=" font-bold" to={`${url}/feeds`}>
                  Talk / Replies
                </Link>
              </li>
              <li className="p-1 px-4   hover:bg-blue-100 ">
                <Link className=" font-bold" to={`${url}`}>
                  Home
                </Link>
              </li>
              <li className="p-1 px-4   hover:bg-blue-100 ">
                <Link className=" font-bold" to={`${url}`}>
                  Home
                </Link>
              </li>
            </ul>
            <hr />
          </div>
          <Switch>
            <Route exact path={`${path}`} component={ProfileHome}>
              {"home"}
            </Route>
            <Route path={`${path}/feeds`} component={TalkAndReplies}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
