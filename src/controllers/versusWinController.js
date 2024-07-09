const { v4: uuidv4 } = require("uuid");
const VersusWin = require("../models/versusWin");
const User = require("../models/user");

exports.createVersusWin = async (req, res) => {
  const { win_id, chooser_id, lost_id } = req.body;

  if (!win_id || !chooser_id || !lost_id) {
    return res
      .status(400)
      .json({ message: "win_id, chooser_id, and lost_id are required" });
  }

  try {
    const winUser = await User.findByPk(win_id);
    const chooserUser = await User.findByPk(chooser_id);
    const lostUser = await User.findByPk(lost_id);

    if (!winUser || !chooserUser || !lostUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newVersusWin = await VersusWin.create({
      id: uuidv4(),
      win_id,
      chooser_id,
      lost_id,
    });

    res.status(201).json(newVersusWin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getVersusWins = async (req, res) => {
  try {
    const versusWins = await VersusWin.findAll();
    res.status(200).json(versusWins);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getVersusWinById = async (req, res) => {
  const { id } = req.params;

  try {
    const versusWin = await VersusWin.findByPk(id);

    if (!versusWin) {
      return res.status(404).json({ message: "Versus win not found" });
    }

    res.status(200).json(versusWin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateVersusWin = async (req, res) => {
  const { id } = req.params;
  const { win_id, chooser_id, lost_id } = req.body;

  try {
    const versusWin = await VersusWin.findByPk(id);

    if (!versusWin) {
      return res.status(404).json({ message: "Versus win not found" });
    }

    if (!win_id || !chooser_id || !lost_id) {
      return res
        .status(400)
        .json({ message: "win_id, chooser_id, and lost_id are required" });
    }

    const winUser = await User.findByPk(win_id);
    const chooserUser = await User.findByPk(chooser_id);
    const lostUser = await User.findByPk(lost_id);

    if (!winUser || !chooserUser || !lostUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (win_id !== versusWin.win_id) versusWin.win_id = win_id;
    if (chooser_id !== versusWin.chooser_id) versusWin.chooser_id = chooser_id;
    if (lost_id !== versusWin.lost_id) versusWin.lost_id = lost_id;

    await versusWin.save();
    res.status(200).json(versusWin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteVersusWin = async (req, res) => {
  const { id } = req.params;

  try {
    const versusWin = await VersusWin.findByPk(id);

    if (!versusWin) {
      return res.status(404).json({ message: "Versus win not found" });
    }

    await versusWin.destroy();
    res.status(200).json({ message: "Versus win deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
