const express = require("express");
const router = express.Router();
const picController = require("../controllers/picController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload_user_pics");

router.post(
  "/",
  authMiddleware.authenticateToken,
  upload,
  picController.uploadPic,
);

router.put(
  "/:id_pic",
  authMiddleware.authenticateToken,
  upload,
  picController.updatePic,
);
router.get(
  "/user/:id_user",
  authMiddleware.authenticateToken,
  picController.getPicsByUserId,
);
router.get(
  "/:id_pic",
  authMiddleware.authenticateToken,
  picController.getPicById,
);
router.delete(
  "/:id_pic",
  authMiddleware.authenticateToken,
  picController.deletePic,
);

module.exports = router;
