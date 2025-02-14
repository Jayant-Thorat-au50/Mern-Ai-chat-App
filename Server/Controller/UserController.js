import UserModel from "../Models/UserModel.js";
import { validationResult } from "express-validator";
import * as userServices from "./services/user.services.js";
import bcrypt from "bcrypt";

export const signUpController = async (req, res) => {
  const isError = validationResult(req);

  // if error persists then return error
  if (!isError.isEmpty()) {
    return res.status(400).json({
      errors: isError.array(),
    });
  }

  try {
    const user = await userServices.signUp(req.body);

    const token = await user.JwtToken();

    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({ user: user });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const loginController = async (req, res) => {
  const isError = validationResult(req);

  if (!isError.isEmpty()) {
    return res.status(400).json({
      errors: isError.array(),
    });
  }

  try {
    const { email, password } = req.body;

    console.log(password);

    const user = await UserModel.findOne({ email: email }).select("+password");
    if (!user) {
      res.status(401).json({ errors: "Invalid user" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        errors: "Inavlid email or password",
      });
    }

    const token = await user.JwtToken();
    res.cookie("token", token, { httpOnly: true });

    return res.json({
      user,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.user;
  console.log(req.user);

  try {
    const user = await UserModel.findById(id);

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", null);
    return res.status(200).json({
      message: "user logged out successfully",
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};


