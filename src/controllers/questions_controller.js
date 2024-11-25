import Question from "../models/question.js";
import Option from "../models/option.js";

// To create a question
export const createQuestion = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required for creating a question",
      });
    }

    const question = await Question.create({ title });

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// To create an option
export const createOptions = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required for creating an option",
      });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: "Question not found!",
      });
    }

    const option = await Option.create({
      text,
      question,
    });

    // create link_to_vote using _id of the option
    const link_to_vote = `http://localhost:8000/options/${option.id}/add_vote`;

    option.link_to_vote = link_to_vote;

    await option.save();

    // Add reference of option to the question schema
    await question.updateOne({ $push: { options: option } });

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

// To delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: "Question not found",
      });
    }

    // Check if any options of the question have votes
    if (question.totalVotes > 0) {
      return res.status(400).json({
        message: "At least one of the options has votes",
      });
    }

    // Delete all options of the question
    await Option.deleteMany({ question: questionId });

    // Delete the question
    await Question.findByIdAndDelete(questionId);

    return res.status(200).json({
      success: true,
      message: "Question and associated options deleted successfully!",
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// To view a question and its options
export const viewQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    // Populate question with all its options
    const question = await Question.findById(questionId).populate({
      path: "options",
      model: "Option",
    });

    if (!question) {
      return res.status(400).json({
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
