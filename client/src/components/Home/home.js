import React, { useEffect, useState } from "react";
import Posts from "../posts/posts";
import Form from "../Form/form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../action/posts";
import homeCSS from "./home.module.css";

const Home = () => {
  const [currentId, setcurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <section className={homeCSS.main}>
      <div className={homeCSS.maindiv}>
        <div className={homeCSS.posts}>
          <Posts setcurrentId={setcurrentId} />
        </div>
        <div className={homeCSS.form}>
          <Form currentId={currentId} setcurrentId={setcurrentId} />
        </div>
      </div>
    </section>
  );
};

export default Home;
