const { v4: uuidv4 } = require("uuid");
const Pic = require("../models/pic");
const User = require("../models/user");

exports.createPic = async (req, res) => {
  const { id_user, pic_number, type, path } = req.body;

  if (!id_user || !type || !path) {
    return res
      .status(400)
      .json({ message: "id_user, type, and path are required" });
  }

  try {
    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPic = await Pic.create({
      id_pic: uuidv4(),
      id_user,
      pic_number,
      type,
      path,
    });

    res.status(201).json(newPic);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getPics = async (req, res) => {
  try {
    const pics = await Pic.findAll();
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

    res.status(200).json(pic);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updatePic = async (req, res) => {
  const { id_pic } = req.params;
  const { id_user, pic_number, type, path } = req.body;

  try {
    const pic = await Pic.findByPk(id_pic);

    if (!pic) {
      return res.status(404).json({ message: "Pic not found" });
    }

    if (!id_user || !type || !path) {
      return res
        .status(400)
        .json({ message: "id_user, type, and path are required" });
    }

    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (id_user !== pic.id_user) pic.id_user = id_user;
    if (pic_number !== pic.pic_number) pic.pic_number = pic_number;
    if (type !== pic.type) pic.type = type;
    if (path !== pic.path) pic.path = path;

    await pic.save();
    res.status(200).json(pic);
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

    await pic.destroy();
    res.status(200).json({ message: "Pic deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
