import React from "react";
import ReactModal from "react-modal";
const Modal = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      border: "none",
      width: "30rem",
      "z-index": "40",
      boxShadow:
        " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      bottom: "auto",
      borderRadius: "10px",
      paddingRight: "0px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div>
      {props.isOpen && (
        <ReactModal
          shouldFocusAfterRender={false}
          preventScroll={false}
          style={customStyles}
          parentSelector={() => document.querySelector("#modal")}
          isOpen={props.isOpen}
          contentLabel="Minimal Modal Example"
        >
          {React.cloneElement(props.children, props)}
        </ReactModal>
      )}
    </div>
  );
};

export default Modal;
