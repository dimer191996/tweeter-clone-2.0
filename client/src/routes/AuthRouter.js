import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { uic } from "../context";

export const AuthRouter = ({ component: Component, ...rest }) => {
  const { uid, loading } = useContext(uic);
  return (
    <Route
      {...rest}
      render={(props) =>
        !uid && !loading ? <Redirect to="/login" /> : <Component {...props} />
      }
    ></Route>
  );
};
export const PublicRouter = ({ component: Component, ...rest }) => {
  const { uid, loading } = useContext(uic);
  return (
    <Route
      {...rest}
      render={(props) =>
        uid && loading ? <Redirect to="/" /> : <Component {...props} />
      }
    ></Route>
  );
};
