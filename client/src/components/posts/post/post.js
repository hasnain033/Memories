import React from "react";
// import Card from "react-bootstrap/Card";
import moment from "moment";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiTwotoneLike, AiFillDelete } from "react-icons/ai";
import postCSS from "./post.module.css";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../action/posts";

const Post = ({ post, setcurrentId }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const like = (id) => {
    console.log(id);
    dispatch(likePost(id));
  };

  const Likecounts = () => {
    console.log(user);
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === user?.result?.googleId || user?.result?._id
      ) ? (
        <span>
          {post.likes.length > 2
            ? `You and ${post.likes.length} others `
            : `${post.likes.length}`}{" "}
          like{post.likes.length > 1 ? "s" : ""}
        </span>
      ) : (
        <span>
          {post.likes.length}
          {post.likes.length === 1 ? " Like" : " Likes"}
        </span>
      );
    }

    return <span>Like</span>;
  };

  const Delete = (id) => {
    console.log("delete");
    dispatch(deletePost(id));
  };

  return (
    <div className={postCSS.postcard} style={{ width: "18rem" }}>
      <div className={postCSS.postimage}>
        <div
          style={{
            backgroundImage: `url(${post.selectedFile})`,

            backgroundSize: "100% 100%",
          }}
          className={postCSS.imagediv}
        >
          {/* <img src={post.selectedFile} alt="" /> */}
        </div>
        <h3 className={postCSS.creator}>{post.name}</h3>
        <p className={postCSS.time}>{moment(post.createdAt).fromNow()}</p>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <button
            className={`${postCSS.btn} ${postCSS.btnmore}`}
            onClick={() => {
              setcurrentId(post._id);
            }}
          >
            <FiMoreHorizontal />
          </button>
        )}
      </div>
      <div className={postCSS.textcontainer}>
        <p>{post.tags.map((tag) => `#${tag} `)}</p>
        <h4 className={postCSS.title}>{post.title}</h4>
        <p className={postCSS.message}>{post.message}</p>
      </div>
      <div className={postCSS.btncontainer}>
        <button
          className={postCSS.btn}
          disabled={!user?.result}
          onClick={() => like(post._id)}
        >
          <AiTwotoneLike />
          &nbsp;
          <Likecounts />
        </button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <button className={postCSS.btn} onClick={() => Delete(post._id)}>
            <AiFillDelete />
            <span> Delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
