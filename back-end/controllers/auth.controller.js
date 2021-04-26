const UserModel = require("../models/user.model");
const { createUserToken } = require("../utils/createUserToken.util");
const { signUpValidator, logInValidator } = require("../utils/validators.util");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.create({
      name,
      email,
      password,
    });
    res.status(201).json({ user: user });
  } catch (err) {
    const errors = signUpValidator(err);
    return res.status(200).send({ errors });
  }
};
module.exports.login = async (req, res) => {
  const { name, password } = req.body;
  let errors = { name: "", password: "" };
  try {
    const user = await UserModel.findOne({ name });

    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        //create a user token
        const token = createUserToken(user._id);

        //generate a cookie and  store the token
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 2 * 24 * 60 * 60 * 1000,
        });
        //return the authenticated user id
        res.status(200).json({ user: user._id });
      } else {
        errors.password = "Password is incorrect, please try again";
        return res.status(201).json({ errors });
      }
    } else {
      errors.name = "Username not found";
      return res.status(201).json({ errors });
    }
  } catch (error) {
    res.cookie("jwt", "", { maxAge: 1 });
    console.log(error);
  }
};
module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};
