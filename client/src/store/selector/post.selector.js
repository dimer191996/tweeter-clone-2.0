import _ from "lodash";

export const postSelector = ({ posts }) => {
  if (_.isEmpty(posts)) {
    return [];
  }

  const _posts = posts[posts.path].entities.posts;
  const _comments = posts[posts.path].entities.comments;
  const result = posts[posts.path].result;
  let data = result.map((postId) => {
    return {
      ..._posts[postId],
      comments: _posts[postId].comments.map((c) => _comments[c]),
    };
  });

  return {
    [posts.path]: data,
  };
};
export const loadingPostSelector = ({ loadingPost }) => loadingPost;
