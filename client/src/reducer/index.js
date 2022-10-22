import { combineReducers } from "redux";
import Posts from "../reducer/posts";
import Auth from "../reducer/auth";

export default combineReducers({
  posts: Posts,
  auth: Auth,
});
