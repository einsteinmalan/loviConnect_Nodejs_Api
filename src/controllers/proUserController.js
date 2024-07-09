const { v4: uuidv4 } = require("uuid");
const ProUser = require("../models/proUser");
const User = require("../models/user");

exports.createProUser = async (req, res) => {
  const { user_id, duration } = req.body;

  if (!user_id || !duration) {
    return res
      .status(400)
      .json({ message: "user_id and duration are required" });
  }

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newProUser = await ProUser.create({
      id: uuidv4(),
      user_id,
      duration,
    });

    res.status(201).json(newProUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getProUsers = async (req, res) => {
  try {
    const proUsers = await ProUser.findAll();
    res.status(200).json(proUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getProUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const proUser = await ProUser.findByPk(id);

    if (!proUser) {
      return res.status(404).json({ message: "Pro user not found" });
    }

    res.status(200).json(proUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateProUser = async (req, res) => {
  const { id } = req.params;
  const { user_id, duration } = req.body;

  try {
    const proUser = await ProUser.findByPk(id);

    if (!proUser) {
      return res.status(404).json({ message: "Pro user not found" });
    }

    if (!user_id || !duration) {
      return res
        .status(400)
        .json({ message: "user_id and duration are required" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user_id !== proUser.user_id) proUser.user_id = user_id;
    if (duration !== proUser.duration) proUser.duration = duration;

    await proUser.save();
    res.status(200).json(proUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteProUser = async (req, res) => {
  const { id } = req.params;

  try {
    const proUser = await ProUser.findByPk(id);

    if (!proUser) {
      return res.status(404).json({ message: "Pro user not found" });
    }

    await proUser.destroy();
    res.status(200).json({ message: "Pro user deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
