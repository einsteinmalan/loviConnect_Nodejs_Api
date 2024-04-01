const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminsController");
const auth = require("../middleware/auth");

// Create Admin
router.route("/create").post(AdminController.createAdmin);

// Get Admin by ID
router.route("/:adminId").get(auth, AdminController.getAdmin);

// Get all Admins for a user
router.route("/user/:userId").get(auth, AdminController.getAllAdminsByUser);

module.exports = router;
