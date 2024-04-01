const express = require("express");
const router = express.Router();
const VersusWinsController = require("../controllers/VersusWinsController");
const auth = require("../middleware/auth");

// Create Versus Win
router.route("/create").post(auth, VersusWinsController.createVersusWin);

// Get Versus Win by ID
router.route("/:versusWinId").get(auth, VersusWinsController.getVersusWin);

// Get Versus Wins by User
router
  .route("/user/:userId")
  .get(auth, VersusWinsController.getVersusWinsByUser);

// Update Versus Win
router.route("/update").post(auth, VersusWinsController.updateVersusWin);

// Delete Versus Win
router
  .route("/delete/:versusWinId")
  .get(auth, VersusWinsController.deleteVersusWin);

module.exports = router;
