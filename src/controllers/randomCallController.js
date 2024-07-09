const { v4: uuidv4 } = require("uuid");
const RandomCall = require("../models/randomCall");
const User = require("../models/user");

exports.createRandomCall = async (req, res) => {
  const { user_id, called_id, status } = req.body;

  if (!user_id || !called_id) {
    return res
      .status(400)
      .json({ message: "user_id and called_id are required" });
  }

  try {
    const user = await User.findByPk(user_id);
    const calledUser = await User.findByPk(called_id);

    if (!user || !calledUser) {
      return res.status(404).json({ message: "User or called user not found" });
    }

    const newRandomCall = await RandomCall.create({
      id: uuidv4(),
      user_id,
      called_id,
      status,
    });

    res.status(201).json(newRandomCall);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getRandomCalls = async (req, res) => {
  try {
    const randomCalls = await RandomCall.findAll();
    res.status(200).json(randomCalls);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getRandomCallById = async (req, res) => {
  const { id } = req.params;

  try {
    const randomCall = await RandomCall.findByPk(id);

    if (!randomCall) {
      return res.status(404).json({ message: "Random call not found" });
    }

    res.status(200).json(randomCall);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateRandomCall = async (req, res) => {
  const { id } = req.params;
  const { user_id, called_id, status } = req.body;

  try {
    const randomCall = await RandomCall.findByPk(id);

    if (!randomCall) {
      return res.status(404).json({ message: "Random call not found" });
    }

    if (!user_id || !called_id) {
      return res
        .status(400)
        .json({ message: "user_id and called_id are required" });
    }

    const user = await User.findByPk(user_id);
    const calledUser = await User.findByPk(called_id);

    if (!user || !calledUser) {
      return res.status(404).json({ message: "User or called user not found" });
    }

    if (user_id !== randomCall.user_id) randomCall.user_id = user_id;
    if (called_id !== randomCall.called_id) randomCall.called_id = called_id;
    if (status !== randomCall.status) randomCall.status = status;

    await randomCall.save();
    res.status(200).json(randomCall);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteRandomCall = async (req, res) => {
  const { id } = req.params;

  try {
    const randomCall = await RandomCall.findByPk(id);

    if (!randomCall) {
      return res.status(404).json({ message: "Random call not found" });
    }

    await randomCall.destroy();
    res.status(200).json({ message: "Random call deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
