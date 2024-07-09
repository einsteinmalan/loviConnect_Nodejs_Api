const { v4: uuidv4 } = require("uuid");
const Block = require("../models/block");
const User = require("../models/user");

exports.createBlock = async (req, res) => {
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

    const newBlock = await Block.create({
      id_block: uuidv4(),
      id_user,
      id_sender,
    });

    res.status(201).json(newBlock);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getBlocks = async (req, res) => {
  try {
    const blocks = await Block.findAll();
    res.status(200).json(blocks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getBlockById = async (req, res) => {
  const { id_block } = req.params;

  try {
    const block = await Block.findByPk(id_block);

    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }

    res.status(200).json(block);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateBlock = async (req, res) => {
  const { id_block } = req.params;
  const { id_user, id_sender } = req.body;

  try {
    const block = await Block.findByPk(id_block);

    if (!block) {
      return res.status(404).json({ message: "Block not found" });
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

    if (id_user !== block.id_user) block.id_user = id_user;
    if (id_sender !== block.id_sender) block.id_sender = id_sender;

    await block.save();
    res.status(200).json(block);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteBlock = async (req, res) => {
  const { id_block } = req.params;

  try {
    const block = await Block.findByPk(id_block);

    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }

    await block.destroy();
    res.status(200).json({ message: "Block deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
