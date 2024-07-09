const express = require("express");
const router = express.Router();
const SysBlockController = require("../controllers/sysBlockController");
const auth = require("../middleware/auth");

// Create System Block
router.route("/create").post(auth, SysBlockController.createSysBlock);

// Get System Block by ID
router.route("/:sysBlockId").get(auth, SysBlockController.getSysBlock);

// Get all System Blocks for a user
router
  .route("/user/:userId")
  .get(auth, SysBlockController.getAllSysBlocksByUser);

// Update System Block
router.route("/update").post(auth, SysBlockController.updateSysBlock);

// Delete System Block
router
  .route("/delete/:sysBlockId")
  .get(auth, SysBlockController.deleteSysBlock);

module.exports = router;
