import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import Profile from "./Profile";
import ProfileHome from "./ProfileHome";
import TalkAndReplies from "./TalkAndReplies";

const Index = () => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <Router>
        <Profile />
        <div>
          <div class=" bg-white">
            <ul class=" flex justify-between text-gray-500 ">
              <NavLink
                to={`${url}`}
                exact
                activeClassName=" text-blue-500  border-b-4 border-blue-400 "
                className="pb-2 flex  justify-center pt-2 w-full   hover:bg-blue-100 "
              >
                <li className=" px-4 font-bold ">News Feed</li>
              </NavLink>
              <NavLink
                to={`${url}/feeds`}
                exact
                activeClassName=" text-blue-500 border-b-4 border-blue-400"
                className="pb-2 flex  justify-center pt-2 w-full  hover:bg-blue-100 "
              >
                <li className=" px-4 font-bold">Talk / Replies</li>
              </NavLink>
            </ul>
            <hr />
          </div>

          <Switch>
            <Route exact path={`${path}`} component={ProfileHome}></Route>
            <Route
              exact
              path={`${path}/feeds`}
              component={TalkAndReplies}
            ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Index;
