const { v4: uuidv4 } = require("uuid");
const UserPersonalityTest = require("../models/userPersonalityTest");
const User = require("../models/user");

exports.createUserPersonalityTest = async (req, res) => {
  const { user_id, content, version } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newUserPersonalityTest = await UserPersonalityTest.create({
      id: uuidv4(),
      user_id,
      content,
      version,
    });

    res.status(201).json(newUserPersonalityTest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getUserPersonalityTests = async (req, res) => {
  try {
    const userPersonalityTests = await UserPersonalityTest.findAll();
    res.status(200).json(userPersonalityTests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getUserPersonalityTestById = async (req, res) => {
  const { id } = req.params;

  try {
    const userPersonalityTest = await UserPersonalityTest.findByPk(id);

    if (!userPersonalityTest) {
      return res
        .status(404)
        .json({ message: "User personality test not found" });
    }

    res.status(200).json(userPersonalityTest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateUserPersonalityTest = async (req, res) => {
  const { id } = req.params;
  const { user_id, content, version } = req.body;

  try {
    const userPersonalityTest = await UserPersonalityTest.findByPk(id);

    if (!userPersonalityTest) {
      return res
        .status(404)
        .json({ message: "User personality test not found" });
    }

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user_id !== userPersonalityTest.user_id)
      userPersonalityTest.user_id = user_id;
    if (content !== userPersonalityTest.content)
      userPersonalityTest.content = content;
    if (version !== userPersonalityTest.version)
      userPersonalityTest.version = version;

    await userPersonalityTest.save();
    res.status(200).json(userPersonalityTest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteUserPersonalityTest = async (req, res) => {
  const { id } = req.params;

  try {
    const userPersonalityTest = await UserPersonalityTest.findByPk(id);

    if (!userPersonalityTest) {
      return res
        .status(404)
        .json({ message: "User personality test not found" });
    }

    await userPersonalityTest.destroy();
    res
      .status(200)
      .json({ message: "User personality test deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
