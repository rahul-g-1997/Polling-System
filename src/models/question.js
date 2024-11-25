import mongoose from "mongoose";

// Define the schema for the "Question" collection in MongoDB
const questionSchema = new mongoose.Schema(
  {
    // Title of the question
    title: {
      type: String,
      required: true, // This field is mandatory
    },

    // Array of references to the related options
    options: [
      {
        type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId that references the "Option" collection
        ref: "Option", // Reference to the "Option" model
      },
    ],

    // Total number of votes across all options for the question
    totalVotes: {
      type: Number,
      default: 0, // Default value is 0
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model for the "Question" collection based on the schema
const Question = mongoose.model("Question", questionSchema);

// Export the model to use it in other parts of the application
export default Question;
