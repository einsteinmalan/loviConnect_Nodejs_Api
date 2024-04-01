const express = require("express");
const router = express.Router();
const InviteDatingsQuotasController = require("../controllers/InviteDatingsQuotasController");
const auth = require("../middleware/auth");

// Create Invite Datings Quota
router
  .route("/create")
  .post(auth, InviteDatingsQuotasController.createInviteDatingsQuota);

// Get Invite Datings Quota by ID
router
  .route("/:quotaId")
  .get(auth, InviteDatingsQuotasController.getInviteDatingsQuota);

// Get Invite Datings Quota by User
router
  .route("/user/:userId")
  .get(auth, InviteDatingsQuotasController.getInviteDatingsQuotaByUser);

// Update Invite Datings Quota
router
  .route("/update")
  .post(auth, InviteDatingsQuotasController.updateInviteDatingsQuota);

// Delete Invite Datings Quota
router
  .get("/delete/:quotaId")
  .get(auth, InviteDatingsQuotasController.deleteInviteDatingsQuota);

module.exports = router;
