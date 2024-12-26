// Import the Express library to create a router instance
import express from "express";

// Import the homeController function to handle requests to the root path
import { homeController } from "../controllers/home_controller.js";

// Import the routers for questions and options
import questionsRouter from "./questions.js";
import optionsRouter from "./options.js";

// Create a new router instance to define application routes
const routes = express.Router();

// Define the root route ("/") and assign the homeController to handle GET requests
routes.get("/", homeController);

// All routes defined in questionsRouter will now be prefixed with "/questions"
routes.use("/questions", questionsRouter);

// All routes defined in optionsRouter will now be prefixed with "/options"
routes.use("/options", optionsRouter);

// Export the routes module to make it available for use in the main application
export default routes;
