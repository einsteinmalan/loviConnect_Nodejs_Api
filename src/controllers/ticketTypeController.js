const { v4: uuidv4 } = require("uuid");
const TicketType = require("../models/ticketType");

exports.createTicketType = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  try {
    const newTicketType = await TicketType.create({
      id: uuidv4(),
      name,
    });

    res.status(201).json(newTicketType);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getTicketTypes = async (req, res) => {
  try {
    const ticketTypes = await TicketType.findAll();
    res.status(200).json(ticketTypes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getTicketTypeById = async (req, res) => {
  const { id } = req.params;

  try {
    const ticketType = await TicketType.findByPk(id);

    if (!ticketType) {
      return res.status(404).json({ message: "Ticket type not found" });
    }

    res.status(200).json(ticketType);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateTicketType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const ticketType = await TicketType.findByPk(id);

    if (!ticketType) {
      return res.status(404).json({ message: "Ticket type not found" });
    }

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    if (name !== ticketType.name) ticketType.name = name;

    await ticketType.save();
    res.status(200).json(ticketType);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteTicketType = async (req, res) => {
  const { id } = req.params;

  try {
    const ticketType = await TicketType.findByPk(id);

    if (!ticketType) {
      return res.status(404).json({ message: "Ticket type not found" });
    }

    await ticketType.destroy();
    res.status(200).json({ message: "Ticket type deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
