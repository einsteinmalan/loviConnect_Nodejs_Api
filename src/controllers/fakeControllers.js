const { v4: uuidv4 } = require("uuid");
const Fake = require("../models/fake");
const User = require("../models/user");

exports.createFake = async (req, res) => {
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

    const newFake = await Fake.create({
      id_fake: uuidv4(),
      id_user,
      id_sender,
    });

    res.status(201).json(newFake);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getFakes = async (req, res) => {
  try {
    const fakes = await Fake.findAll();
    res.status(200).json(fakes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getFakeById = async (req, res) => {
  const { id_fake } = req.params;

  try {
    const fake = await Fake.findByPk(id_fake);

    if (!fake) {
      return res.status(404).json({ message: "Fake not found" });
    }

    res.status(200).json(fake);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateFake = async (req, res) => {
  const { id_fake } = req.params;
  const { id_user, id_sender } = req.body;

  try {
    const fake = await Fake.findByPk(id_fake);

    if (!fake) {
      return res.status(404).json({ message: "Fake not found" });
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

    if (id_user !== fake.id_user) fake.id_user = id_user;
    if (id_sender !== fake.id_sender) fake.id_sender = id_sender;

    await fake.save();
    res.status(200).json(fake);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteFake = async (req, res) => {
  const { id_fake } = req.params;

  try {
    const fake = await Fake.findByPk(id_fake);

    if (!fake) {
      return res.status(404).json({ message: "Fake not found" });
    }

    await fake.destroy();
    res.status(200).json({ message: "Fake deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
