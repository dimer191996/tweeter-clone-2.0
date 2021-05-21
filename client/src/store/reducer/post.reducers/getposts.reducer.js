import {
  ADD_POST,
  GET_POSTS,
  LOADIND_POSTS,
  STOP_LOADIND_POSTS,
  LIKE_POST,
  ADD_COMMENT,
  LIKE_COMMENT,
  UPDATE_COMMENT,
  CLEAN_COMMENT_ERROR,
  DELETE_COMMENT,
  ADD_REPLY,
  LIKE_REPLY,
  UPDATE_REPLY,
  CLEAN_REPLY_ERROR,
  DELETE_REPLY,
} from "../../actions/post/post.actions";

const initialState = [];
const postsLoading = false;

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case ADD_POST:
      return [action.payload, ...state];
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          if (!post.liked) {
            return {
              ...post,
              liked: true,
              likesCount: ++post.likesCount,
              // likes: [action.payload.userId, ...post.likes],
            };
          } else {
            return {
              ...post,
              liked: false,
              likesCount: --post.likesCount,
              // likes: post.likes.filter((id) => id !== action.payload.userId),
            };
          }
        }
        return post;
      });
    case ADD_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          ++post.commentsCount;
          post.comments = [...post.comments, action.payload.preview];
        }
        return post;
      });
    case LIKE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.map((comment) => {
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
        }
        return post;
      });
    case UPDATE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              if (!action.payload.err) {
                comment._id = action.payload.data._id;
                comment.isReady = true;
              } else {
                comment.isError = true;
                comment.isReady = true;
              }
            }
            return comment;
          });
        }
        return post;
      });
    case CLEAN_COMMENT_ERROR:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              comment._id = action.payload.data._id;
              comment.isError = false;
            }
            return comment;
          });
        }
        return post;
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            commentsCount: --post.commentsCount,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    case ADD_REPLY:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.replies = [...comment.replies, action.payload.preview];
            }
            return comment;
          });
        }
        return post;
      });
    case LIKE_REPLY:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.replies.map((reply) => {
                if (reply._id === action.payload.replyId) {
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
            }
            return comment;
          });
        }
        return post;
      });
    case UPDATE_REPLY:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.replies.map((reply) => {
                if (reply._id === action.payload.replyId) {
                  if (!action.payload.err) {
                    reply._id = action.payload.data._id;
                    reply.isReady = true;
                  }
                  if (action.payload.err) {
                    reply.isReady = true;
                    reply.isError = action.payload.err;
                  }
                }
                return reply;
              });
            }
            return comment;
          });
        }
        return post;
      });
    case CLEAN_REPLY_ERROR:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.replies.map((reply) => {
                if (reply._id === action.payload.replyId) {
                  reply._id = action.payload.data._id;
                  reply.isError = false;
                }
                return reply;
              });
            }
            return comment;
          });
        }
        return post;
      });
    case DELETE_REPLY:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.replies = comment.replies.filter(
                (reply) => reply._id !== action.payload.replyId
              );
            }
            return comment;
          });
        }
        return post;
      });
    default:
      return state;
  }
};

export const loadingPost = (state = postsLoading, action) => {
  switch (action.type) {
    case LOADIND_POSTS:
      return action.payload;
    case STOP_LOADIND_POSTS:
      return action.payload;
    default:
      return state;
  }
};
