import {
  ADD_POST,
  GET_POSTS,
  LOADIND_POSTS,
  STOP_LOADIND_POSTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
} from "../../actions/post/post.actions";

const initialState = {};
const postsLoading = false;

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case ADD_POST:
      return [action.payload, ...state];
    case ADD_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments = [...post.comments, action.payload.preview];
        }
        return post;
      });
    case UPDATE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.map((comment) => {
            if (comment._id === "12345") {
              comment._id = action.payload.data._id;
              comment.isReady = true;
            }
            return comment;
          });
        }
        return post;
      });
    // case DELETE_COMMENT:
    //   return state.map((post) => {
    //     if (post._id === action.payload.postId) {
    //       post.comment.find(
    //         (comment) => comment._id !== action.payload.commentId
    //       );
    //     }
    //   });
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
