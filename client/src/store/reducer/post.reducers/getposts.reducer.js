import {
  ADD_POST,
  GET_POSTS,
  EXPLORE_LOADING_POSTS,
  STOP_EXPLORE_LOADING_POSTS,
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
import { getPosts, addPost, likePost } from "./posts";
import {
  addComment,
  deleteComment,
  ifNoERROR,
  likeComment,
  updateComment,
} from "./comments";
import { addReply, updateReply, deleteReply, likeReply } from "./replies";

const initialState = {};
const postsLoading = false;

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return getPosts(state, action);
    case ADD_POST:
      return addPost(state, action);
    case LIKE_POST:
      return likePost(state, action);
    case ADD_COMMENT:
      return addComment(state, action);
    case UPDATE_COMMENT:
      return updateComment(state, action);
    case CLEAN_COMMENT_ERROR:
      return ifNoERROR(state, action);
    case LIKE_COMMENT:
      return likeComment(state, action);
    case DELETE_COMMENT:
      return deleteComment(state, action);
    case ADD_REPLY:
      return addReply(state, action);
    case UPDATE_REPLY:
      return updateReply(state, action);
    case DELETE_REPLY:
      return deleteReply(state, action);
    case LIKE_REPLY:
      return likeReply(state, action);

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

    default:
      return state;
  }
};

export const loadingPost = (state = postsLoading, action) => {
  switch (action.type) {
    case EXPLORE_LOADING_POSTS:
      return action.payload;
    case STOP_EXPLORE_LOADING_POSTS:
      return action.payload;
    default:
      return state;
  }
};
