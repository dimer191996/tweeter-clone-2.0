const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

//test if there's a real user on evrysingle page

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (!err) {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;

        next();
      } else {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        // console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//require auth check
module.exports.checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json("no token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log(" There's no token");
    throw new Error("No token");
  }
};
