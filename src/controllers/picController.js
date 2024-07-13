const Pic = require("../models/pic");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.uploadPic = async (req, res) => {
  const { id_user, pic_number, type } = req.body;

  if (!id_user || !type) {
    return res.status(400).json({ message: "id_user and type are required" });
  }

  try {
    const pic = await Pic.create({
      id_pic: uuidv4(),
      id_user,
      pic_number,
      type,
      path: req.file.path,
    });

    res.status(201).json({
      message: `${type} picture uploaded successfully!`,
      error: null,
      status: 201,
      data: pic,
    });
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
    res.status(200).json({
      message: `Pictures retrieved successfully!`,
      error: null,
      status: 200,
      data: pics,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
      message: error.message,
      data: {},
    });
  }
};

exports.getPicById = async (req, res) => {
  const { id_pic } = req.params;

  try {
    const pic = await Pic.findByPk(id_pic);

    if (!pic) {
      return res.status(404).json({
        message: `Pictures not found!`,
        error: `Pictures not found!`,
        status: 404,
        data: {},
      });
    }

    res.status(200).sendFile(path.resolve(pic.path));
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: 500,
      data: {},
    });
  }
};

exports.deletePic = async (req, res) => {
  const { id_pic } = req.params;

  try {
    const pic = await Pic.findByPk(id_pic);

    if (!pic) {
      return res.status(404).json({
        message: "Pic not found",
        status: 404,
        error: "Pics not found",
        data: {},
      });
    }

    fs.unlinkSync(pic.path);
    await pic.destroy();
    res.status(200).json({
      message: "Pic deleted successfully",
      error: null,
      status: 200,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      data: {},
      status: 500,
    });
  }
};

exports.updatePic = async (req, res) => {
  const { id_pic } = req.params;
  //const { id_user, pic_number, type } = req.body;

  // if (!id_user || !type) {
  //   return res.status(400).json({ message: "id_user and type are required" });
  // }

  try {
    const pic = await Pic.findByPk(id_pic);

    if (!pic) {
      return res
        .status(404)
        .json({ message: "Pic not found", status: 404, data: {} });
    }

    // Delete the existing picture file
    fs.unlinkSync(pic.path);

    // Update the picture record with the new file path
    // pic.id_user = id_user;
    // pic.pic_number = pic_number;
    // pic.type = type;
    pic.path = req.file.path;

    await pic.save();

    res.status(200).json({
      message: "Pic updated successfully!",
      status: 200,
      data: pic,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Internal Server Error",
        error: error.message,
        status: 500,
        data: {},
      });
  }
};
