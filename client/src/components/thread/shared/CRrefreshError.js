import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addReply } from "../../../store/actions/post/post.actions";
import { userSelector } from "../../../store/selector/user.selector";

export default function CRrefreshError(props) {
  const { _id, name } = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function updateItem() {
    setIsLoading(true);

    if (props.mode === "reply") {
      await dispatch(
        addReply(
          {
            replyId: props.item._id,
            body: props.item.body,
            isError: props.item.isError,
          },
          { name: name, id: _id },
          props.postId,
          props.item.commentId
        )
      );
      setIsLoading(false);
    }
    if (props.mode === "comment") {
      await dispatch(
        addComment(
          {
            commentId: props.item._id,
            body: props.item.body,
            isError: props.item.isError,
          },
          { name: name, id: _id },
          props.postId
        )
      );
      setIsLoading(false);
    }
  }
  return (
    <div className=" ease-in-out duration-500 tracking-tighter leading-tight">
      <span className="text-xs ">Unable to Post {props.mode}.</span>
      <button
        onClick={!isLoading ? updateItem : null}
        className="text-xs px-1 text-blue-500 hover:underline focus:outline-none"
      >
        {!isLoading ? "Try again" : "Loading"}
      </button>
    </div>
  );
}
