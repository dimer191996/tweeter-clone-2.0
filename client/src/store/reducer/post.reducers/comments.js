export function addComment(state, action) {
  const { payload } = action;
  const result = state[payload.path].result;
  const posts = state[payload.path].entities.posts;
  const comments = state[payload.path].entities.comments;

  return {
    ...state,
    [payload.path]: {
      entities: {
        posts: {
          ...posts,
          [payload.postId]: {
            ...posts[payload.postId],
            comments: [...posts[payload.postId].comments, payload.preview._id],
          },
        },
        comments: {
          ...comments,
          [payload.preview._id]: payload.preview,
        },
      },
      result,
    },
  };
}

export function updateComment(state, action) {
  const { payload } = action;
  const result = state[payload.path].result;
  const posts = state[payload.path].entities.posts;
  const comments = state[payload.path].entities.comments;

  return {
    ...state,
    [payload.path]: {
      entities: {
        posts: {
          ...posts,
          [payload.postId]: {
            ...posts[payload.postId],
            comments: [...posts[payload.postId].comments, payload.data._id],
          },
        },
        comments: {
          ...comments,
          [payload.commentId]: {},
          [payload.data._id]: {
            ...payload.data,
          },
        },
      },
      result,
    },
  };
}

export function likeComment(state, action) {
  const { payload } = action;
  const result = state[payload.path].result;
  const posts = state[payload.path].entities.posts;
  const comments = state[payload.path].entities.comments;
  const comment = comments[payload.commentId];
  if (!comment.isLiked) {
    comment.isLiked = true;
    comment.likesCount = ++comment.likesCount;
  } else {
    comment.isLiked = false;
    comment.likesCount = --comment.likesCount;
  }

  return {
    ...state,
    [payload.path]: {
      entities: {
        posts,
        comments: {
          ...comments,
          [payload.commentId]: {
            ...comment,
          },
        },
      },
      result,
    },
  };
}

export function deleteComment(state, action) {
  const { payload } = action;
  const result = state[payload.path].result;
  const posts = state[payload.path].entities.posts;
  const comments = state[payload.path].entities.comments;

  return {
    ...state,
    [payload.path]: {
      entities: {
        posts: {
          ...posts,
          [payload.postId]: {
            ...posts[payload.postId],
          },
        },
        comments: {
          ...comments,
          [payload.commentId]: {},
        },
      },
      result,
    },
  };
}

export function ifNoERROR(state, action) {
  const { payload } = action;
  const result = state[payload.path].result;
  const posts = state[payload.path].entities.posts;
  const post = posts[payload.postId];
  const comments = post.comments.map((comment) => {
    if (comment._id === action.payload.commentId) {
      comment._id = action.payload.posts._id;
      comment.isError = false;
    }
    return comment;
  });
  return {
    ...state,
    [payload.path]: {
      entities: {
        posts: {
          ...posts,
          [post._id]: {
            ...post,
            comments: [...comments],
          },
        },
      },
      result,
    },
  };
}
