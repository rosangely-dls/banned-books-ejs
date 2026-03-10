const express = require("express");
const router = express.Router();

const booksController = require("../controllers/booksController");
const isAuthenticated = require("../middleware/auth");

router.get("/", isAuthenticated, booksController.getBooks);

router.post("/", isAuthenticated, booksController.createBook);

router.get("/edit/:id", isAuthenticated, booksController.editBook);

router.post("/update/:id", isAuthenticated, booksController.updateBook);

router.post("/delete/:id", isAuthenticated, booksController.deleteBook);

module.exports = router;