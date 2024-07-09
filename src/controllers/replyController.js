const { v4: uuidv4 } = require("uuid");
const Reply = require("../models/reply");
const User = require("../models/user");
const Support = require("../models/support"); // Assuming there's a support model

exports.createReply = async (req, res) => {
  const { user_id, support_id, reply } = req.body;

  if (!user_id || !support_id) {
    return res
      .status(400)
      .json({ message: "user_id and support_id are required" });
  }

  try {
    const user = await User.findByPk(user_id);
    const support = await Support.findByPk(support_id); // Assuming there's a support table

    if (!user || !support) {
      return res.status(404).json({ message: "User or support not found" });
    }

    const newReply = await Reply.create({
      id: uuidv4(),
      user_id,
      support_id,
      reply,
    });

    res.status(201).json(newReply);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getReplies = async (req, res) => {
  try {
    const replies = await Reply.findAll();
    res.status(200).json(replies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getReplyById = async (req, res) => {
  const { id } = req.params;

  try {
    const reply = await Reply.findByPk(id);

    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    res.status(200).json(reply);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateReply = async (req, res) => {
  const { id } = req.params;
  const { user_id, support_id, reply } = req.body;

  try {
    const existingReply = await Reply.findByPk(id);

    if (!existingReply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    if (!user_id || !support_id) {
      return res
        .status(400)
        .json({ message: "user_id and support_id are required" });
    }

    const user = await User.findByPk(user_id);
    const support = await Support.findByPk(support_id); // Assuming there's a support table

    if (!user || !support) {
      return res.status(404).json({ message: "User or support not found" });
    }

    if (user_id !== existingReply.user_id) existingReply.user_id = user_id;
    if (support_id !== existingReply.support_id)
      existingReply.support_id = support_id;
    if (reply !== undefined) existingReply.reply = reply;

    await existingReply.save();
    res.status(200).json(existingReply);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteReply = async (req, res) => {
  const { id } = req.params;

  try {
    const reply = await Reply.findByPk(id);

    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    await reply.destroy();
    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
