const express = require("express");
const router = express.Router();

//controllers
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

//get all users
router.get('/', getAllUsers);

//create new user
router.post("/", createUser);

//update user
router.patch("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

module.exports = router;
