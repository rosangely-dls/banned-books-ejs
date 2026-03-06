const User = require("../models/User");

const registerShow = (req,res)=>{
res.render("register");
};

const registerDo = async (req,res,next)=>{

if(req.body.password != req.body.password1){

req.flash("error","Passwords do not match");
return res.render("register");
}

await User.create(req.body);

res.redirect("/");
};

const logonShow = (req,res)=>{

if(req.user){
return res.redirect("/");
}

res.render("logon");
};

const logoff = (req,res)=>{

req.session.destroy(()=>{
res.redirect("/");
});

};

module.exports = {
registerShow,
registerDo,
logoff,
logonShow
};