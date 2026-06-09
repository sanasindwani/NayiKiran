import express from "express";
import {
    getAllChildcareProtectionModules,
    getModulesByCategory,
    getModuleById,
    getSchoolEnrollmentGuide,
    getGovernmentSchemes,
    getChildRightsFramework,
    getExploitationPrevention,
    searchModules,
    createChildcareProtectionModule
} from "../controllers/childcareProtection.controller.js";

const router = express.Router();

// Get all modules
router.get("/", getAllChildcareProtectionModules);

// Get specific routes first (before parameterized routes)
router.get("/school-enrollment", getSchoolEnrollmentGuide);
router.get("/government-schemes", getGovernmentSchemes);
router.get("/child-rights", getChildRightsFramework);
router.get("/exploitation-prevention", getExploitationPrevention);

// Get modules by category
router.get("/category/:category", getModulesByCategory);

// Search modules
router.get("/search", searchModules);

// Get specific module by ID (must be last)
router.get("/:id", getModuleById);

// Create new module (admin only)
router.post("/", createChildcareProtectionModule);

export default router;
