import axios from "axios";
import Cookie from "js-cookie";

export const LogoutButton = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      Cookie.remove(key, { expires: 1 });
    }
  };
  const logout = async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };
  return (
    <button
      onClick={logout}
      className=" text-lg mx-4 w-full flex justify-start focus:outline-none font-medium"
    >
      Sign out
    </button>
  );
};
