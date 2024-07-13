const Pic = require("../models/pic");
const fs = require("fs");
const path = require("path");

exports.uploadPic = async (req, res) => {
  const { id_user, pic_number, type } = req.body;

  if (!id_user || !type) {
    return res.status(400).json({ message: "id_user and type are required" });
  }

  try {
    const pic = await Pic.create({
      id_user,
      pic_number,
      type,
      path: req.file.path,
    });

    res.status(201).json(pic);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getPicsByUserId = async (req, res) => {
  const { id_user } = req.params;

  try {
    const pics = await Pic.findAll({ where: { id_user } });
    res.status(200).json(pics);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getPicById = async (req, res) => {
  const { id_pic } = req.params;

  try {
    const pic = await Pic.findByPk(id_pic);

    if (!pic) {
      return res.status(404).json({ message: "Pic not found" });
    }

    res.status(200).sendFile(path.resolve(pic.path));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deletePic = async (req, res) => {
  const { id_pic } = req.params;

  try {
    const pic = await Pic.findByPk(id_pic);

    if (!pic) {
      return res.status(404).json({ message: "Pic not found" });
    }

    fs.unlinkSync(pic.path);
    await pic.destroy();
    res.status(200).json({ message: "Pic deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
