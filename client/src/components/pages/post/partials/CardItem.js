import moment from "moment";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { uic } from "../../../../context";
import { IconMore, IconShare, IconThumbUp } from "../../../icons";
import { timestampParser } from "../../../utils";
import CommentCard from "../comment/CommentCard";

export function CardItem({ post }) {
  const uid = useContext(uic);
  return (
    <div className=" flex">
      <div className="w-full relative">
        <div className="mt-4 mx-8  rounded-lg mb-4 ">
          <div className="mb-2">
            <div className="bg-white  flex flex-col w-full shadow rounded-lg py-2 px-4">
              <div className="inline-flex" href="/">
                <img
                  alt="blog"
                  src="https://dummyimage.com/103x103"
                  className="w-10 h-10 mx-4 rounded-full flex-shrink-0 object-cover object-center"
                />
                <div className="flex flex-col">
                  <div className="flex-grow mb-1 flex flex-col">
                    <div className=" ">
                      <div className=" text-black opacity-75 text-sm">
                        <span className="font-medium">
                          {moment(post.createdAt).fromNow()}
                        </span>{" "}
                        | <span className=" font-bold">@{post.creator}</span>
                      </div>

                      <a
                        href=""
                        className=" hover:underline opacity-75 font-bold"
                      >
                        {post.title}
                      </a>
                    </div>
                  </div>
                  <span
                    style={{ fontWeight: "460", fontSize: "14.5px" }}
                    className="leading-tight mb-1 font-sans  text-justify"
                  >
                    {post.body}.
                  </span>
                </div>
              </div>
              {uid ? (
                <CommentCard comments={post.comments} postId={post._id} />
              ) : (
                <div className=" text-sm mt-3 pt-3 font-medium   flex justify-center text-center  ">
                  <span>Sign In To Participate in discutions.</span>
                  <Link
                    className="text-blue-600 flex hover:underline pl-2"
                    to="/login"
                  >
                    <span>Login here</span>
                    <span className=" flex items-center px-2">
                      <svg
                        enableBackground="new 0 0 24 24"
                        height="22"
                        viewBox="0 0 24 24"
                        width="22"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m22.574.433c-.187-.271-.495-.433-.824-.433h-10.75c-1.654 0-3 1.346-3 3v.779l.121.1 4 4c.567.566.879 1.32.879 2.121s-.312 1.555-.879 2.121l-4 4-.121.1v1.779c0 1.654 1.346 3 3 3h3.5c.415 0 .787-.256.934-.643l7.25-19c.118-.308.076-.654-.11-.924z"
                          fill="#2196f3"
                        />
                        <path
                          d="m19.386 10h-6.386c0 .801-.312 1.555-.879 2.121l-4 4-.121.1v1.779c0 1.654 1.346 3 3 3h3.5c.415 0 .787-.256.934-.643z"
                          fill="#1d83d4"
                        />
                        <path
                          d="m5.617 14.924c-.373-.155-.617-.52-.617-.924v-3h-4c-.552 0-1-.448-1-1s.448-1 1-1h4v-3c0-.404.244-.769.617-.924.374-.155.804-.069 1.09.217l4 4c.391.391.391 1.023 0 1.414l-4 4c-.286.286-.716.372-1.09.217z"
                          fill="#607d8b"
                        />
                        <path
                          d="m21.363.099-6.008 2.003c-.811.28-1.355 1.043-1.355 1.898v18c0 1.103.897 2 2 2 .214 0 .417-.031.637-.099l6.008-2.003c.811-.28 1.355-1.043 1.355-1.898v-18c0-1.317-1.281-2.318-2.637-1.901z"
                          fill="#64b5f6"
                        />
                        <path
                          d="m11 10h-11c0 .552.448 1 1 1h4v3c0 .404.244.769.617.924.124.051.254.076.383.076.26 0 .516-.102.707-.293l4-4c.195-.195.293-.451.293-.707z"
                          fill="#546d79"
                        />
                        <path
                          d="m14 12h10v8c0 .855-.545 1.617-1.354 1.898l-6.009 2.003c-.22.068-.423.099-.637.099-1.103 0-2-.897-2-2z"
                          fill="#579ed6"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              )}
            </div>
            <div className=" absolute top-14 left-4  ">
              <div className=" flex flex-col justify-center items-center ">
                {[{ m: 1, icon: <IconThumbUp /> }].map((m) => (
                  <>
                    <div class="my-1">{m.icon}</div>{" "}
                  </>
                ))}
              </div>
            </div>
          </div>
          {!uid && (
            <span className=" text-sm  flex justify-center text-center py-2 bg-green-200">
              <span>Sign In To Participate in discutions.</span>
              <Link
                className="text-blue-600 flex hover:underline px-2"
                to="/login"
              >
                <span>Login here</span>
                <span className=" flex justify-center items-center px-2">
                  <svg
                    enableBackground="new 0 0 24 24"
                    height="22"
                    viewBox="0 0 24 24"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m22.574.433c-.187-.271-.495-.433-.824-.433h-10.75c-1.654 0-3 1.346-3 3v.779l.121.1 4 4c.567.566.879 1.32.879 2.121s-.312 1.555-.879 2.121l-4 4-.121.1v1.779c0 1.654 1.346 3 3 3h3.5c.415 0 .787-.256.934-.643l7.25-19c.118-.308.076-.654-.11-.924z"
                      fill="#2196f3"
                    />
                    <path
                      d="m19.386 10h-6.386c0 .801-.312 1.555-.879 2.121l-4 4-.121.1v1.779c0 1.654 1.346 3 3 3h3.5c.415 0 .787-.256.934-.643z"
                      fill="#1d83d4"
                    />
                    <path
                      d="m5.617 14.924c-.373-.155-.617-.52-.617-.924v-3h-4c-.552 0-1-.448-1-1s.448-1 1-1h4v-3c0-.404.244-.769.617-.924.374-.155.804-.069 1.09.217l4 4c.391.391.391 1.023 0 1.414l-4 4c-.286.286-.716.372-1.09.217z"
                      fill="#607d8b"
                    />
                    <path
                      d="m21.363.099-6.008 2.003c-.811.28-1.355 1.043-1.355 1.898v18c0 1.103.897 2 2 2 .214 0 .417-.031.637-.099l6.008-2.003c.811-.28 1.355-1.043 1.355-1.898v-18c0-1.317-1.281-2.318-2.637-1.901z"
                      fill="#64b5f6"
                    />
                    <path
                      d="m11 10h-11c0 .552.448 1 1 1h4v3c0 .404.244.769.617.924.124.051.254.076.383.076.26 0 .516-.102.707-.293l4-4c.195-.195.293-.451.293-.707z"
                      fill="#546d79"
                    />
                    <path
                      d="m14 12h10v8c0 .855-.545 1.617-1.354 1.898l-6.009 2.003c-.22.068-.423.099-.637.099-1.103 0-2-.897-2-2z"
                      fill="#579ed6"
                    />
                  </svg>
                </span>
              </Link>
            </span>
          )}
        </div>
        {/* <div className=" ml-5">votes</div> */}
      </div>
    </div>
  );
}
