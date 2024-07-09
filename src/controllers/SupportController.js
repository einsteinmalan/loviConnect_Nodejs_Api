const { v4: uuidv4 } = require("uuid");
const Support = require("../models/support");
const User = require("../models/user");
const TicketType = require("../models/ticketType");

exports.createSupport = async (req, res) => {
  const { user_id, ticket_type_id, complaints, status } = req.body;

  if (!user_id || !ticket_type_id || !complaints) {
    return res.status(400).json({
      message: "user_id, ticket_type_id, and complaints are required",
    });
  }

  try {
    const user = await User.findByPk(user_id);
    const ticketType = await TicketType.findByPk(ticket_type_id);

    if (!user || !ticketType) {
      return res.status(404).json({ message: "User or ticket type not found" });
    }

    const newSupport = await Support.create({
      id: uuidv4(),
      user_id,
      ticket_type_id,
      complaints,
      status,
    });

    res.status(201).json(newSupport);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getSupports = async (req, res) => {
  try {
    const supports = await Support.findAll();
    res.status(200).json(supports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getSupportById = async (req, res) => {
  const { id } = req.params;

  try {
    const support = await Support.findByPk(id);

    if (!support) {
      return res.status(404).json({ message: "Support not found" });
    }

    res.status(200).json(support);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateSupport = async (req, res) => {
  const { id } = req.params;
  const { user_id, ticket_type_id, complaints, status } = req.body;

  try {
    const support = await Support.findByPk(id);

    if (!support) {
      return res.status(404).json({ message: "Support not found" });
    }

    if (!user_id || !ticket_type_id || !complaints) {
      return res.status(400).json({
        message: "user_id, ticket_type_id, and complaints are required",
      });
    }

    const user = await User.findByPk(user_id);
    const ticketType = await TicketType.findByPk(ticket_type_id);

    if (!user || !ticketType) {
      return res.status(404).json({ message: "User or ticket type not found" });
    }

    if (user_id !== support.user_id) support.user_id = user_id;
    if (ticket_type_id !== support.ticket_type_id)
      support.ticket_type_id = ticket_type_id;
    if (complaints !== support.complaints) support.complaints = complaints;
    if (status !== support.status) support.status = status;

    await support.save();
    res.status(200).json(support);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteSupport = async (req, res) => {
  const { id } = req.params;

  try {
    const support = await Support.findByPk(id);

    if (!support) {
      return res.status(404).json({ message: "Support not found" });
    }

    await support.destroy();
    res.status(200).json({ message: "Support deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
