import Option from "../models/option.js";
import Question from "../models/question.js";

// Delete an option
export const deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;

    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: "Option not found",
      });
    }

    // If option has at least one vote, it won't be deleted
    if (option.votes > 0) {
      return res.status(400).json({
        message: "This option has at least one vote",
      });
    }

    const question = await Question.findById(option.question);

    // Remove reference of this option from the question's options field
    await question.updateOne({ $pull: { options: optionId } });

    // Delete the option
    await Option.findByIdAndDelete(optionId);

    return res.status(200).json({
      success: true,
      message: "Option deleted successfully!",
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// To increase the count of votes
export const addVote = async (req, res) => {
  try {
    const optionId = req.params.id;

    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: "Option not found",
      });
    }

    // Add one to the value of votes of the option
    option.votes += 1;

    await option.save();

    // Add one to the value of total votes of the question
    const question = await Question.findById(option.question);
    question.totalVotes += 1;

    await question.save();

    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
