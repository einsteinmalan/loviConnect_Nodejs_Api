const express = require("express");
const router = express.Router();
const RandomCallQuotasController = require("../controllers/RandomCallQuotasController");
const auth = require("../middleware/auth");

// Create Random Call Quota
router
  .route("/create")
  .post(auth, RandomCallQuotasController.createRandomCallQuota);

// Get Random Call Quota by ID
router
  .route("/:quotaId")
  .get(auth, RandomCallQuotasController.getRandomCallQuota);

// Get Random Call Quota by User
router
  .route("/user/:userId")
  .get(auth, RandomCallQuotasController.getRandomCallQuotaByUser);

// Update Random Call Quota
router
  .route("/update")
  .post(auth, RandomCallQuotasController.updateRandomCallQuota);

// Delete Random Call Quota
router
  .route("/delete/:quotaId")
  .get(auth, RandomCallQuotasController.deleteRandomCallQuota);

module.exports = router;
