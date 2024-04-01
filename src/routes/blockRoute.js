const express = require("express");
const router = express.Router();
const BlockController = require("../controllers/blockController");
const auth = require("../middleware/auth");

// Create block
router.route("/create").post(auth, BlockController.createBlock);

// Get block by ID
router.route("/:blockId").get(auth, BlockController.getBlock);

// Get all blocks for a user
router.route("/user/:userId").get(auth, BlockController.getAllBlocksByUser);

module.exports = router;
