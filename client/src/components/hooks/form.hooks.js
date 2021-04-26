import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onEnterSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callback();
    }
  };
  const onClickSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onClickSubmit,
    onEnterSubmit,
    onChange,
    values,
  };
};
