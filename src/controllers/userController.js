const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");

exports.createUser = async (req, res) => {
  const {
    phone,
    fullname,
    zodiac_sign,
    profile_completed,
    active,
    is_blocked,
    active_link,
    ini_pwd_link,
    online,
    last_login,
    is_verified,
    otp,
    refreshTokenId,
  } = req.body;

  if (!phone || !fullname) {
    return res.status(400).json({ message: "Phone and fullname are required" });
  }

  try {
    const newUser = await User.create({
      id: uuidv4(),
      phone,
      fullname,
      zodiac_sign,
      profile_completed,
      active,
      is_blocked,
      active_link,
      ini_pwd_link,
      online,
      last_login,
      is_verified,
      otp,
      refreshTokenId,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    phone,
    fullname,
    zodiac_sign,
    profile_completed,
    active,
    is_blocked,
    active_link,
    ini_pwd_link,
    online,
    last_login,
    is_verified,
    otp,
    refreshTokenId,
  } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (phone !== undefined) user.phone = phone;
    if (fullname !== undefined) user.fullname = fullname;
    if (zodiac_sign !== undefined) user.zodiac_sign = zodiac_sign;
    if (profile_completed !== undefined)
      user.profile_completed = profile_completed;
    if (active !== undefined) user.active = active;
    if (is_blocked !== undefined) user.is_blocked = is_blocked;
    if (active_link !== undefined) user.active_link = active_link;
    if (ini_pwd_link !== undefined) user.ini_pwd_link = ini_pwd_link;
    if (online !== undefined) user.online = online;
    if (last_login !== undefined) user.last_login = last_login;
    if (is_verified !== undefined) user.is_verified = is_verified;
    if (otp !== undefined) user.otp = otp;
    if (refreshTokenId !== undefined) user.refreshTokenId = refreshTokenId;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
