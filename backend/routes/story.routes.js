import express from "express";
import { getSuccessStories } from "../controllers/success.controller.js"; 

const router = express.Router();

// Endpoint to get all success stories
router.get("/", async (req, res) => {
  try {
    const stories = await getSuccessStories();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch success stories", error });
  }
});

export default router;