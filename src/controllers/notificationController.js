const { v4: uuidv4 } = require("uuid");
const Notification = require("../models/notification");
const User = require("../models/user");

exports.createNotification = async (req, res) => {
  const { id_user, id_sender, notification, type } = req.body;

  if (!id_sender || !notification || !type) {
    return res
      .status(400)
      .json({ message: "id_sender, notification, and type are required" });
  }

  try {
    const sender = await User.findByPk(id_sender);
    const user = id_user ? await User.findByPk(id_user) : null;

    if (!sender || (id_user && !user)) {
      return res.status(404).json({ message: "Sender or user not found" });
    }

    const newNotification = await Notification.create({
      id_notif: uuidv4(),
      id_user,
      id_sender,
      notification,
      type,
    });

    res.status(201).json(newNotification);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getNotificationById = async (req, res) => {
  const { id_notif } = req.params;

  try {
    const notification = await Notification.findByPk(id_notif);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  const { id_notif } = req.params;
  const { id_user, id_sender, notification, type, read } = req.body;

  try {
    const notif = await Notification.findByPk(id_notif);

    if (!notif) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (!id_sender || !notification || !type) {
      return res
        .status(400)
        .json({ message: "id_sender, notification, and type are required" });
    }

    const sender = await User.findByPk(id_sender);
    const user = id_user ? await User.findByPk(id_user) : null;

    if (!sender || (id_user && !user)) {
      return res.status(404).json({ message: "Sender or user not found" });
    }

    if (id_user !== notif.id_user) notif.id_user = id_user;
    if (id_sender !== notif.id_sender) notif.id_sender = id_sender;
    if (notification !== notif.notification) notif.notification = notification;
    if (type !== notif.type) notif.type = type;
    if (read !== undefined && read !== notif.read) notif.read = read;

    await notif.save();
    res.status(200).json(notif);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  const { id_notif } = req.params;

  try {
    const notif = await Notification.findByPk(id_notif);

    if (!notif) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notif.destroy();
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
