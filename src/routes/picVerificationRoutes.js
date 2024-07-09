const express = require("express");
const router = express.Router();
const picVerificationController = require("../controllers/picVerificationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  picVerificationController.createPicVerification,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  picVerificationController.getPicVerifications,
);
router.get(
  "/:id_pic",
  authMiddleware.authenticateToken,
  picVerificationController.getPicVerificationById,
);
router.put(
  "/:id_pic",
  authMiddleware.authenticateToken,
  picVerificationController.updatePicVerification,
);
router.delete(
  "/:id_pic",
  authMiddleware.authenticateToken,
  picVerificationController.deletePicVerification,
);

module.exports = router;
