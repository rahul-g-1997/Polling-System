import Option from "../models/option.js";
import Question from "../models/question.js";

// Controller to delete an option from the database
export const deleteOption = async (req, res) => {
  try {
    // Extract the optionId from the request parameters
    const optionId = req.params.id;

    // Find the option by its ID
    const option = await Option.findById(optionId);

    // Check if the option exists
    if (!option) {
      return res.status(400).json({
        message: "Option not found", // Return error if option not found
      });
    }

    // Check if the votes count is greater than 0 and prevent deletion if so
    if (option.votes > 0) {
      return res.status(200).json({
        message: "Option has votes, cannot delete.", // Prevent deletion if there are votes
      });
    }

    // Find the associated question for this option
    const question = await Question.findById(option.question);

    // Remove the reference to the option in the question's options array
    await question.updateOne({ $pull: { options: optionId } });

    // Delete the option from the database
    await Option.findByIdAndDelete(optionId);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Option deleted successfully!", // Confirmation message
    });
  } catch (err) {
    // Catch any unexpected errors and log them
    console.error("Error:", err);
    // Return a server error response
    return res.status(500).json({
      message: "Internal server error", // Server-side error
    });
  }
};

// Controller to increment the vote count for a specific option
export const addVote = async (req, res) => {
  try {
    // Extract the optionId from the request parameters
    const optionId = req.params.id;

    // Find the option by its ID
    const option = await Option.findById(optionId);

    // Check if the option exists
    if (!option) {
      return res.status(400).json({
        message: "Option not found", // Return error if option not found
      });
    }

    // Increment the vote count for the selected option
    option.votes += 1;

    // Save the updated option to the database
    await option.save();

    // Find the associated question for this option
    const question = await Question.findById(option.question);

    // Increment the total votes for the question
    question.totalVotes += 1;

    // Save the updated question to the database
    await question.save();

    // Return the updated option in the response
    return res.status(200).json({
      success: true,
      option, // Include the updated option data
    });
  } catch (err) {
    // Catch any unexpected errors and log them
    console.error("Error:", err);
    // Return a server error response
    return res.status(500).json({
      message: "Internal server error", // Server-side error
    });
  }
};
