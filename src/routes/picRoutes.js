const express = require("express");
const router = express.Router();
const picController = require("../controllers/picController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.authenticateToken, picController.createPic);
router.get("/", authMiddleware.authenticateToken, picController.getPics);
router.get(
  "/:id_pic",
  authMiddleware.authenticateToken,
  picController.getPicById,
);
router.put(
  "/:id_pic",
  authMiddleware.authenticateToken,
  picController.updatePic,
);
router.delete(
  "/:id_pic",
  authMiddleware.authenticateToken,
  picController.deletePic,
);

module.exports = router;
