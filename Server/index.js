import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "300mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

const CONNECT_URL =
  "mongodb+srv://HasnainAli:0310React@cluster0.dpng040.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;
// const PORT = 5000;

mongoose
  .connect(process.env.CONNECT_URL, { useNewUrlParser: true })
  .then(app.listen(PORT, () => console.log(`server running at ${PORT}`)))
  .catch((error) => console.log(error));
