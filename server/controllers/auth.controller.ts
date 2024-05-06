import { Request, Response } from "express";
import { SignInSchema, SignUpSchema } from "./../../shared/schemas/user.schema";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const SignUpController = async (
  request: Request,
  response: Response
) => {
  try {
    const validatedSignUpData = SignUpSchema.safeParse(request.body);
    if (!validatedSignUpData.success) {
      return response.status(400).json({
        error: "Invalid user data format",
      });
    }

    const { firstname, lastname, username, email, password } =
      validatedSignUpData.data!;

    const existingUserWithUsername = await User.findOne({ username });
    if (existingUserWithUsername) {
      return response.status(400).json({
        error: "Username already exists",
      });
    }

    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      return response.status(400).json({
        error: "Account already exists for the given email",
      });
    }

    const newUser = new User({
      firstname,
      lastname,
      username,
      password,
      email,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return response.status(500).json({
        error: "Error while signing up",
      });
    }
    return response.status(201).json({
      user: newUser,
      message: "Signed Up Successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: "Internal server error",
    });
  }
};

export const SignInController = async (
  request: Request,
  response: Response
) => {
  try {
    const validatedSignInData = SignInSchema.safeParse(request.body);
    if (!validatedSignInData.success) {
      return response.status(400).json({
        error: "Invalid user data format",
      });
    }

    const { email, password } = validatedSignInData.data;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.status(400).json({
        error: "User with given email doesn't exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return response.status(400).json({
        error: "Invalid credentials",
      });
    }

    //TODO: Refactor token creation and cookie code in utils folder

    const payload = {
      userId: existingUser._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
      expiresIn: "2d",
    });

    response.cookie("chatAppUserToken", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000, //Miliseconds
      httpOnly: true,
    });

    return response.status(200).json({
      user: {
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        email: existingUser.email,
        username: existingUser.email,
        userId: existingUser._id,
      },
      message: "Signed in Successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: "Internal server error",
    });
  }
};

export const SignOutController = (request: Request, response: Response) => {
  const token = request.cookies.chatAppUserToken;

  if (!token) {
    return response.status(400).json({
      error: "User token missing",
    });
  }

  response.cookie("chatAppUserToken", "", {
    maxAge: 0,
  });

  return response.status(200).json({
    message: "Signed Out Successfully",
  });
};
