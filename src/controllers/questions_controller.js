import Question from "../models/question.js";
import Option from "../models/option.js";

// Controller to create a question
export const createQuestion = async (req, res) => {
  try {
    // Check if request body is empty
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }

    // Extract title from the request body
    const { title } = req.body;

    // Ensure that the title is provided for the question
    if (!title) {
      return res.status(400).json({
        message: "Title is required for creating a question",
      });
    }

    // Create a new question using the provided title
    const question = await Question.create({ title });

    // Return success response with the created question
    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    // Catch unexpected errors
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Controller to create an option for a specific question
export const createOptions = async (req, res) => {
  try {
    // Extract the questionId from the request parameters and text from the body
    const questionId = req.params.id;
    const { text } = req.body;

    // Check if the option text is provided
    if (!text) {
      return res.status(400).json({
        message: "Text is required for creating an option",
      });
    }

    // Find the question by its ID
    const question = await Question.findById(questionId);

    // Ensure the question exists
    if (!question) {
      return res.status(400).json({
        message: "Question not found!",
      });
    }

    // Create a new option associated with the question
    const option = await Option.create({
      text,
      question,
    });

    // Dynamically determine the base URL
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const link_to_vote = `${baseUrl}/options/${option.id}/add_vote`;

    // Save the generated vote link in the option document
    option.link_to_vote = link_to_vote;

    // Save the updated option with the vote link
    await option.save();

    // Add this option reference to the question's options array
    await question.updateOne({ $push: { options: option } });

    // Return success response with the created option
    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    // Catch unexpected errors
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error", // General error message
    });
  }
};

// Controller to delete a specific question
export const deleteQuestion = async (req, res) => {
  try {
    // Extract questionId from the request parameters
    const questionId = req.params.id;

    // Find the question by its ID
    const question = await Question.findById(questionId);

    // Check if the question exists
    if (!question) {
      return res.status(400).json({
        message: "Question not found",
      });
    }

    // Check if any options have votes (if totalVotes > 0, it can't be deleted)
    if (question.totalVotes > 0) {
      return res.status(400).json({
        message: "Option has votes, cannot delete.",
      });
    }

    // Delete all options associated with the question
    const optionsDeletionResult = await Option.deleteMany({
      question: questionId,
    });

    // Now delete the question itself
    await Question.findByIdAndDelete(questionId);

    // Return success message after deletion
    return res.status(200).json({
      success: true,
      message: "Question and associated options deleted successfully!",
    });
  } catch (err) {
    // Catch unexpected errors
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Controller to view a specific question and its associated options
export const viewQuestion = async (req, res) => {
  try {
    // Extract questionId from the request parameters
    const questionId = req.params.id;

    // Populate the question document with its associated options
    const question = await Question.findById(questionId).populate({
      path: "options",
      model: "Option",
    });

    // Check if the question exists
    if (!question) {
      return res.status(400).json({
        message: "Question not found",
      });
    }

    // Return the question and its options
    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    // Catch unexpected errors
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
