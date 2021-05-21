export const OPEN_MODEL = "OPEN_MODEL";
export const CLOSE_MODEL = "CLOSE_MODEL";

export const openModel = (data) => {
  return (dispatch) => {
    return dispatch({ type: OPEN_MODEL, payload: data });
  };
};
export const closeModel = (itemId, postId, mode) => {
  return (dispatch) => {
    return dispatch({ type: CLOSE_MODEL, payload: { itemId, postId, mode } });
  };
};
