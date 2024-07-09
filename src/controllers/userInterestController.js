const { v4: uuidv4 } = require("uuid");
const UserInterest = require("../models/userInterest");
const User = require("../models/user");
const Interest = require("../models/interest");

exports.createUserInterest = async (req, res) => {
  const { id_user, id_interest } = req.body;

  if (!id_user || !id_interest) {
    return res
      .status(400)
      .json({ message: "id_user and id_interest are required" });
  }

  try {
    const user = await User.findByPk(id_user);
    const interest = await Interest.findByPk(id_interest);

    if (!user || !interest) {
      return res.status(404).json({ message: "User or interest not found" });
    }

    const newUserInterest = await UserInterest.create({
      id: uuidv4(),
      id_user,
      id_interest,
    });

    res.status(201).json(newUserInterest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getUserInterests = async (req, res) => {
  try {
    const userInterests = await UserInterest.findAll();
    res.status(200).json(userInterests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getUserInterestById = async (req, res) => {
  const { id } = req.params;

  try {
    const userInterest = await UserInterest.findByPk(id);

    if (!userInterest) {
      return res.status(404).json({ message: "User interest not found" });
    }

    res.status(200).json(userInterest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateUserInterest = async (req, res) => {
  const { id } = req.params;
  const { id_user, id_interest } = req.body;

  try {
    const userInterest = await UserInterest.findByPk(id);

    if (!userInterest) {
      return res.status(404).json({ message: "User interest not found" });
    }

    if (!id_user || !id_interest) {
      return res
        .status(400)
        .json({ message: "id_user and id_interest are required" });
    }

    const user = await User.findByPk(id_user);
    const interest = await Interest.findByPk(id_interest);

    if (!user || !interest) {
      return res.status(404).json({ message: "User or interest not found" });
    }

    if (id_user !== userInterest.id_user) userInterest.id_user = id_user;
    if (id_interest !== userInterest.id_interest)
      userInterest.id_interest = id_interest;

    await userInterest.save();
    res.status(200).json(userInterest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteUserInterest = async (req, res) => {
  const { id } = req.params;

  try {
    const userInterest = await UserInterest.findByPk(id);

    if (!userInterest) {
      return res.status(404).json({ message: "User interest not found" });
    }

    await userInterest.destroy();
    res.status(200).json({ message: "User interest deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
