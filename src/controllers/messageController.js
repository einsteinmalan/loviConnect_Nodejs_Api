const { v4: uuidv4 } = require("uuid");
const Message = require("../models/message");
const Chatroom = require("../models/chatroom");
const User = require("../models/user");

exports.createMessage = async (req, res) => {
  const { id_chatroom, id_sender, id_user, message } = req.body;

  if (!id_chatroom || !id_sender || !id_user || !message) {
    return res.status(400).json({
      message: "id_chatroom, id_sender, id_user, and message are required",
    });
  }

  try {
    const chatroom = await Chatroom.findByPk(id_chatroom);
    const sender = await User.findByPk(id_sender);
    const user = await User.findByPk(id_user);

    if (!chatroom || !sender || !user) {
      return res
        .status(404)
        .json({ message: "Chatroom, sender, or user not found" });
    }

    const newMessage = await Message.create({
      id_message: uuidv4(),
      id_chatroom,
      id_sender,
      id_user,
      message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getMessageById = async (req, res) => {
  const { id_message } = req.params;

  try {
    const message = await Message.findByPk(id_message);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  const { id_message } = req.params;
  const { id_chatroom, id_sender, id_user, message, readed } = req.body;

  try {
    const msg = await Message.findByPk(id_message);

    if (!msg) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (!id_chatroom || !id_sender || !id_user || !message) {
      return res.status(400).json({
        message: "id_chatroom, id_sender, id_user, and message are required",
      });
    }

    const chatroom = await Chatroom.findByPk(id_chatroom);
    const sender = await User.findByPk(id_sender);
    const user = await User.findByPk(id_user);

    if (!chatroom || !sender || !user) {
      return res
        .status(404)
        .json({ message: "Chatroom, sender, or user not found" });
    }

    if (id_chatroom !== msg.id_chatroom) msg.id_chatroom = id_chatroom;
    if (id_sender !== msg.id_sender) msg.id_sender = id_sender;
    if (id_user !== msg.id_user) msg.id_user = id_user;
    if (message !== msg.message) msg.message = message;
    if (readed !== undefined && readed !== msg.readed) msg.readed = readed;

    await msg.save();
    res.status(200).json(msg);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id_message } = req.params;

  try {
    const msg = await Message.findByPk(id_message);

    if (!msg) {
      return res.status(404).json({ message: "Message not found" });
    }

    await msg.destroy();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
