import { normalize, schema } from "normalizr";

export function getPosts(state, action) {
  const { payload } = action;
  const { data, path } = payload;
  const comments = new schema.Entity("comments", {}, { idAttribute: "_id" });
  const posts = new schema.Entity(
    "posts",
    { comments: [comments] },
    { idAttribute: "_id" }
  );
  const normalizedData = normalize(data, [posts]);

  return {
    ...state,
    [path]: {
      ...normalizedData,
      loading: false,
    },
    path,
  };
}

export function addPost(state, action) {
  const { payload } = action;
  const posts = state[payload.path].entities.posts;
  const comments = state[payload.path].entities.comments;
  const result = state[payload.path].result;

  return {
    ...state,
    [payload.path]: {
      entities: {
        posts: {
          [payload._id]: payload,
          ...posts,
        },
        comments,
      },
      result: [payload._id, ...result],
    },
  };
}
export function likePost(state, action) {
  const { payload } = action;
  const posts = state[payload.path].entities.posts;
  const comments = state[payload.path].entities.comments;
  const result = state[payload.path].result;
  const post = posts[payload.postId];
  if (!post.liked) {
    post.liked = true;
    post.likesCount = ++post.likesCount;
  } else {
    post.liked = false;
    post.likesCount = --post.likesCount;
  }
  return {
    ...state,
    [payload.path]: {
      entities: {
        posts: {
          ...posts,
          [post._id]: post,
        },
        comments,
      },
      result,
    },
  };
}
