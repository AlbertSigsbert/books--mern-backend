const express = require("express");
const router = express.Router();

//controllers
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  popularBooks
} = require("../controllers/bookController");

//get all books
router.get('/', getBooks);

//get all popular books
router.get('/popular', popularBooks);

//create book
router.post("/", createBook);

//update book
router.patch("/:id", updateBook);

//delete book
router.delete("/:id", deleteBook);

module.exports = router;
