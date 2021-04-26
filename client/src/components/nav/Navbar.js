import { useContext } from "react";

import { Link } from "react-router-dom";
import { uic } from "../../context";
export default function Navbar() {
  const { uid } = useContext(uic);

  return (
    <nav className="bg-white sticky top-0 z-10 border-b dark:bg-gray-800">
      <div className="px-6 py-3 container  mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <Link
                className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
                to="/"
              >
                Brand
              </Link>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 md:flex md:items-center md:justify-between">
            <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8"></div>

            <div className="flex items-center mt-4 md:mt-0">
              <>
                {!uid && (
                  <div>
                    <Link
                      to="/login"
                      className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </>

              <>
                {uid && (
                  <div className="flex">
                    <div className=" ease-in-out duration-500 mx-6 px-2 rounded shadow hover:bg-blue-800  bg-blue-600">
                      <Link
                        className="text-xl  font-bold text-white dark:text-white md:text-xl hover:text-white dark:hover:text-gray-300"
                        to="/create_post"
                      >
                        <div>Create Post +</div>
                      </Link>
                    </div>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
