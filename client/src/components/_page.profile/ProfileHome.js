import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router";
import { getProfilePosts } from "../../store/actions/post/post.actions";
import {
  loadingPostSelector,
  postSelector,
} from "../../store/selector/post.selector";
import Threads from "../thread/Threads";
import _ from "lodash";

export default function ProfileHome() {
  const loading = useSelector(loadingPostSelector);
  const posts = useSelector(postSelector);
  const { path } = useRouteMatch();
  let { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfilePosts(path, id));
  }, [id]);
  return (
    <div>
      <Threads posts={posts[path]} loading={loading} />
    </div>
  );
}
