import axios from "axios";
import Cookie from "js-cookie";
import { IconLogout } from "../../z_icons";

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
      className="flex items-center mx-2 my-2 py-2 mb-2 focus:outline-none hover:bg-gray-100 pl-3 rounded-lg"
    >
      <div className=" text-lg mx-4  items-center flex justify-center font-medium">
        <span className=" pr-3">
          <IconLogout height="20" width="20" />
        </span>
        <span className=" font-bold">Log me out</span>
      </div>
    </button>
  );
};
