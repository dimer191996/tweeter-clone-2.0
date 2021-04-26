import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const LOADIND_POSTS = "LOADIND_POSTS";
export const STOP_LOADIND_POSTS = "STOP_LOADIND_POSTS";
export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const IS_COMMENT_READY = "IS_COMMENT_READY";
export const STOP_COMMENT_READY = "STOP_COMMENT_READY";

export const getPosts = (num) => {
  return (dispatch) => {
    dispatch({ type: LOADIND_POSTS, payload: true });
    return axios
      .get(`${"http://localhost:5000/"}api/post/`)
      .then((res) => {
        // const array = res.data.slice(0, num);
        // dispatch({ type: GET_POSTS, payload: array });
        dispatch({ type: GET_POSTS, payload: res.data });
        dispatch({ type: STOP_LOADIND_POSTS, payload: false });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (post, user) => {
  return (dispatch) => {
    const data = { ...post, creator: user.name };

    return axios
      .post(`${"http://localhost:5000/"}api/post/`, data)
      .then(({ data }) => {
        // console.log(res);
        // console.log(res);
        dispatch({ type: ADD_POST, payload: data });
      })
      .catch((err) => console.log(err));
  };
};
export const addComment = (comment, { name, id }, postId) => {
  return (dispatch) => {
    const data = {
      ...comment,
      creator: name,
      creatorId: id,
      isReady: false,
      comments: [],
      likes: [],
      timestamp: new Date().toISOString(),
    };
    const preview = {
      _id: "12345",
      ...data,
    };
    dispatch({ type: ADD_COMMENT, payload: { preview, postId } });
    return axios
      .patch(
        `${"http://localhost:5000/"}api/post/comment-create/` + postId,
        data
      )
      .then(({ data }) => {
        // console.log(res);
        // console.log(data);
        dispatch({ type: UPDATE_COMMENT, payload: { data, postId } });
      })
      .catch((err) => console.log(err));
  };
};
