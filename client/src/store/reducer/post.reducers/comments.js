export function addComment(state, action) {
  const { payload } = action;
  const result = state[payload.path].result;
  const data = state[payload.path].entities.data;
  const post = data[payload.postId];

  return {
    ...state,
    [payload.path]: {
      entities: {
        data: {
          ...data,
          [post._id]: {
            ...post,
            comments: [...post.comments, payload.preview],
          },
        },
      },
      result,
    },
  };
}

export function updateComment(state, action) {
  const { payload } = action;
  const result = state[payload.path].result;
  const data = state[payload.path].entities.data;
  const post = data[payload.postId];
  const comments = post.comments.map((comment) => {
    if (comment._id === payload.commentId) {
      if (!payload.err) {
        comment._id = payload.data._id;
        comment.isReady = true;
      } else {
        comment.isError = true;
        comment.isReady = true;
      }
    }
    return comment;
  });
  return {
    ...state,
    [payload.path]: {
      entities: {
        data: {
          ...data,
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

export function likeComment(state, action) {
  const { payload } = action;
  const result = state[payload.path].result;
  const data = state[payload.path].entities.data;
  const post = data[payload.postId];
  const comments = post.comments.map((comment) => {
    if (comment._id === action.payload.commentId) {
      if (!comment.isLiked) {
        comment.isLiked = true;
        comment.likesCount = ++comment.likesCount;
      } else {
        comment.isLiked = false;
        comment.likesCount = --comment.likesCount;
      }
    }
    return comment;
  });
  return {
    ...state,
    [payload.path]: {
      entities: {
        data: {
          ...data,
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

export function ifNoERROR(state, action) {
  const { payload } = action;
  const result = state[payload.path].result;
  const data = state[payload.path].entities.data;
  const post = data[payload.postId];
  const comments = post.comments.map((comment) => {
    if (comment._id === action.payload.commentId) {
      comment._id = action.payload.data._id;
      comment.isError = false;
    }
    return comment;
  });
  return {
    ...state,
    [payload.path]: {
      entities: {
        data: {
          ...data,
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
