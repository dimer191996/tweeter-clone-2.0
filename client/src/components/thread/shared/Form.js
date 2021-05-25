import React, { useState } from "react";
import { useForm } from "../../z_hooks/form.hooks";
import { useDispatch, useSelector } from "react-redux";
import Input from "react-textarea-autosize";
import { userSelector } from "../../../store/selector/user.selector";
import { addComment, addReply } from "../../../store/actions/post/post.actions";
import { sanatize, searchTags } from "../../z_utils";
import { useRouteMatch } from "react-router";
export default function Form(props) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { _id, name } = useSelector(userSelector);
  const { values, onChange, onEnterSubmit } = useForm(createComment, {
    body: "",
  });
  async function createComment() {
    setIsLoading(true);
    let sanatizedBody = sanatize(values.body);
    let tags = searchTags(sanatizedBody);
    values.body = "";

    if (props.mode === "comment") {
      await dispatch(
        addComment(
          {
            body: sanatizedBody,
          },
          { name: name, id: _id },
          props.postId,
          tags,
          path
        )
      );

      setIsLoading(false);
    }
    if (props.mode === "reply") {
      await dispatch(
        addReply(
          {
            body: sanatizedBody,
          },
          { name: name, id: _id },
          props.postId,
          props.commentId,
          tags,
          path
        )
      );
      values.body = "";
      setIsLoading(false);
    }
  }
  return (
    <div
      className={`${
        props.mode === "reply" ? `ml-14 ` : `ml-1 `
      } flex pl-2 pr-4 mt-1 `}
    >
      <div className=" flex  justify-center w-full">
        <div className={` ${props.mode === "reply" ? `w-10` : `w-14`}`}>
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt=""
            className={`${
              props.mode === "reply" ? `w-7 mt-1 h-7` : ` w-10 h-10`
            } rounded-full`}
          />
        </div>
        <div className="w-full relative">
          <Input
            value={values.body}
            autoComplete="off"
            minRows={0}
            maxRows={5}
            maxLength={!isLoading ? 240 : 0}
            onChange={onChange}
            onKeyPress={!isLoading ? onEnterSubmit : null}
            type="text"
            name="body"
            id="scrollbar"
            placeholder={`Add your ${props.mode} here`}
            className={`${
              props.mode === "reply" ? "py-1" : "py-2"
            } px-3  bg-gray-100 resize-none rounded-2xl text-black focus:outline-none w-full`}
          />
        </div>
      </div>
      <div className="flex relative w-14">
        <div className=" flex absolute justify-end  bottom-4    ">
          {[1, 2].map((m) => (
            <div
              className=" h-6 w-6 mx-1 flex justify-center items-center bg-gray-300 rounded-full hover:bg-gray-400"
              key={m}
            >
              {m}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
