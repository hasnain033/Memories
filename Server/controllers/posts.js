import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    console.log("post created");
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  console.log("server update");
  const { id: _id } = req.params;
  const data = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("no post found");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...data, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("no post found");
  }
  const modified = await PostMessage.findByIdAndRemove(_id);
  res.json({ message: "post deleted" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!req.userId) {
    return res.json({ message: "unathenticated user" });
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("no post found");
  }
  const post = await PostMessage.findById(_id);
  const index = post.likes.findIndex((_id) => _id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const likedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  // const liked = await PostMessage.findByIdAndUpdate(
  //   _id,
  //   { likeCount: likeCount + 1 },
  //   { new: true }
  // );

  res.json(likedPost);
};
