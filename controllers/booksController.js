const Book = require("../models/Book");

const getBooks = async (req, res) => {
    const books = await Book.find({ createdBy: req.user._id });
    res.render("books", { books });
};

const createBook = async (req, res) => {
    const { title, author, genre, rating, review, bannedReason } = req.body;

    await Book.create({
        title,
        author,
        genre,
        rating,
        review,
        bannedReason,
        createdBy: req.user._id
    });

    req.flash("info", "Book added!");
    res.redirect("/books");

};

const editBook = async (req, res) => {

    const book = await Book.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    });

    res.render("book", { book });
};

const updateBook = async (req, res) => {

    const { title, author, genre, rating, review, bannedReason } = req.body;

    await Book.findOneAndUpdate(
        {_id: req.params.id, createdBy: req.user._id },
        { title, author, genre, rating, review, bannedReason }
    );

    req.flash("info", "Book updated!");
    res.redirect("/books");

};

const deleteBook = async (req, res) => {

    await Book.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user._id
    });

    req.flash("info", "Book deleted!");
    res.redirect("/books");
};

module.exports = {
    getBooks,
    createBook,
    editBook,
    updateBook,
    deleteBook
};