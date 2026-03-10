require("dotenv").config();

const express = require("express");

// --- Security imports ---
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("express-async-errors");

const passport = require("passport");
require("./passport/passportInit")();

const app = express();

// --- Security middleware ---
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(xss());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "You must log in first.");
  res.redirect("/");
}

// --- View Engine ---
app.set("view engine", "ejs");

// --- Middleware ---

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

// --- CSRF protection ---
app.use(csrf());

app.use((req, res, next) => {
  res.locals._csrf = req.csrfToken();
  next();
});

app.use(passport.initialize());
app.use(passport.session());

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
app.use("/books", require("./routes/books"));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// --- 404 ---
app.use((req, res) => {
  res.status(404).send(`Page ${req.url} not found`);
});

// --- Error handler ---
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong.");
});

// --- Start server ---
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
