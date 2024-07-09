const { v4: uuidv4 } = require("uuid");
const Chatroom = require("../models/chatroom");
const User = require("../models/user");

exports.createChatroom = async (req, res) => {
  const { id_user_1, id_user_2 } = req.body;

  if (!id_user_1 || !id_user_2) {
    return res
      .status(400)
      .json({ message: "id_user_1 and id_user_2 are required" });
  }

  try {
    const user1 = await User.findByPk(id_user_1);
    const user2 = await User.findByPk(id_user_2);

    if (!user1 || !user2) {
      return res.status(404).json({ message: "One or both users not found" });
    }

    const newChatroom = await Chatroom.create({
      id_chatroom: uuidv4(),
      id_user_1,
      id_user_2,
    });

    res.status(201).json(newChatroom);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getChatrooms = async (req, res) => {
  try {
    const chatrooms = await Chatroom.findAll();
    res.status(200).json(chatrooms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getChatroomById = async (req, res) => {
  const { id_chatroom } = req.params;

  try {
    const chatroom = await Chatroom.findByPk(id_chatroom);

    if (!chatroom) {
      return res.status(404).json({ message: "Chatroom not found" });
    }

    res.status(200).json(chatroom);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateChatroom = async (req, res) => {
  const { id_chatroom } = req.params;
  const { id_user_1, id_user_2 } = req.body;

  try {
    const chatroom = await Chatroom.findByPk(id_chatroom);

    if (!chatroom) {
      return res.status(404).json({ message: "Chatroom not found" });
    }

    if (!id_user_1 || !id_user_2) {
      return res
        .status(400)
        .json({ message: "id_user_1 and id_user_2 are required" });
    }

    const user1 = await User.findByPk(id_user_1);
    const user2 = await User.findByPk(id_user_2);

    if (!user1 || !user2) {
      return res.status(404).json({ message: "One or both users not found" });
    }

    if (id_user_1 !== chatroom.id_user_1) chatroom.id_user_1 = id_user_1;
    if (id_user_2 !== chatroom.id_user_2) chatroom.id_user_2 = id_user_2;

    await chatroom.save();
    res.status(200).json(chatroom);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteChatroom = async (req, res) => {
  const { id_chatroom } = req.params;

  try {
    const chatroom = await Chatroom.findByPk(id_chatroom);

    if (!chatroom) {
      return res.status(404).json({ message: "Chatroom not found" });
    }

    await chatroom.destroy();
    res.status(200).json({ message: "Chatroom deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
