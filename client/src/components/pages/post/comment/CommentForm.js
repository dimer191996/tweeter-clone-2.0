import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../hooks/form.hooks";
import { userSelector } from "../../../../store/selector/user.selector";
import { addComment } from "../../../../store/actions/post/post.actions";
export default function CommentForm({ postId }) {
  const dispatch = useDispatch();
  const { _id, name } = useSelector(userSelector);
  const { values, onChange, onEnterSubmit } = useForm(createComment, {
    body: "",
  });
  function createComment() {
    dispatch(addComment(values, { name: name, id: _id }, postId));
  }
  return (
    <div className=" mt-3 mx-5 flex">
      <div class="w-14">
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div class="w-full relative">
        <input
          value={values.body}
          onChange={onChange}
          onKeyPress={onEnterSubmit}
          type="text"
          name="body"
          placeholder="Add your comment here"
          className=" border  px-1 py-2 resize-none pl-12 pr-28 rounded-2xl focus:outline-none w-full"
        />
        <div className=" flex absolute left-3   " style={{ bottom: "9px" }}>
          <div className=" h-6 w-6 mx-1 flex justify-center items-center bg-gray-300 rounded-full hover:bg-gray-400">
            1
          </div>
        </div>
        <div className=" flex absolute right-4   " style={{ bottom: "9px" }}>
          {[1, 2, 3].map((m) => (
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
