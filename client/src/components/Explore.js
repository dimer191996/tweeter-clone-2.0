import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { getExplorePosts } from "../store/actions/post/post.actions";
import {
  loadingPostSelector,
  postSelector,
} from "../store/selector/post.selector";
import Threads from "./thread/Threads";
import _ from "lodash";
export default function Explore() {
  const dispatch = useDispatch();
  let loading = useSelector(loadingPostSelector);
  const posts = useSelector(postSelector);
  const { path } = useRouteMatch();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    if (_.isEmpty(posts[path])) {
      dispatch(getExplorePosts(path));
    }
  }
  return (
    <section className="text-gray-600 w-full body-font">
      <div className="mx-auto flex flex-col">
        <div className="">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-full bg-gray-100 sm:mt-0  sm:text-left">
              {/* <ThreadForm /> */}
              <section className="text-gray-600 body-font">
                <div>
                  <div className=" font-bold  text-center text-green-500"></div>
                  <div className=" grid grid-cols-1  ">
                    <Threads posts={posts[path]} loading={loading} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
