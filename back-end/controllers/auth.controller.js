import UserModel from "../models/user.model.js";
import { createUserToken } from "../utils/createUserToken.util.js";
import { signUpValidator } from "../utils/validators.util.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
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
export const login = async (req, res) => {
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
export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};

export default { login, logout, signup };
