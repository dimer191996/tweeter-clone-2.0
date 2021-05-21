import { combineReducers } from "redux";
import { posts, loadingPost } from "./post.reducers/getposts.reducer";
import { modal } from "./layouts.reducers/modal.reducers";
import getUser from "./user.reducers/user.reducer";
export default combineReducers({
  getUser,
  posts,
  loadingPost,
  modal,
});
