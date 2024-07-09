const express = require("express");
const router = express.Router();
const fakeController = require("../controllers/fakeControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware.authenticateToken, fakeController.createFake);
router.get("/", authMiddleware.authenticateToken, fakeController.getFakes);
router.get(
  "/:id_fake",
  authMiddleware.authenticateToken,
  fakeController.getFakeById,
);
router.put(
  "/:id_fake",
  authMiddleware.authenticateToken,
  fakeController.updateFake,
);
router.delete(
  "/:id_fake",
  authMiddleware.authenticateToken,
  fakeController.deleteFake,
);

module.exports = router;
