// Import the Mongoose library for MongoDB connection
import mongoose from "mongoose";

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to establish a connection using the connection string from environment variables
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}` // MongoDB connection URI stored in an environment variable
    );

    // Log a success message if the connection is established
    console.log(
      `MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Log an error message if the connection fails
    console.log("MongoDB connection FAILED", error);

    // Exit the process with a failure code to stop the application
    process.exit(1);
  }
};

// Export the `connectDB` function to use it in other parts of the application
export default connectDB;
