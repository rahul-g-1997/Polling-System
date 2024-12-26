import mongoose from "mongoose";

// Define the schema for the "Option" collection in MongoDB
const optionSchema = new mongoose.Schema(
  {
    // Text content of the option
    text: {
      type: String,
      required: true, 
    },

    // Number of votes associated with this option
    votes: {
      type: Number,
      default: 0, // Default vote count is 0
    },

    // URL that allows users to directly vote for this option
    link_to_vote: {
      type: String, // Optional field to store the voting link
    },

    // Reference to the related question
    question: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId that references the "Question" collection
      ref: "Question", // Reference to the "Question" model
      required: true, 
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model for the "Option" collection based on the schema
const Option = mongoose.model("Option", optionSchema);

// Export the model to use it in other parts of the application
export default Option;
