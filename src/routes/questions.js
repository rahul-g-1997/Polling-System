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

/**
 * POST /create
 * Route to create a new question
 * - Controller: createQuestion
 * - Example: POST /questions/create
 */
router.post("/create", createQuestion);

/**
 * POST /:id/options/create
 * Route to create a new option for a specific question
 * - `id`: The ID of the question for which the option is being created
 * - Controller: createOptions
 * - Example: POST /questions/123/options/create
 */
router.post("/:id/options/create", createOptions);

/**
 * DELETE /:id/delete
 * Route to delete a specific question
 * - `id`: The ID of the question to be deleted
 * - Controller: deleteQuestion
 * - Example: DELETE /questions/123/delete
 */
router.delete("/:id/delete", deleteQuestion);

/**
 * GET /:id
 * Route to view a specific question along with its options
 * - `id`: The ID of the question to be retrieved
 * - Controller: viewQuestion
 * - Example: GET /questions/123
 */
router.get("/:id", viewQuestion);

// Export the router to make it available for use in the main routes module
export default router;
