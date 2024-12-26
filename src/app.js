// Import required modules
import express from "express";
import routes from "./routes/index.js";

// Initialize the Express application
const app = express();

// Middleware: Parse JSON request bodies
app.use(express.json({ limit: "21kb" }));

// Middleware: Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true, limit: "21kb" }));

// All requests are forwarded to the routes defined in "./routes/index.js"
app.use("/", routes);

// Export the configured Express application instance
export { app };
