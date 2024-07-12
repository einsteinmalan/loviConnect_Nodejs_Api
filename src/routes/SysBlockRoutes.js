const express = require("express");
const router = express.Router();
const sysBlockController = require("../controllers/sysBlockController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  sysBlockController.createSysBlock,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  sysBlockController.getSysBlocks,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  sysBlockController.getSysBlockById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  sysBlockController.updateSysBlock,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  sysBlockController.deleteSysBlock,
);

module.exports = router;
