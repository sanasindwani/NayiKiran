import express from "express";
import {
    getAllLegalDefenseModules,
    getModulesByCategory,
    getModuleById,
    createLegalDefenseModule,
    getEmergencyHelplines,
    getPoliceHarassmentSteps,
    searchModules
} from "../controllers/legalDefense.controller.js";

const router = express.Router();

// Get all modules
router.get("/", getAllLegalDefenseModules);

// Get modules by category
router.get("/category/:category", getModulesByCategory);

// Get specific module by ID
router.get("/:id", getModuleById);

// Search modules
router.get("/search/:query", searchModules);

// Get emergency helplines
router.get("/emergency/helplines", getEmergencyHelplines);

// Get police harassment steps
router.get("/police/steps", getPoliceHarassmentSteps);

// Create new module (admin only)
router.post("/", createLegalDefenseModule);

export default router;
