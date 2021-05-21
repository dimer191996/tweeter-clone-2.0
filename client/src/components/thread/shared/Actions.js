import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  likeComment,
  likeReply,
} from "../../../store/actions/post/post.actions";
import { dateFormater } from "../../z_utils";
import CRrefreshError from "./CRrefreshError";

export const Button = ({ isLoading, isReady, lable, onClick }) => {
  return (
    <button
      onClick={isReady || isLoading ? onClick : null}
      className={`${
        !isReady && !isLoading && ` cursor-wait text-gray-500   `
      }  focus:outline-none font-bold  mr-2 text-black text-xs`}
    >
      {lable}
    </button>
  );
};
const Actions = ({ mode, item, postId, ...props }) => {
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();

  const delay = (() => {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  function like() {
    if (mode === "comment") {
      dispatch(likeComment(item._id, postId, item.isLiked, { wait }));
    }
    if (mode === "reply") {
      dispatch(
        likeReply(item._id, item.commentId, postId, item.isLiked, { wait })
      );
    }
    setWait(true);
    delay(() => {
      setWait(false);
    }, 2000); // end delay
  }
  return (
    <div className=" ml-2">
      {!item.isError ? (
        <div>
          <Button
            isLoading={wait}
            onClick={like}
            lable="Like"
            isReady={item.isReady}
          />
          <Button
            onClick={props.handleShowReplyForm}
            lable="Reply"
            isLoading={wait}
            isReady={item.isReady}
          />
          <span className="font-bold pr-1  text-black text-xs">
            {dateFormater(moment(item.timestamp).fromNow())}
          </span>
        </div>
      ) : (
        <CRrefreshError item={item} mode={mode} postId={postId} />
      )}
    </div>
  );
};

export default Actions;
