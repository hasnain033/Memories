import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
} from "../constants/actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPost();
    const action = { type: FETCH_ALL, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    const action = { type: CREATE, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedpost) => async (dispatch) => {
  try {
    console.log("client side update");
    const { data } = await api.updatePost(id, updatedpost);
    console.log(data);
    const action = { type: UPDATE, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    const action = { type: DELETE, payload: id };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    console.log(data);
    const action = { type: LIKE, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
