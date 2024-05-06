import { NextFunction, Request, Response } from "express";
import { extracDataFromToken } from "../utils/extractDataFromToken";
import { User } from "../models/user.model";

export const authenticate = async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const token = request.cookies.chatAppUserToken;
    if (!token) {
      return response.status(400).json({
        error: "Unauthorized request - Token not available",
      });
    }

    const tokenPayload = extracDataFromToken(token);

    if (!tokenPayload) {
      return response.status(400).json({
        error: "Unauthorized request - Token is invalid",
      });
    }

    const userId = tokenPayload?.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return response.status(400).json({
        error: "User not found",
      });
    }

    request.loggedInUser = user;
    next();
  } catch (error) {
    return response.status(500).json({
      error: "Internal server error",
    });
  }
};
