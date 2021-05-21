import React, { Fragment } from "react";
import Form from "../shared/Form";
import Replies from "./Replies";

export default function EntryReplyView({
  replies,
  commentId,
  postId,
  mode,
  showReplyForm,
}) {
  return (
    <Fragment>
      {mode === "comment" && (
        <div>
          <Replies
            showReplyForm={showReplyForm}
            replies={replies}
            commentId={commentId}
            postId={postId}
          />
          {showReplyForm && (
            <Form commentId={commentId} postId={postId} mode="reply" />
          )}
        </div>
      )}
    </Fragment>
  );
}
