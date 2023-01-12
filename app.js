import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routing/user-routes";
import User from "./models/User";
import postRouter from "./routing/post-routes";
import cors from "cors";

const app = express();
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/post", postRouter);

//connections

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.ksxutgq.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000, () =>
      console.log("Connection successful and server is listening on PORT:5000")
    );
  })
  .catch((err) => {
    console.log(err, "error");
  });
// zF4NOtSUF9lBAXS1  : mongodb passsword
