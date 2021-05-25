import { GET_USER } from "../../actions/user/user.actions";

const initialState = {};

export default function getUser(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...action.payload,
        followersCount: action.payload.followers.length,
        followingCount: action.payload.following.length,
      };

    default:
      return state;
  }
}
