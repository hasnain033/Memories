import mongoose from "mongoose";
import userData from "../models/userData.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userData.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "user doesn't exist" });

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!correctPassword)
      return res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmpassword, firstname, lastname } = req.body;
  console.log(req.header);

  try {
    const existingUser = await userData.findOne({ email });
    console.log(existingUser);
    console.log(1);
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    console.log(2);
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }
    console.log(3);
    const hashpassword = await bcrypt.hash(password, 12);
    console.log(4);
    const result = await userData.create({
      email,
      password: hashpassword,
      name: `${firstname} ${lastname}`,
    });
    console.log(5);
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    console.log(6);
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
