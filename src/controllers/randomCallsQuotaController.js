const { v4: uuidv4 } = require("uuid");
const RandomCallQuota = require("../models/randomCallQuota");
const User = require("../models/user");

exports.createRandomCallQuota = async (req, res) => {
  const { user_id, quota_left } = req.body;

  if (!user_id || quota_left === undefined) {
    return res
      .status(400)
      .json({ message: "user_id and quota_left are required" });
  }

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newRandomCallQuota = await RandomCallQuota.create({
      id: uuidv4(),
      user_id,
      quota_left,
    });

    res.status(201).json(newRandomCallQuota);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getRandomCallQuotas = async (req, res) => {
  try {
    const randomCallQuotas = await RandomCallQuota.findAll();
    res.status(200).json(randomCallQuotas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getRandomCallQuotaById = async (req, res) => {
  const { id } = req.params;

  try {
    const randomCallQuota = await RandomCallQuota.findByPk(id);

    if (!randomCallQuota) {
      return res.status(404).json({ message: "Random call quota not found" });
    }

    res.status(200).json(randomCallQuota);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateRandomCallQuota = async (req, res) => {
  const { id } = req.params;
  const { user_id, quota_left } = req.body;

  try {
    const randomCallQuota = await RandomCallQuota.findByPk(id);

    if (!randomCallQuota) {
      return res.status(404).json({ message: "Random call quota not found" });
    }

    if (!user_id || quota_left === undefined) {
      return res
        .status(400)
        .json({ message: "user_id and quota_left are required" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user_id !== randomCallQuota.user_id) randomCallQuota.user_id = user_id;
    if (quota_left !== randomCallQuota.quota_left)
      randomCallQuota.quota_left = quota_left;

    await randomCallQuota.save();
    res.status(200).json(randomCallQuota);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteRandomCallQuota = async (req, res) => {
  const { id } = req.params;

  try {
    const randomCallQuota = await RandomCallQuota.findByPk(id);

    if (!randomCallQuota) {
      return res.status(404).json({ message: "Random call quota not found" });
    }

    await randomCallQuota.destroy();
    res.status(200).json({ message: "Random call quota deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
