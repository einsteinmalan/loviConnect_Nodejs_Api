import express from "express";
import * as AdminController from "../controllers/AdminsController";

const router = express.Router();

// Create Admin
router.post("/admins", AdminController.createAdmin);

// Get Admin by ID
router.get("/admins/:adminId", AdminController.getAdmin);

// Get all Admins for a user
router.get("/admins/user/:userId", AdminController.getAllAdminsByUser);

// Update Admin
router.put("/admins/:adminId", AdminController.updateAdmin);

// Delete Admin
router.delete("/admins/:adminId", AdminController.deleteAdmin);

export default router;
