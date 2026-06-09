// import express from "express";
// import rightsController from "../controllers/rights.controller.js"; // ✅ Change here
// import authenticateUser from "../middleware/authenticateUser.js";

// const router = express.Router();
// router.get("/",authenticateUser, rightsController);

// export default router;


import express from "express";
import { rightsController } from "../controllers/rights.controller.js";
import askRights from "../controllers/gemini.controller.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.get("/", authenticateUser, rightsController); // Fetch legal rights
router.post("/ask-rights", askRights);


export default router;