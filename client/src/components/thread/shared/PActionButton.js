import React from "react";

const PActionButton = ({ children, lable, onClick, ...props }) => {
  const { type = "primary" } = props;
  const primary = {
    active:
      "active:bg-gray-200 focus:outline-none hover:bg-gray-100  cursor-pointer",
    position: "flex justify-center items-center ",
    look: " rounded-full sm:rounded mx-5  my-1 py-1 lg:px-3 px-2 ",
  };

  function buttonTypes() {
    switch (type) {
      case "primary":
        return (
          <button
            onClick={onClick}
            className={`${primary.active} ${primary.position} ${primary.look}`}
          >
            {children}
            <span className="hidden sm:flex justify-center items-center text-gray-600  font-bold px-1">
              {lable}
            </span>
          </button>
        );

      case "primary-upload":
        return (
          <button
            className={`${primary.active} ${primary.position} ${primary.look}`}
          >
            <label className="mx-1 cursor-pointer  rounded-full">
              <div className="flex items-cente">
                {children}
                <span className="pl-2 hidden sm:flex  font-bold ">{lable}</span>
              </div>
              <input
                onChange={props.handleChange}
                type="file"
                className="hidden"
              />
            </label>
          </button>
        );
    }
  }
  return buttonTypes();
};

export default PActionButton;
