import { CLOSE_MODEL, OPEN_MODEL } from "../../actions/layout/layout.action";

const isOpen = false;

export const modal = (state = isOpen, action) => {
  switch (action.type) {
    case OPEN_MODEL:
      return (state = true);
    case CLOSE_MODEL:
      return (state = false);
    default:
      return state;
  }
};
