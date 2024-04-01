const express = require("express");
const router = express.Router();
const AdminSettingsController = require("../controllers/AdminSettingsController");
const auth = require("../middleware/auth");

//import * as AdminSettingsController from "../controllers/AdminSettingsController";

// Create Admin Settings
router.route("/create").post(auth, AdminSettingsController.createAdminSettings);

// Get Admin Settings by ID
router
  .route("/:adminSettingsId")
  .get(auth, AdminSettingsController.getAdminSettings);

module.exports = router;
