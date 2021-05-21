import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "../z_hooks/form.hooks";
const Login = () => {
  const [errors, setErrors] = useState({});
  const { onChange, onClickSubmit, values } = useForm(logIn, {
    name: "",
    password: "",
  });
  function logIn() {
    axios({
      method: "post",
      url: "http://localhost:5000/api/user/login",
      data: values,
      withCredentials: true,
    }).then(({ data }) => {
      data.errors ? setErrors(data.errors) : (window.location = "/");
    });
  }
  return (
    <div className="flex flex-wrap justify-center items-center">
      <div className=" py-8 px-28 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 className="text-gray-900 text-lg text-center font-medium title-font mb-5">
          LOGIN
          <div className="h-8">
            {/* {" "}
              {loading ? (
                <span className="text-sm text-green-700 bold font-bold">
                  Wait... We are processiong your data
                </span>
              ) : (
                ""
              )}{" "} */}
          </div>
        </h2>
        <div className="h-5 text-center">
          <div className="text-red-600 font-bold text-md">
            {/* {errors.general} */}
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="full-name"
            className="leading-7 text-sm text-gray-600"
          >
            name
          </label>
          <input
            value={values.name}
            onChange={onChange}
            type="text"
            name="name"
            className={
              "w-full bg-white rounded border border-gray-300 focus: border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            }
          />
          <div className="h-5">
            {errors.name && (
              <div className="text-red-600 text-md">{errors.name}</div>
            )}
          </div>
        </div>
        <div className="relative">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">
            password
          </label>
          <input
            value={values.password}
            onChange={onChange}
            type="password"
            name="password"
            className={
              "w-full bg-white rounded border border-gray-300 focus: border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            }
          />
          <div className="h-5">
            {errors.password && (
              <div className="text-red-600 text-md">{errors.password}</div>
            )}
          </div>
        </div>
        {/* {!loading ? ( */}
        <button
          type="submit"
          onClick={onClickSubmit}
          className="text-white bg-indigo-500 border-0 py-2 my-4 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Login
        </button>
        {/* ) : ( */}

        {/* )} */}

        <p className="text-xs text-gray-500 mt-3">
          Don't have an account ?
          <Link to="/register" className=" underline text-blue-700">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
