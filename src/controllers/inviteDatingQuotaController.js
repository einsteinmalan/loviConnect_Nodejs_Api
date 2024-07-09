const { v4: uuidv4 } = require("uuid");
const InviteDatingQuota = require("../models/inviteDatingQuota");
const User = require("../models/user");

exports.createInviteDatingQuota = async (req, res) => {
  const { user_id, quota_left } = req.body;

  if (!user_id || quota_left === undefined) {
    return res
      .status(400)
      .json({ message: "user_id and quota_left are required" });
  }

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newInviteDatingQuota = await InviteDatingQuota.create({
      id: uuidv4(),
      user_id,
      quota_left,
    });

    res.status(201).json(newInviteDatingQuota);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getInviteDatingQuotas = async (req, res) => {
  try {
    const inviteDatingQuotas = await InviteDatingQuota.findAll();
    res.status(200).json(inviteDatingQuotas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getInviteDatingQuotaById = async (req, res) => {
  const { id } = req.params;

  try {
    const inviteDatingQuota = await InviteDatingQuota.findByPk(id);

    if (!inviteDatingQuota) {
      return res.status(404).json({ message: "Invite dating quota not found" });
    }

    res.status(200).json(inviteDatingQuota);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateInviteDatingQuota = async (req, res) => {
  const { id } = req.params;
  const { user_id, quota_left } = req.body;

  try {
    const inviteDatingQuota = await InviteDatingQuota.findByPk(id);

    if (!inviteDatingQuota) {
      return res.status(404).json({ message: "Invite dating quota not found" });
    }

    if (!user_id || quota_left === undefined) {
      return res
        .status(400)
        .json({ message: "user_id and quota_left are required" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user_id !== inviteDatingQuota.user_id)
      inviteDatingQuota.user_id = user_id;
    if (quota_left !== inviteDatingQuota.quota_left)
      inviteDatingQuota.quota_left = quota_left;

    await inviteDatingQuota.save();
    res.status(200).json(inviteDatingQuota);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteInviteDatingQuota = async (req, res) => {
  const { id } = req.params;

  try {
    const inviteDatingQuota = await InviteDatingQuota.findByPk(id);

    if (!inviteDatingQuota) {
      return res.status(404).json({ message: "Invite dating quota not found" });
    }

    await inviteDatingQuota.destroy();
    res
      .status(200)
      .json({ message: "Invite dating quota deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
