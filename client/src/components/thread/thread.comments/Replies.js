import React from "react";
import CardItem from "../shared/CardItem";

export default function Replies({ replies, postId, commentId }) {
  return (
    <div>
      {replies
        ? replies.map(
            (reply) =>
              "_id" in reply && (
                <CardItem
                  key={reply._id}
                  mode="reply"
                  item={reply}
                  postId={postId}
                  commentId={commentId}
                >
                  <div>hello world</div>
                </CardItem>
              )
          )
        : ""}
    </div>
  );
}
