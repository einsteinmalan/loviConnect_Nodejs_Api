const { v4: uuidv4 } = require("uuid");
const PicVerification = require("../models/picVerification");
const User = require("../models/user");

exports.createPicVerification = async (req, res) => {
  const { id_user, path } = req.body;

  if (!id_user || !path) {
    return res.status(400).json({ message: "id_user and path are required" });
  }

  try {
    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPicVerification = await PicVerification.create({
      id_pic: uuidv4(),
      id_user,
      path,
    });

    res.status(201).json(newPicVerification);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getPicVerifications = async (req, res) => {
  try {
    const picVerifications = await PicVerification.findAll();
    res.status(200).json(picVerifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getPicVerificationById = async (req, res) => {
  const { id_pic } = req.params;

  try {
    const picVerification = await PicVerification.findByPk(id_pic);

    if (!picVerification) {
      return res.status(404).json({ message: "Pic verification not found" });
    }

    res.status(200).json(picVerification);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updatePicVerification = async (req, res) => {
  const { id_pic } = req.params;
  const { id_user, path } = req.body;

  try {
    const picVerification = await PicVerification.findByPk(id_pic);

    if (!picVerification) {
      return res.status(404).json({ message: "Pic verification not found" });
    }

    if (!id_user || !path) {
      return res.status(400).json({ message: "id_user and path are required" });
    }

    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (id_user !== picVerification.id_user) picVerification.id_user = id_user;
    if (path !== picVerification.path) picVerification.path = path;

    await picVerification.save();
    res.status(200).json(picVerification);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deletePicVerification = async (req, res) => {
  const { id_pic } = req.params;

  try {
    const picVerification = await PicVerification.findByPk(id_pic);

    if (!picVerification) {
      return res.status(404).json({ message: "Pic verification not found" });
    }

    await picVerification.destroy();
    res.status(200).json({ message: "Pic verification deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
