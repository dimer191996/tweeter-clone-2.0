import React from "react";

const LoadingOverlay = (props) => {
  return (
    props.pending && (
      <div>
        <div
          style={{ borderRadius: "10px" }}
          className=" flex justify-center items-center absolute overflow-hidden h-full w-full top-0 bottom-0 left-0"
        >
          <div className=" top-0 bottom-0 h-full w-full left-0 opacity-60 bg-gray-100"></div>
          <div className="flex flex-col-reverse justify-center absolute  text-black items-center ">
            <label className="font-bold px-5">{props.lable}</label>
            <div>
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LoadingOverlay;
