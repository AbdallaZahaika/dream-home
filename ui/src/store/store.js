import { createStore } from "redux";
import userReducer from "./user/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancer = composeWithDevTools({});
const store = createStore(userReducer, composeEnhancer());

export default store;
