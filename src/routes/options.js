// Import the Express library to create a router instance
import express from "express";

// Import controller functions to handle specific routes
import { deleteOption, addVote } from "../controllers/options_controller.js";

// Create a new router instance to define routes for options
const router = express.Router();

// Route to delete an option by its ID
router.delete("/:id/delete", deleteOption);

// Route to increment the vote count of an option by its ID
router.put("/:id/add_vote", addVote);

// Export the router to make it available for use in the main routes module
export default router;
