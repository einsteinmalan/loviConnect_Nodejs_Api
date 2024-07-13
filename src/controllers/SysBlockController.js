const { v4: uuidv4 } = require("uuid");
const SysBlock = require("../models/sysBlock");
const User = require("../models/user");

exports.createSysBlock = async (req, res) => {
  const { id_user, reason } = req.body;

  if (!id_user) {
    return res.status(400).json({ message: "id_user is required" });
  }

  try {
    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newSysBlock = await SysBlock.create({
      id: uuidv4(),
      id_user,
      reason,
    });

    res.status(201).json(newSysBlock);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getSysBlocks = async (req, res) => {
  try {
    const sysBlocks = await SysBlock.findAll();
    res.status(200).json(sysBlocks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getSysBlockById = async (req, res) => {
  const { id } = req.params;

  try {
    const sysBlock = await SysBlock.findByPk(id);

    if (!sysBlock) {
      return res.status(404).json({ message: "SysBlock not found" });
    }

    res.status(200).json(sysBlock);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateSysBlock = async (req, res) => {
  const { id } = req.params;
  const { id_user, reason } = req.body;

  try {
    const sysBlock = await SysBlock.findByPk(id);

    if (!sysBlock) {
      return res.status(404).json({ message: "SysBlock not found" });
    }

    if (!id_user) {
      return res.status(400).json({ message: "id_user is required" });
    }

    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (id_user !== sysBlock.id_user) sysBlock.id_user = id_user;
    if (reason !== sysBlock.reason) sysBlock.reason = reason;

    await sysBlock.save();
    res.status(200).json(sysBlock);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteSysBlock = async (req, res) => {
  const { id } = req.params;

  try {
    const sysBlock = await SysBlock.findByPk(id);

    if (!sysBlock) {
      return res.status(404).json({ message: "SysBlock not found" });
    }

    await sysBlock.destroy();
    res.status(200).json({ message: "SysBlock deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
