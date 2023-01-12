import { compareSync, hashSync } from "bcryptjs";
import User from "../models/User";

//user Get All user
export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  //if the users have falsy value
  if (!users) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }
  return res.status(200).json({ users });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id).populate("posts");
  } catch (err) {
    console.log(err);
  }

  //if the users have falsy value
  if (!user) {
    return res.status(404).json({ message: "No user Found" });
  }
  return res.status(200).json({ user });
};

//User sign up
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    return res.status(422).json({ message: "Invalid data" });
  }

  const hashedPassword = hashSync(password);

  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    await user.save();
  } catch (err) {
    return console.log(err);
  }

  //if user have falsy value
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
  return res.status(201).json({ user });
};

//User login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.length < 6) {
    return res.status(422).json({ message: "Invalid data" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    // console.log(existingUser,"userr")
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "No user found" });
  }
  const isPasswordCorrect = compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  // jwt sign

  // const token = jwt.sign( { email: email }, process.env.TOKEN_KEY, {expiresIn: "24h"} );
  const hashedPassword = hashSync(password);
  let finalObj = {
    // token:token,
    email: email,
    password: hashedPassword,
    _id: existingUser._id,
  };
  console.log("finalObj===", finalObj);

  return res
    .status(200)
    .json({ responseCode: 200, finalObj, responseMessage: "Login Successful" });
};
