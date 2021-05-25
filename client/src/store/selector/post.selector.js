import _ from "lodash";
export const postSelector = ({ posts }) => {
  if (_.isEmpty(posts)) {
    return [];
  }
  const data = [];
  posts[posts.path].result.map((result) => {
    return data.push(posts[posts.path].entities.data[result]);
  });

  return {
    [posts.path]: data,
  };
};
export const loadingPostSelector = ({ loadingPost }) => loadingPost;
