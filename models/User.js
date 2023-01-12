import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  //here we have to write the fields
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId, ref: "Post",
    },
  ],
});

export default model("User", userSchema);
