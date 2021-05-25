import React, { useContext } from "react";
import FlexWrapper from "./FlexWrapper";
import PActionButton from "./PActionButton";
import { IconThumbUp, IconMessages, IconShare } from "../../z_icons";
import { useDispatch } from "react-redux";
import { likePost } from "../../../store/actions/post/post.actions";
import { uic } from "../../../context";
import { useRouteMatch } from "react-router";
export default function PActions(props) {
  const { uid } = useContext(uic);
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  return (
    <FlexWrapper div1=" mt-1 mb-2">
      <PActionButton
        lable="Like"
        type="primary"
        onClick={() =>
          dispatch(likePost(props.post._id, uid, props.post.liked, path))
        }
      >
        <IconThumbUp
          height="24"
          width="24"
          classes={`${
            props.post.liked && `text-blue-500`
          } ease-in-out duration-500 cursor-pointer hover:text-blue-400`}
        />
      </PActionButton>
      <PActionButton onClick={props.handleOpenComment} lable="Comment">
        <IconMessages
          height="18"
          width="18"
          classes="mr-2 cursor-pointer hover:text-blue-500"
        />
      </PActionButton>
      <PActionButton lable="Share">
        <IconShare
          height="22"
          width="23"
          classes="ease-in-out mr-1 mb-1 duration-500 cursor-pointer hover:text-blue-400"
        />
      </PActionButton>
    </FlexWrapper>
  );
}
