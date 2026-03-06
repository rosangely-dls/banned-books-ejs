const express = require("express");
const router = express.Router();

const {
logonShow,
registerShow,
registerDo,
logoff
} = require("../controllers/sessionController");

router.route("/register").get(registerShow).post(registerDo);

router.route("/logon")
.get(logonShow)
.post((req,res)=>{
res.send("Not implemented yet");
});

router.route("/logoff").post(logoff);

module.exports = router;