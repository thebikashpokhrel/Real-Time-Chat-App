import { Request, Response } from "express";
import { User } from "../models/user.model";
import { FriendRequest } from "../models/friendRequest.model";

export const AddFriendCController = async (
  request: Request,
  response: Response
) => {
  try {
    const loggedInUserId = request.loggedInUser._id;
    const friendId = request.body.userId;

    let loggedInUser = undefined;
    let friendUser = undefined;

    if (loggedInUserId == friendId) {
      return response.status(400).json({
        error: "Cannot send friend request to ownself",
      });
    }

    await Promise.all([
      User.findById(loggedInUserId),
      User.findById(friendId),
    ]).then((users) => {
      loggedInUser = users[0];
      friendUser = users[1];
    });

    if (!loggedInUser) {
      return response.status(400).json({
        error: "Unauthorized request - Logged in user not found",
      });
    }

    if (!friendUser) {
      return response.status(400).json({
        error: "User not found",
      });
    }

    let existingFriendRequest1 = undefined;
    let existingFriendRequest2 = undefined;

    await Promise.all([
      FriendRequest.findOne({
        senderId: loggedInUserId,
        receiverId: friendId,
      }),
      FriendRequest.findOne({
        senderId: friendId,
        receiverId: loggedInUserId,
      }),
    ]).then((requests) => {
      existingFriendRequest1 = requests[0];
      existingFriendRequest2 = requests[1];
    });

    if (existingFriendRequest1 || existingFriendRequest2) {
      return response.status(200).json({
        error: "There is an existing friend request with this user",
      });
    }
    const newFriendRequest = await FriendRequest.create({
      senderId: loggedInUserId,
      receiverId: friendId,
    });

    //TODO: ADD SOCKET IO IMPLEMENATION HERE

    if (!newFriendRequest) {
      return response.status(400).json({
        error: "Error occured while sending friendrequest",
      });
    }

    return response.status(201).json({
      message: "Friend request sent successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const AcceptFriendController = async (
  request: Request,
  response: Response
) => {
  try {
    const requestId = request.body.requestId;
    const accepterId = request.loggedInUser._id;

    const pendingFriendRequest = await FriendRequest.findById(requestId);
    if (!pendingFriendRequest) {
      return response.status(400).json({
        error: "No any pending friend request associated with this request id",
      });
    }

    const senderId = pendingFriendRequest.senderId;
    const recieverId = pendingFriendRequest.receiverId;

    if (recieverId == accepterId) {
      return response.status(500).json({
        error: "Sender cannot accept their own sent request",
      });
    }

    const users = await Promise.all([
      User.findById(senderId),
      User.findById(recieverId),
    ]);

    const sender = users[0];
    const receiver = users[1];

    if (!sender || !receiver) {
      return response.status(500).json({
        error: "User not found",
      });
    }

    //TODO: Implement SOCKETIO here
    sender.friends.push(recieverId);
    receiver.friends.push(senderId);

    await Promise.all([sender.save(), receiver.save()]);
    await FriendRequest.findByIdAndDelete(requestId);

    return response.status(201).json({
      message: "Friend request accepeted",
    });
  } catch (error) {
    return response.status(500).json({
      error: "Internal server error",
    });
  }
};

export const GetFriendsController = async (
  request: Request,
  response: Response
) => {};

export const RemoveFriendController = async (
  request: Request,
  response: Response
) => {};
