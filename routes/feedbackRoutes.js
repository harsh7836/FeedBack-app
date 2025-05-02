import express from "express";
import { submitFeedbackController, getAllFeedbacks } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/submit", submitFeedbackController);
router.get("/all", getAllFeedbacks); // (Optional: secure this with middleware)

export default router;
