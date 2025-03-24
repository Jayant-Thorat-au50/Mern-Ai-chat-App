import UserModel from "../Models/UserModel.js";
import { validationResult } from "express-validator";
import * as userServices from "./services/user.services.js";
import bcrypt from "bcrypt";
import emailValidate from "email-validator";

export const signUpController = async (req, res, next) => {
  const { email, password } = req.body;

  // validating the extracted fields
  if (!email || !password) {
    return next(new AppError("Every field ie required", 400));
  }
  try {
    // validating the email id
    const emailValid = emailValidate.validate(email);

    if (!emailValid) {
      return res.status(400).json({
        success: false,
        errors: "Invalid email",
      });
    }

    // validating that this email id not already registered
    const duplicateUser = await UserModel.findOne({ email });

    if (duplicateUser) {
      return res.status(400).json({
        success: false,
        errors: "User already exists",
      });
    }

    // creating a user instance in the in collection
    // this user not yet saved
    const User = await UserModel.create({
      email,
      password,
    });

    // for any reason user registration can fail
    if (!User) {
      return res.status(400).json({
        success: false,
        errors: "User registration failed",
      });
    }

    // saving the userobj
    await User.save();

    // making password disappear when user obj sent to the client
    User.password = undefined;

    // getting token created in userSchema methods
    const token = await User.JwtToken();

    // setting cookies in the client side through the response
    // before sending the data to client

    res.cookie("Token", token, { httpOnly: true, secure: true });
    res.setHeader("Authorization", `Bearer ${token}`);

    // sending the saved user obj to the client
    return res.status(200).json({
      success: true,
      message: "registered successfully",
      User,
      token,
    });
  } catch (error) {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      await UserModel.deleteOne({ email: email });
    }

    // if any error occurs in the above code block
    // then this block will be executed
    return res.status(400).json({
      success: false,
      errors: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  const isError = validationResult(req);
  console.log(isError);

  if (!isError.isEmpty()) {
    return res.status(400).json({
      success: false,
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

    const isPasswordValid = bcrypt.compare(password, user.password);

    user.password = undefined;
    if (!isPasswordValid) {
      return res.status(400).json({
        errors: "Inavlid email or password",
      });
    }

    const token = await user.JwtToken();
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      user,
      token,
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

export const deleteAllusers = async (req, res) => {
  try {
    const response = await UserModel.deleteMany({});
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
};
