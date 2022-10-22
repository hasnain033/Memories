import React from "react";
import Post from "./post/post";
import { useSelector } from "react-redux";

const Posts = ({ setcurrentId }) => {
  const posts = useSelector((state) => state.posts);
  return (
    <>
      {posts.map((post) => {
        return <Post post={post} setcurrentId={setcurrentId} />;
      })}
    </>
  );
};

export default Posts;
