const { v4: uuidv4 } = require("uuid");
const Like = require("../models/like");
const User = require("../models/user");

exports.createLike = async (req, res) => {
  const { id_user, id_sender } = req.body;

  if (!id_user || !id_sender) {
    return res
      .status(400)
      .json({ message: "id_user and id_sender are required" });
  }

  try {
    const user = await User.findByPk(id_user);
    const sender = await User.findByPk(id_sender);

    if (!user || !sender) {
      return res.status(404).json({ message: "User or sender not found" });
    }

    const newLike = await Like.create({
      id_likes: uuidv4(),
      id_user,
      id_sender,
    });

    res.status(201).json(newLike);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getLikes = async (req, res) => {
  try {
    const likes = await Like.findAll();
    res.status(200).json(likes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getLikeById = async (req, res) => {
  const { id_likes } = req.params;

  try {
    const like = await Like.findByPk(id_likes);

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json(like);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateLike = async (req, res) => {
  const { id_likes } = req.params;
  const { id_user, id_sender } = req.body;

  try {
    const like = await Like.findByPk(id_likes);

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    if (!id_user || !id_sender) {
      return res
        .status(400)
        .json({ message: "id_user and id_sender are required" });
    }

    const user = await User.findByPk(id_user);
    const sender = await User.findByPk(id_sender);

    if (!user || !sender) {
      return res.status(404).json({ message: "User or sender not found" });
    }

    if (id_user !== like.id_user) like.id_user = id_user;
    if (id_sender !== like.id_sender) like.id_sender = id_sender;

    await like.save();
    res.status(200).json(like);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteLike = async (req, res) => {
  const { id_likes } = req.params;

  try {
    const like = await Like.findByPk(id_likes);

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    await like.destroy();
    res.status(200).json({ message: "Like deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
