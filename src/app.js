// Import required modules
import express from "express"; 
import cors from "cors"; 
import cookieParser from "cookie-parser"; 
import routes from "./routes/index.js"; 

// Initialize the Express application
const app = express();

// Middleware: Enable Cross-Origin Resource Sharing (CORS)
// Allows requests from the origin specified in the environment variable
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Specifies allowed origin for cross-origin requests
    credentials: true, // Allows cookies and credentials to be included in requests
  })
);

// Middleware: Parse JSON request bodies
// Limits the size of incoming JSON data to 21KB
app.use(express.json({ limit: "21kb" }));

// Middleware: Parse URL-encoded request bodies
// Handles form submissions and limits the size to 21KB
app.use(express.urlencoded({ extended: true, limit: "21kb" }));

// Middleware: Set up routing
// All requests are forwarded to the routes defined in "./routes/index.js"
app.use("/", routes);

// Middleware: Parse cookies
// Makes cookies available in `req.cookies` for use in the app
app.use(cookieParser());

// Export the configured Express application instance
export { app };
