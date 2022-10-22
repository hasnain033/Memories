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
    dispatch(likePost(id));
  };

  const Likecounts = () => {
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
    // <Card className={postCSS.postcard} style={{ width: "18rem" }}>
    //   {/* <div
    //     className={postCSS.posttopside}
    //     style={{ backgroundImage: `url(${post.selectedFile})` }}
    //   > */}
    //   <div>
    //     <div className={postCSS.postImage}>
    //       <Card.Img src={post.selectedFile} />
    //     </div>
    //     <Card.Title className={postCSS.creator}>{post.creator}</Card.Title>
    //     <Card.Text className={postCSS.time}>
    //       {moment(post.createdAt).fromNow()}
    //     </Card.Text>
    //     <button
    //       className={`${postCSS.btn} ${postCSS.btnmore}`}
    //       onClick={() => {
    //         setcurrentId(post._id);
    //       }}
    //     >
    //       <FiMoreHorizontal />
    //     </button>
    //   </div>
    //   {/* </div> */}

    //   <div className={postCSS.textcontainer}>
    //     <Card.Text>{post.tags.map((tag) => `#${tag} `)}</Card.Text>
    //     <Card.Title className={postCSS.title}>{post.title}</Card.Title>
    //     <Card.Title className={postCSS.message}>{post.message}</Card.Title>
    //   </div>
    // <div className={postCSS.btncontainer}>
    //   <button className={postCSS.btn} onClick={() => like(post._id)}>
    //     <AiTwotoneLike />
    //     <span> Like {post.likeCount}</span>
    //   </button>
    //   <button className={postCSS.btn} onClick={() => Delete(post._id)}>
    //     <AiFillDelete />
    //     <span>Delete</span>
    //   </button>
    // </div>
    // </Card>

    <div className={postCSS.postcard} style={{ width: "18rem" }}>
      <div className={postCSS.postimage}>
        <div
          // style={{ backgroundImage: `url('+ post.selectedFile +')` }}
          className={postCSS.imagediv}
        >
          <img src={post.selectedFile} alt="" />
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
