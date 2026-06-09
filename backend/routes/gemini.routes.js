import express from "express";
import askGemini from "../controllers/gemini.controller.js";  // ✅ Change here
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();
router.post("/ask-gemini", authenticateUser, askGemini);

export default router;
