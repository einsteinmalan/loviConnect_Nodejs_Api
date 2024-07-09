const { v4: uuidv4 } = require("uuid");
const UserFilter = require("../models/userFilter");
const User = require("../models/user");

exports.createUserFilter = async (req, res) => {
  const {
    user_id,
    gender,
    sexuality,
    age_start,
    age_limit,
    interest,
    location,
  } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newUserFilter = await UserFilter.create({
      id: uuidv4(),
      user_id,
      gender,
      sexuality,
      age_start,
      age_limit,
      interest,
      location,
    });

    res.status(201).json(newUserFilter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getUserFilters = async (req, res) => {
  try {
    const userFilters = await UserFilter.findAll();
    res.status(200).json(userFilters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getUserFilterById = async (req, res) => {
  const { id } = req.params;

  try {
    const userFilter = await UserFilter.findByPk(id);

    if (!userFilter) {
      return res.status(404).json({ message: "User filter not found" });
    }

    res.status(200).json(userFilter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateUserFilter = async (req, res) => {
  const { id } = req.params;
  const {
    user_id,
    gender,
    sexuality,
    age_start,
    age_limit,
    interest,
    location,
  } = req.body;

  try {
    const userFilter = await UserFilter.findByPk(id);

    if (!userFilter) {
      return res.status(404).json({ message: "User filter not found" });
    }

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user_id !== userFilter.user_id) userFilter.user_id = user_id;
    if (gender !== undefined) userFilter.gender = gender;
    if (sexuality !== undefined) userFilter.sexuality = sexuality;
    if (age_start !== undefined) userFilter.age_start = age_start;
    if (age_limit !== undefined) userFilter.age_limit = age_limit;
    if (interest !== undefined) userFilter.interest = interest;
    if (location !== undefined) userFilter.location = location;

    await userFilter.save();
    res.status(200).json(userFilter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteUserFilter = async (req, res) => {
  const { id } = req.params;

  try {
    const userFilter = await UserFilter.findByPk(id);

    if (!userFilter) {
      return res.status(404).json({ message: "User filter not found" });
    }

    await userFilter.destroy();
    res.status(200).json({ message: "User filter deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
