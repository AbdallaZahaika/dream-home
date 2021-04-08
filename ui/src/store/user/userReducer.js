import { SET_USER } from "./userTypes";
const status = localStorage.getItem("user");

const initialState = {
  user: status === "true",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default userReducer;
