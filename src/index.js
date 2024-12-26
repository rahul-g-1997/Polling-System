// Import environment variables from .env file using dotenv
import "dotenv/config";

// Import the function to connect to the MongoDB database
import connectDB from "./db/index.js";

// Import the Express application instance
import { app } from "./app.js";

// Set the port from the environment variable or default to 3000
const port = process.env.PORT || 3000;

// Connect to the MongoDB database
connectDB()
  .then(() => {

    app.on("error", (error) => {
      console.log("Error", error); 
      throw error; 
    });

    app.listen(port, () => {
      console.log(`Server listening on ${port}`); 
    });
  })
  .catch((error) => {
    // If the database connection fails, log the error
    console.log("MongoDB Connection failed : " + error);
  });
