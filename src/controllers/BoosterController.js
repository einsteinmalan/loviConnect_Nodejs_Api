const { v4: uuidv4 } = require("uuid");
const Booster = require("../models/booster");
const User = require("../models/user");

exports.createBooster = async (req, res) => {
  const { user_id, type } = req.body;

  if (!user_id || !type) {
    return res.status(400).json({ message: "user_id and type are required" });
  }

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBooster = await Booster.create({
      id: uuidv4(),
      user_id,
      type,
    });

    res.status(201).json(newBooster);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getBoosters = async (req, res) => {
  try {
    const boosters = await Booster.findAll();
    res.status(200).json(boosters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getBoosterById = async (req, res) => {
  const { id } = req.params;

  try {
    const booster = await Booster.findByPk(id);

    if (!booster) {
      return res.status(404).json({ message: "Booster not found" });
    }

    res.status(200).json(booster);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateBooster = async (req, res) => {
  const { id } = req.params;
  const { user_id, type } = req.body;

  try {
    const booster = await Booster.findByPk(id);

    if (!booster) {
      return res.status(404).json({ message: "Booster not found" });
    }

    if (!user_id || !type) {
      return res.status(400).json({ message: "user_id and type are required" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user_id !== booster.user_id) booster.user_id = user_id;
    if (type !== booster.type) booster.type = type;

    await booster.save();
    res.status(200).json(booster);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteBooster = async (req, res) => {
  const { id } = req.params;

  try {
    const booster = await Booster.findByPk(id);

    if (!booster) {
      return res.status(404).json({ message: "Booster not found" });
    }

    await booster.destroy();
    res.status(200).json({ message: "Booster deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
