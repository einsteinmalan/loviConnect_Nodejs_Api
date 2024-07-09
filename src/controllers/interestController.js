const Interest = require("../models/interest");

exports.createInterest = async (req, res) => {
  const { interest } = req.body;

  if (!interest) {
    return res.status(400).json({ message: "Interest is required" });
  }

  try {
    const newInterest = await Interest.create({ interest });
    res.status(201).json(newInterest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getInterests = async (req, res) => {
  try {
    const interests = await Interest.findAll();
    res.status(200).json(interests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getInterestById = async (req, res) => {
  const { id } = req.params;

  try {
    const interest = await Interest.findByPk(id);

    if (!interest) {
      return res.status(404).json({ message: "Interest not found" });
    }

    res.status(200).json(interest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateInterest = async (req, res) => {
  const { id } = req.params;
  const { interest } = req.body;

  if (!interest) {
    return res.status(400).json({ message: "Interest is required" });
  }

  try {
    const existingInterest = await Interest.findByPk(id);

    if (!existingInterest) {
      return res.status(404).json({ message: "Interest not found" });
    }

    existingInterest.interest = interest;
    await existingInterest.save();
    res.status(200).json(existingInterest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteInterest = async (req, res) => {
  const { id } = req.params;

  try {
    const interest = await Interest.findByPk(id);

    if (!interest) {
      return res.status(404).json({ message: "Interest not found" });
    }

    await interest.destroy();
    res.status(200).json({ message: "Interest deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
