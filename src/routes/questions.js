// Import the Express library to create a router instance
import express from "express";

// Import controller functions to handle specific routes for questions
import {
  createOptions,
  createQuestion,
  deleteQuestion,
  viewQuestion,
} from "../controllers/questions_controller.js";

// Create a new router instance to define routes for questions
const router = express.Router();

// Route to create a new question
router.post("/create", createQuestion);

// Route to create a new option for a specific question
router.post("/:id/options/create", createOptions);

// Route to delete a specific question
router.delete("/:id/delete", deleteQuestion);

// Route to view a specific question along with its options
router.get("/:id", viewQuestion);

// Export the router to make it available for use in the main routes module
export default router;
