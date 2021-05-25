import { normalize, schema } from "normalizr";

export function getPosts(state, action) {
  const { payload } = action;
  const { data, path } = payload;
  const posts = new schema.Entity("data", {}, { idAttribute: "_id" });
  const normalizedPosts = normalize(data, [posts]);

  // Look up the correct post, to simplify the rest of the code

  return {
    ...state,
    // Update our Post object with a new "comments" array
    [path]: normalizedPosts,
    path,
  };
}

export function addPost(state, action) {
  const { payload } = action;
  const data = state[payload.path].entities.data;
  const result = state[payload.path].result;

  return {
    ...state,
    [payload.path]: {
      entities: {
        data: {
          [payload._id]: payload,
          ...data,
        },
      },
      result: [payload._id, ...result],
    },
  };
}
export function likePost(state, action) {
  const { payload } = action;
  const data = state[state.path].entities.data;
  const result = state[state.path].result;
  const post = data[payload.postId];
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
        data: {
          ...data,
          [post._id]: post,
        },
      },
      result,
    },
  };
}
