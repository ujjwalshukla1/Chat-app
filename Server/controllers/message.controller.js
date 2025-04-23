import { asyncHnandler } from "../utilities/asyncHandler.utility.js";
import Message from "../models/message.model.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import Conversation from "../models/converstaion.model.js";
import { getSocketId, io } from "../socket/socket.js";

export const createMessage = asyncHnandler(async (req, res, next) => {
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("Message is required", 400));
  }

  let conversation = await Conversation.findOne({
    Participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      Participants: [senderId, receiverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
    conversationId: conversation.id,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }
  const socketId = getSocketId(receiverId);
  io.to(socketId).emit("newMessage", newMessage); 
  res.status(200).json({
    success: true,
    responseData: {
      conversationId: conversation.id,
      message: newMessage,
    },
    message: "Message sent successfully",
  });
});

export const getMessages = asyncHnandler(async (req, res, next) => {
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;

  if (!senderId || !receiverId) {
    return next(new errorHandler("Sender and receiver IDs are required", 400));
  }

  const conversation = await Conversation.findOne({
    Participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  res.status(200).json({
    success: true,
    responseData: conversation,
    message: "Messages retrieved successfully",
  });
});
