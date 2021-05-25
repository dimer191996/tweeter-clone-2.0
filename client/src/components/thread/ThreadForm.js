import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "../z_hooks/form.hooks";

import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/actions/post/post.actions";
import { userSelector } from "../../store/selector/user.selector";
import { IconClose } from "../z_icons";
import Modal from "./shared/Modal";
import AddPostWithOptions from "./shared/AddPostWithOptions";
import LoadingOverlay from "./shared/LoadingOverlay";
import { sanatize, searchTags } from "../z_utils";
import { useRouteMatch } from "react-router";

export function Form(props) {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [pendingNewPost, setPendingNewPost] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [previewImage, setPreviewImage] = useState();
  const { path } = useRouteMatch();

  const { values, onChange, onClickSubmit } = useForm(addpost, {
    title: "",
    body: "",
  });

  function bodyStringCount(body) {
    return body.trim().length;
  }
  // create a previewImage as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreviewImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  async function addpost() {
    let sanatizedBody = sanatize(values.body);
    let tags = searchTags(sanatizedBody);
    setPendingNewPost(true);
    await dispatch(
      addPost(
        { ...values, body: sanatizedBody },
        user,
        selectedFile,
        tags,
        path
      )
    );

    //clear the body and title
    values.body = "";
    values.title = "";

    //clear the file
    setPreviewImage(undefined);
    setSelectedFile(undefined);

    //clear isPostReady loader
    setPendingNewPost(false);
  }

  return (
    <div className=" bg-white flex  flex-col flex-wrap">
      <div className="py-3 ">
        <div className="flex justify-between">
          <div></div>
          <div className="font-bold text-lg">Create Post</div>
          <div className="font-bold text-lg pr-5">
            <button
              onClick={props.handleCloseModal}
              className=" bg-gray-200 hover:bg-gray-300
                          cursor-pointer p-2 rounded-full"
            >
              <IconClose
                height="15"
                classes=" fill-current text-gray-700"
                width="15"
              />
            </button>
          </div>
        </div>
        <hr className=" my-2 mx-5" />
        <div className="flex px-5 justify-start items-center">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt="user"
            className="w-12 h-12 rounded-full"
          />
          <div className="px-2">
            <ul className=" text-gray-700 leading-tight">
              <li className=" font-bold">@{user.name}</li>
              <li className=" text-sm">{user.email}</li>
            </ul>
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <div
              id="scrollbar"
              className=" flex flex-col max-h-60  overflow-y-scroll "
            >
              {/* <input
              onChange={onChange}
              value={values.title}
              name="title"
              placeholder="What's this is"
              className="w-full text-lg font-medium focus:outline-none resize-none"
            /> */}
              <div className="pl-4">
                <TextareaAutosize
                  onChange={onChange}
                  value={values.body}
                  minRows={2}
                  maxlength="240"
                  name="body"
                  placeholder={`What's hapenning ${user.name} ?`}
                  className={`w-full mt-6 ${
                    bodyStringCount(values.body) > 62 ? "text-md" : "text-2xl"
                  } pr-5 leading-tight font-sans overflow-hidden  h-8 focus:outline-none resize-none`}
                />
              </div>
              <div className=" h-4 flex px-5 justify-end ease-in-out duration-500">
                {bodyStringCount(values.body) > 180 && (
                  <span
                    className={`${
                      bodyStringCount(values.body) > 190 ? " text-red-500" : ""
                    } font-bold p-1 rounded-lg px-2 text-xs ease-in-out duration-500  `}
                  >
                    {bodyStringCount(values.body)}-240
                  </span>
                )}
              </div>

              {selectedFile && (
                <div>
                  <hr className=" my-2 mx-5" />
                  <div className="  flex justify-center items-center  flex-wrap ">
                    <div className="px-3 relative">
                      <img
                        alt="user"
                        src={previewImage}
                        className=" mx-2 hover:opacity-75 rounded-lg relative  object-contain"
                      />
                      <div className="absolute top-5 right-0 mr-10 ">
                        <button
                          onClick={() => {
                            setPreviewImage(undefined);
                            setSelectedFile(undefined);
                          }}
                          className=" bg-gray-200 hover:bg-gray-300
                          cursor-pointer p-2 rounded-full"
                        >
                          <IconClose
                            height="15"
                            classes=" fill-current text-gray-700"
                            width="15"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className=" px-5">
              <AddPostWithOptions handleChange={handleFile} />
              <button
                onClick={
                  bodyStringCount(values.body) > 3 ? onClickSubmit : null
                }
                className={`font-bold  w-full active:bg-blue-700 ${
                  bodyStringCount(values.body) < 3
                    ? " bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }  p-1 focus:outline-none  ease-in-out duration-350 px-2 rounded-lg shadow  `}
              >
                Add Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay pending={pendingNewPost} lable="Posting" mode="Post" />
    </div>
  );
}

export function OpenPostFormButton(props) {
  return (
    <div className=" ">
      <div className=" w-full   px-4 py-2 bg-white ">
        <div className="flex items-center">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div
            onClick={props.handleOpenModal}
            className="flex pb-1 pt-2 items-center w-full rounded-full ml-4 pl-5 cursor-pointer bg-gray-100 hover:bg-gray-200  "
          >
            <span className="font-medium text-gray-600  text-lg">{`What's hapenning ${props.name} ?`}</span>
          </div>
        </div>
        <hr className="my-2" />

        <AddPostWithOptions />
      </div>
    </div>
  );
}

export default function PostForm(props) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  return (
    <Fragment>
      <OpenPostFormButton handleOpenModal={() => setIsModelOpen(true)} />
      <Modal mode="post" isOpen={isModelOpen}>
        <Form handleCloseModal={() => setIsModelOpen(false)} />
      </Modal>
    </Fragment>
  );
}
