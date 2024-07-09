const { v4: uuidv4 } = require("uuid");
const FakeProfile = require("../models/fakeProfile");
const User = require("../models/user");

exports.createFakeProfile = async (req, res) => {
  const { id_user } = req.body;

  if (!id_user) {
    return res.status(400).json({ message: "id_user is required" });
  }

  try {
    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newFakeProfile = await FakeProfile.create({
      id: uuidv4(),
      id_user,
    });

    res.status(201).json(newFakeProfile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getFakeProfiles = async (req, res) => {
  try {
    const fakeProfiles = await FakeProfile.findAll();
    res.status(200).json(fakeProfiles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getFakeProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const fakeProfile = await FakeProfile.findByPk(id);

    if (!fakeProfile) {
      return res.status(404).json({ message: "Fake profile not found" });
    }

    res.status(200).json(fakeProfile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateFakeProfile = async (req, res) => {
  const { id } = req.params;
  const { id_user } = req.body;

  try {
    const fakeProfile = await FakeProfile.findByPk(id);

    if (!fakeProfile) {
      return res.status(404).json({ message: "Fake profile not found" });
    }

    if (!id_user) {
      return res.status(400).json({ message: "id_user is required" });
    }

    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (id_user !== fakeProfile.id_user) fakeProfile.id_user = id_user;

    await fakeProfile.save();
    res.status(200).json(fakeProfile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteFakeProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const fakeProfile = await FakeProfile.findByPk(id);

    if (!fakeProfile) {
      return res.status(404).json({ message: "Fake profile not found" });
    }

    await fakeProfile.destroy();
    res.status(200).json({ message: "Fake profile deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
