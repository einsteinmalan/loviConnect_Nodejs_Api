const express = require("express");
const router = express.Router();
const InviteDatingsController = require("../controllers/InviteDatingsController");
const auth = require("../middleware/auth");

// Create Invite Dating
router.route("/create").post(auth, InviteDatingsController.createInviteDating);

// Get Invite Dating by ID
router.route("/:inviteId").get(auth, InviteDatingsController.getInviteDating);

// Get all Invite Datings for a user
router
  .route("/user/:userId")
  .get(auth, InviteDatingsController.getAllInviteDatingsByUser);

// Update Invite Dating
router.route("/update").post(auth, InviteDatingsController.updateInviteDating);

// Delete Invite Dating
router
  .route("/delete/:inviteId")
  .get(auth, InviteDatingsController.deleteInviteDating);

module.exports = router;
