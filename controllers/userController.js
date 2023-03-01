const User = require("../models/User");
const Book = require("../models/Book");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const validator = require("validator");
const bcrypt = require("bcrypt");

//GET all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.status(200).json(users);
});

//CREATE new  user
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //Validation
  if (
    !username ||
    !email ||
    !password 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email is NOT valid" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "Password is not strong enough" });
  }

  const duplicateEmail = await User.findOne({ email });

  if (duplicateEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email, password: hashedPassword });
  
  if(user){
    res.status(201).json({message:`New user ${username} created`, result:user});
  }else{
    return res.status(400).json({ message: "Invalid user data received" });
  }
});

//UPDATE new  user
const updateUser = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Todo Id" });
  }

  //@todo: Check request body for necessary fields

  // const user = await User.findOneAndUpdate({ _id: id }, { ...req.body }, {new: true});

  // if (!user) {
  //   return res.status(404).json({ message: "User Not Found" });
  // }

  res.status(200).json({message: "User update logic comng soon!"});

 
  
});

//DELETE new  user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Todo Id" });
  }

  if (!id) {
    return res.status(400).json({message:"User ID required"});
  }

  const book = await Book.findOne({owner:id}).lean().exec()

  if(book){
    return res.status(400).json({message:"User has assigned books"});
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.status(200).json(user);
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
