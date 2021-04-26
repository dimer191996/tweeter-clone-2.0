import React, { useEffect, useState } from "react";
import axios from "axios";
import Routes from "./routes";
import { uic } from "./context";
import { useDispatch } from "react-redux";
import { getUser } from "./store/actions/user/user.actions";

function App() {
  const [loading, setLoading] = useState(true);
  const [uid, setuid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios
        .get("http://localhost:5000/jwtid", { withCredentials: true })
        .then((res) => {
          setuid(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("no token");
          setLoading(false);
        });
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);
  return (
    <uic.Provider value={{ uid: uid, loading: loading }}>
      <Routes />
    </uic.Provider>
  );
}

export default App;
