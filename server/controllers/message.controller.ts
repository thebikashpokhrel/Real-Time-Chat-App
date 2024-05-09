import { Request, Response } from "express";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";

export const SendMessageController = async function (
  request: Request,
  response: Response
) {
  try {
    const loggedInUser = request.loggedInUser;
    const senderId = loggedInUser._id;
    const receiverId = request.params.id;
    const messageContent = request.body.message;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const message = new Message({
      senderId,
      receiverId,
      message: messageContent,
    });

    if (message) {
      conversation.messages.push(message._id);
    }

    Promise.all([message.save(), conversation.save()]);

    //TODO: SOCKET IO IMPLEMENTATION

    response.status(201).send(message);
  } catch (error) {
    return response.status(500).json({
      error: "Internal server error",
    });
  }
};

export const GetMessagesController = async function (
  request: Request,
  response: Response
) {
  try {
    const loggedInUser = request.loggedInUser;
    const senderId = loggedInUser._id;
    const receiverId = request.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) response.status(201).json([]);

    const messages = conversation?.messages;
    response.status(201).send(messages);
  } catch (error) {
    return response.status(500).send({
      error: "Internal server error",
    });
  }
};
