import React, { useContext, useState } from "react";
import { useForm } from "../../../hooks/form.hooks";
import { IconImage, IconMic, IconSmiley } from "../../../icons";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../../store/actions/post/post.actions";
import { userSelector } from "../../../../store/selector/user.selector";
import { uic } from "../../../../context";

export function Form() {
  const dispatch = useDispatch();
  const [pendingNewPost, setPendingNewPost] = useState(false);
  const [file, setFile] = useState();
  const user = useSelector(userSelector);

  const { values, onChange, onClickSubmit } = useForm(addpost, {
    title: "",
    body: "",
  });

  function handlePicture(e) {
    console.log(e);
  }

  async function addpost() {
    setPendingNewPost(true);
    await dispatch(addPost(values, user));
    setPendingNewPost(false);
  }

  return (
    <div>
      <div className="w-6/7 mb-5 bg-white  h-auto">
        <div className=" shadow py-5">
          <div className="flex mx-2">
            <div class="w-14">
              <img
                src="https://source.unsplash.com/100x100/?portrait"
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div class="w-full ml-3">
              <input
                onChange={onChange}
                value={values.title}
                name="title"
                placeholder="What's this is"
                className="w-full text-lg font-medium focus:outline-none resize-none"
              />
              <TextareaAutosize
                onChange={onChange}
                value={values.body}
                name="body"
                placeholder="What's hapenning  give us some context"
                className="w-full leading-tight font-sans  h-8 focus:outline-none resize-none"
              />
              <button className=" rounded-full px-1 focus:bg-blue-200 focus:outline-none hover:bg-blue-100">
                <span className=" text-sm font-bold text-blue-500">
                  🌎 Evryone can reply
                </span>
              </button>
              <div className=" border-b py-1"></div>
              <div class="flex justify-between items-center">
                <div className=" flex mt-1 items-center justify-self-start">
                  <button className=" mx-1 rounded-full p-2 focus:bg-blue-200 focus:outline-none hover:bg-blue-100">
                    <span className=" text-sm font-bold text-blue-500">
                      <IconImage />
                    </span>
                  </button>

                  <button className=" mx-1  rounded-full p-2 focus:bg-blue-200 focus:outline-none hover:bg-blue-100">
                    <span className=" text-sm font-bold text-blue-500">
                      <IconMic />
                    </span>
                  </button>
                  <button className=" mx-1 rounded-full p-2 focus:bg-blue-200 focus:outline-none hover:bg-blue-100">
                    <span className=" text-sm font-bold text-blue-500">
                      <IconSmiley />
                    </span>
                  </button>
                </div>
                <div>
                  {!pendingNewPost ? (
                    <button
                      onClick={onClickSubmit}
                      className="  active:bg-blue-800 bg-blue-500 p-1 focus:outline-none  ease-in-out duration-350 px-2 rounded shadow hover:bg-blue-800   rounded-lg px-3 text-white"
                    >
                      Add Post
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="inline-flex ease-in-out duration-350 items-center p-1 focus:outline-none border  px-3   text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600  active:bg-blue-700 cursor-not-allowed"
                      disabled=""
                    >
                      <svg
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PostForm() {
  const { uid, loading } = useContext(uic);
  return uid && <Form />;
}
