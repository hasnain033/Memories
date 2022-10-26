import axios from "axios";

// const url = "https://memory--app.herokuapp.com/posts";

// const API = axios.create({ baseURL: "https://memory--app.herokuapp.com" });
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    console.log(JSON.parse(localStorage.getItem("profile")).token);

    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, data) => API.patch(`/posts/${id}`, data);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likepost`);

export const signUp = (FormData) => API.post("/user/signup", FormData);

export const signIn = (FormData) => API.post("/user/signin", FormData);
