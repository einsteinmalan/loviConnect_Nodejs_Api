const express = require("express");
const router = express.Router();
const BoosterController = require("../controllers/BoosterController");
const auth = require("../middleware/auth");

// Create Booster
router.route("/create").post(auth, BoosterController.createBooster);

// Get Booster by ID
router.route("/:boosterId").get(auth, BoosterController.getBooster);

// Get Boosters by User
router.get("/user/:userId").get(auth, BoosterController.getBoostersByUser);

module.exports = router;
