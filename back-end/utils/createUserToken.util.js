const jwt = require("jsonwebtoken");

module.exports.createUserToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: 2 * 24 * 24 * 60 * 1000,
  });
};
