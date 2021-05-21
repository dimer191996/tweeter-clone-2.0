import { useContext } from "react";
import { uic } from "../../../context";
import CardItem from "../shared/CardItem";
import Form from "../shared/Form";

export default function Comments({ comments, postId, ...props }) {
  const { uid } = useContext(uic);
  function sorted(a, b) {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  }
  return (
    props.isOpen && (
      <div>
        {comments
          ? comments
              .sort(sorted)
              .map(
                (comment) =>
                  "_id" in comment && (
                    <CardItem
                      title={props.mode}
                      mode="comment"
                      key={comment._id}
                      item={comment}
                      postId={postId}
                    />
                  )
              )
          : ""}
        {uid !== null && <Form postId={postId} mode="comment" />}
      </div>
    )
  );
}
