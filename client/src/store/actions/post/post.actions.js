import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const LOADIND_POSTS = "LOADIND_POSTS";
export const STOP_LOADIND_POSTS = "STOP_LOADIND_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const CLEAN_COMMENT_ERROR = "CLEAN_COMMENT_ERROR";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const STOP_COMMENT_READY = "STOP_COMMENT_READY";
export const ADD_REPLY = "ADD_REPLY";
export const LIKE_REPLY = "LIKE_REPLY";
export const UPDATE_REPLY = "UPDATE_REPLY";
export const CLEAN_REPLY_ERROR = "CLEAN_REPLY_ERROR";
export const DELETE_REPLY = "DELETE_REPLY";

///-------------------------------------------------------------------------------------------------------
///--------------------------------------------posts actions-----------------------------------------------
export const getPosts = (num, uid) => {
  return (dispatch) => {
    dispatch({ type: LOADIND_POSTS, payload: true });
    return axios
      .get(`${"http://localhost:5000/"}api/post/`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch({ type: GET_POSTS, payload: data });
        dispatch({ type: STOP_LOADIND_POSTS, payload: false });
      })
      .catch((err) => dispatch({ type: STOP_LOADIND_POSTS, payload: false }));
  };
};
export const addPost = (post, user, file) => {
  return (dispatch) => {
    let data = new FormData();
    data.append("file", file);
    data.append("creator", user.name);
    data.append("body", post.body);
    data.append("title", post.title);

    return axios
      .post(`${"http://localhost:5000/"}api/post/`, data)
      .then(({ data }) => {
        // console.log(res);
        // console.log(res);
        dispatch({
          type: ADD_POST,
          payload: {
            ...data,
            likesCount: 0,
            liked: false,
            commentsCount: 0,
            comments: [],
          },
        });
      })
      .catch((err) => console.log(err));
  };
};
export const likePost = (postId, userId, isLiked) => {
  return (dispatch) => {
    const url =
      `${process.env.REACT_APP_API_URL}api/post/${
        !isLiked ? `like-post` : `dislike-post`
      }/` + postId;

    return axios
      .patch(url, {}, { withCredentials: true })
      .then(dispatch({ type: LIKE_POST, payload: { postId, userId } }));
  };
};

///-------------------------------------------------------------------------------------------------------
///--------------------------------------------comments actions--------------------------------------------
export const addComment = (comment, { name, id }, postId) => {
  return (dispatch) => {
    if (!comment.body.trim()) return;
    if (!postId) return;
    if (!name) return;
    if (!id) return;

    var n = Math.floor(100000 + Math.random() * 900000);

    const data = {
      ...comment,
      creator: name,
      creatorId: id,
      isReady: false,
      isError: false,
      isLiked: false,
      likesCount: 0,
      replies: [],
      likes: [],
      timestamp: new Date().toISOString(),
    };
    const preview = {
      _id: n,
      ...data,
    };
    if (!comment.isError) {
      dispatch({
        type: ADD_COMMENT,
        payload: { preview, postId },
      });
    }

    return axios
      .patch(
        `${"http://localhost:5000/"}api/post/comment-create/` + postId,
        data
      )
      .then(({ data }) => {
        dispatch({
          type: !comment.isError ? UPDATE_COMMENT : CLEAN_COMMENT_ERROR,
          payload: {
            data,
            postId,
            commentId: !comment.isError ? preview._id : comment.commentId,
            err: false,
          },
        });
      })
      .catch((error) => {
        return dispatch({
          type: UPDATE_COMMENT,
          payload: {
            postId,
            commentId: !comment.isError ? preview._id : comment.commentId,
            err: true,
          },
        });
      });
  };
};
export const deleteComment = (commentId, postId) => {
  return (dispatch) => {
    const data = {
      commentId: commentId,
    };
    return axios
      .patch(
        `${"http://localhost:5000/"}api/post/comment-delete/` + postId,
        data,
        { withCredentials: true }
      )
      .then(({ data }) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      });
  };
};
export const likeComment = (commentId, postId, isLiked, { wait }) => {
  return (dispatch) => {
    if (wait === true) return;
    dispatch({
      type: LIKE_COMMENT,
      payload: { postId, commentId, isLiked },
    });
    return axios
      .patch(
        `${"http://localhost:5000/"}api/post/${
          !isLiked ? `like-comment` : `dislike-comment`
        }/` + postId,
        { commentId },
        { withCredentials: true }
      )
      .then((data) => {});
  };
};

///-------------------------------------------------------------------------------------------------
///--------------------------------------------replies-----------------------------------------------
export const addReply = (reply, { name, id }, postId, commentId) => {
  return (dispatch) => {
    if (!reply.body.trim()) return;
    if (!commentId) return;
    if (!postId) return;
    if (!name) return;
    if (!id) return;

    var n = Math.floor(100000 + Math.random() * 900000);
    const data = {
      ...reply,
      creator: name,
      creatorId: id,
      commentId: commentId,
      likes: [],
      isLiked: false,
      likesCount: 0,
      isReady: false,
      isError: false,
      timestamp: new Date().toISOString(),
    };
    const preview = {
      _id: n,
      ...data,
    };

    if (!reply.isError) {
      dispatch({ type: ADD_REPLY, payload: { preview, postId, commentId } });
    }
    return axios
      .patch(`${"http://localhost:5000/"}api/post/reply-create/` + postId, data)
      .then(({ data }) => {
        // console.log(res);
        dispatch({
          //update reply with new data if no error
          type: !reply.isError ? UPDATE_REPLY : CLEAN_REPLY_ERROR,
          payload: {
            data,
            commentId,
            postId,
            replyId: !reply.isError ? preview._id : reply.replyId,
            err: false,
          },
        });
      })
      .catch((error) => {
        return dispatch({
          type: UPDATE_REPLY,
          payload: {
            postId,
            commentId,
            replyId: !reply.isError ? preview._id : reply.replyId,
            err: true,
          },
        });
      });
  };
};
export const deleteReply = (commentId, replyId, postId) => {
  return (dispatch) => {
    const data = {
      commentId: commentId,
      replyId: replyId,
      postId: postId,
    };
    return axios
      .patch(`${"http://localhost:5000/"}api/post/reply-delete/` + postId, data)
      .then(({ data }) => {
        dispatch({
          type: DELETE_REPLY,
          payload: { postId, commentId, replyId },
        });
      });
  };
};
export const likeReply = (replyId, commentId, postId, isLiked, { wait }) => {
  return (dispatch) => {
    if (wait === true) return;
    dispatch({
      type: LIKE_REPLY,
      payload: { postId, commentId, replyId, isLiked },
    });
    return axios
      .patch(
        `${"http://localhost:5000/"}api/post/${
          !isLiked ? `like-Reply` : `dislike-reply`
        }/` + postId,
        { replyId },
        { withCredentials: true }
      )
      .then((data) => {
        console.log(data);
      });
  };
};
