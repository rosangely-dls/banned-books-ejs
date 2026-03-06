require("dotenv").config();

const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("express-async-errors");

const app = express();

const Book = require("./models/Book");

// --- View Engine ---
app.set("view engine", "ejs");

// --- Middleware ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// --- MongoDB connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// --- Session store ---
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error", (err) => console.log(err));

const sessionParams = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: false,
    sameSite: "strict",
  },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessionParams.cookie.secure = true;
}

app.use(session(sessionParams));
app.use(flash());

// --- Flash messages in views ---
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.info = req.flash("info");
  next();
});

// --- Custom middleware AFTER flash ---
app.use(require("./middleware/storeLocals"));

// --- Routes ---
app.use("/sessions", require("./routes/sessionRoutes"));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// --- GET /books ---
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.render("books", { books });
});

// --- POST /books ---
app.post("/books", async (req, res) => {
  try {
    const { title, author, genre, rating, review, bannedReason } = req.body;

    if (!title || !author) {
      req.flash("error", "Book Title and Author are required!");
      return res.redirect("/books");
    }

    await Book.create({
      title,
      author,
      genre,
      rating,
      review,
      bannedReason,
    });

    req.flash("info", "Book added successfully!");
    res.redirect("/books");

  } catch (err) {
    req.flash("error", "Something went wrong!");
    res.redirect("/books");
  }
});

// --- 404 ---
app.use((req, res) => {
  res.status(404).send(`Page ${req.url} not found`);
});

// --- Error handler ---
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

// --- Start server ---
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});