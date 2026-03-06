const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
logonShow,
registerShow,
registerDo,
logoff
} = require("../controllers/sessionController");

//---register---
router.route("/register")
.get(registerShow)
.post(registerDo);

//---logon page---
router.get("/logon", logonShow);

//---logon form submission---
router.post(
    "/logon",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/sessions/logon",
        failureFlash: true
    })
);

//---logoff---
router.post("/logoff", logoff);

module.exports = router;