const { v4: uuidv4 } = require("uuid");
const Gallery = require("../models/gallery");
const User = require("../models/user");

exports.createGallery = async (req, res) => {
  const { id_user, type, image } = req.body;

  if (!id_user || !image) {
    return res.status(400).json({ message: "id_user and image are required" });
  }

  try {
    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newGallery = await Gallery.create({
      id: uuidv4(),
      id_user,
      type,
      image,
    });

    res.status(201).json(newGallery);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.findAll();
    res.status(200).json(galleries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getGalleryById = async (req, res) => {
  const { id } = req.params;

  try {
    const gallery = await Gallery.findByPk(id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.status(200).json(gallery);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateGallery = async (req, res) => {
  const { id } = req.params;
  const { id_user, type, image } = req.body;

  try {
    const gallery = await Gallery.findByPk(id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    if (!id_user || !image) {
      return res
        .status(400)
        .json({ message: "id_user and image are required" });
    }

    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (id_user !== gallery.id_user) gallery.id_user = id_user;
    if (type !== gallery.type) gallery.type = type;
    if (image !== gallery.image) gallery.image = image;

    await gallery.save();
    res.status(200).json(gallery);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteGallery = async (req, res) => {
  const { id } = req.params;

  try {
    const gallery = await Gallery.findByPk(id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    await gallery.destroy();
    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
