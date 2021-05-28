export function addReply(state, action) {
  const { payload } = action;
  const { postId, commentId, path } = payload;
  const result = state[path].result;
  const posts = state[path].entities.posts;
  const comments = state[path].entities.comments;
  const comment = comments[commentId];

  return {
    ...state,
    [path]: {
      entities: {
        posts: {
          ...posts,
        },
        comments: {
          ...comments,
          [commentId]: {
            ...comment,
            replies: [...comment.replies, action.payload.preview],
          },
        },
      },
      result,
    },
  };
}

export function updateReply(state, action) {
  const { payload } = action;
  const { data, path, replyId, commentId, err } = payload;
  const result = state[path].result;
  const posts = state[path].entities.posts;
  const comments = state[path].entities.comments;
  const comment = comments[commentId];

  comment.replies.map((reply) => {
    if (reply._id === replyId) {
      if (!err) {
        reply._id = data._id;
        reply.isReady = true;
      }
      if (err) {
        reply.isReady = true;
        reply.isError = err;
      }
    }
    return reply;
  });

  return {
    ...state,
    [path]: {
      entities: {
        posts: {
          ...posts,
        },
        comments: {
          ...comments,
          [commentId]: {
            ...comment,
          },
        },
      },
      result,
    },
  };
}
export function likeReply(state, action) {
  const { payload } = action;
  const { path, replyId, commentId } = payload;
  const result = state[path].result;
  const posts = state[path].entities.posts;
  const comments = state[path].entities.comments;
  const comment = comments[commentId];

  comment.replies.map((reply) => {
    if (reply._id === replyId) {
      if (!reply.isLiked) {
        reply.isLiked = true;
        reply.likesCount = ++reply.likesCount;
      } else {
        reply.isLiked = false;
        reply.likesCount = --reply.likesCount;
      }
    }
    return reply;
  });

  return {
    ...state,
    [path]: {
      entities: {
        posts: {
          ...posts,
        },
        comments: {
          ...comments,
          [commentId]: {
            ...comment,
          },
        },
      },
      result,
    },
  };
}

export function deleteReply(state, action) {
  const { payload } = action;
  const { path, replyId, commentId } = payload;
  const result = state[path].result;
  const posts = state[path].entities.posts;
  const comments = state[path].entities.comments;
  const comment = comments[commentId];
  comment.replies = comment.replies.filter((reply) => reply._id !== replyId);

  return {
    ...state,
    [path]: {
      entities: {
        posts: {
          ...posts,
        },
        comments: {
          ...comments,
          [commentId]: {
            ...comment,
          },
        },
      },
      result,
    },
  };
}
