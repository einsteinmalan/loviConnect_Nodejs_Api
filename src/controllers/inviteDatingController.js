const { v4: uuidv4 } = require("uuid");
const InviteDating = require("../models/inviteDatin");
const User = require("../models/user");

exports.createInviteDating = async (req, res) => {
  const { user_id, invited_id, is_active, is_completed } = req.body;

  if (!user_id || !invited_id) {
    return res
      .status(400)
      .json({ message: "user_id and invited_id are required" });
  }

  try {
    const user = await User.findByPk(user_id);
    const invitedUser = await User.findByPk(invited_id);

    if (!user || !invitedUser) {
      return res
        .status(404)
        .json({ message: "User or invited user not found" });
    }

    const newInviteDating = await InviteDating.create({
      id: uuidv4(),
      user_id,
      invited_id,
      is_active,
      is_completed,
    });

    res.status(201).json(newInviteDating);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getInviteDatings = async (req, res) => {
  try {
    const inviteDatings = await InviteDating.findAll();
    res.status(200).json(inviteDatings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getInviteDatingById = async (req, res) => {
  const { id } = req.params;

  try {
    const inviteDating = await InviteDating.findByPk(id);

    if (!inviteDating) {
      return res.status(404).json({ message: "Invite dating not found" });
    }

    res.status(200).json(inviteDating);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateInviteDating = async (req, res) => {
  const { id } = req.params;
  const { user_id, invited_id, is_active, is_completed } = req.body;

  try {
    const inviteDating = await InviteDating.findByPk(id);

    if (!inviteDating) {
      return res.status(404).json({ message: "Invite dating not found" });
    }

    if (!user_id || !invited_id) {
      return res
        .status(400)
        .json({ message: "user_id and invited_id are required" });
    }

    const user = await User.findByPk(user_id);
    const invitedUser = await User.findByPk(invited_id);

    if (!user || !invitedUser) {
      return res
        .status(404)
        .json({ message: "User or invited user not found" });
    }

    if (user_id !== inviteDating.user_id) inviteDating.user_id = user_id;
    if (invited_id !== inviteDating.invited_id)
      inviteDating.invited_id = invited_id;
    if (is_active !== undefined) inviteDating.is_active = is_active;
    if (is_completed !== undefined) inviteDating.is_completed = is_completed;

    await inviteDating.save();
    res.status(200).json(inviteDating);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteInviteDating = async (req, res) => {
  const { id } = req.params;

  try {
    const inviteDating = await InviteDating.findByPk(id);

    if (!inviteDating) {
      return res.status(404).json({ message: "Invite dating not found" });
    }

    await inviteDating.destroy();
    res.status(200).json({ message: "Invite dating deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
