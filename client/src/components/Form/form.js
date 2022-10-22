import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillWarning } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import FileBase from "react-file-base64";
import formCSS from "./form.module.css";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../action/posts";
import { useSelector } from "react-redux";

const Form = ({ currentId, setcurrentId }) => {
  const [postData, setpostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  console.log(post);

  useEffect(() => {
    if (post) {
      setpostData(post);
    }
  }, [post]);

  const dispatch = useDispatch();

  const submit = (e) => {
    if (currentId) {
      console.log(currentId);
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setcurrentId(null);
    setpostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <div
        className={`alert alert-danger role ${formCSS.warning}`}
        role="alert"
      >
        <AiFillWarning />
        &nbsp;
        <p>Please Sign-In to create a memory</p>
      </div>
    );
  }

  return (
    <>
      <div className={formCSS.container}>
        {currentId ? <h3>Edite Memory</h3> : <h3>Create A Memory</h3>}
        <div className={formCSS.row}>
          <div className={formCSS.col75}>
            <input
              type="text"
              placeholder="Title"
              value={postData.title}
              onChange={(e) =>
                setpostData({ ...postData, title: e.target.value })
              }
            />
          </div>
        </div>
        <div className={formCSS.row}>
          <div className={formCSS.col75}>
            <input
              maxLength={28}
              rows="3"
              cols="32"
              type="text"
              placeholder="Message"
              value={postData.message}
              onChange={(e) =>
                setpostData({ ...postData, message: e.target.value })
              }
            />
          </div>
        </div>
        <div className={formCSS.row}>
          <div className={formCSS.col75}>
            <input
              type="text"
              placeholder="Tags"
              value={postData.tags}
              onChange={(e) =>
                setpostData({
                  ...postData,
                  tags: e.target.value.replace(" ", "").split(","),
                })
              }
            />
          </div>
        </div>
        <div className={formCSS.file}>
          <FileBase
            type="file"
            multiple={false}
            className={formCSS.image}
            onDone={({ base64 }) =>
              setpostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={`mt-2 ${formCSS.btn} ${formCSS.createbtn}`}
          variant="primary"
          onClick={(e) => submit(e)}
        >
          Create
        </Button>
        <Button
          className={`mt-2 ${formCSS.btn} ${formCSS.clearbtn}`}
          variant="primary"
          onClick={() => clear()}
        >
          Clear
        </Button>
      </div>
    </>
  );
};

export default Form;
