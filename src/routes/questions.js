import express from "express";
import {
  createOptions,
  createQuestion,
  deleteQuestion,
  viewQuestion,
} from "../controllers/questions_controller.js";

const router = express.Router();

router.post("/create", createQuestion);
router.post("/:id/options/create", createOptions);
router.delete("/:id/delete", deleteQuestion);
router.get("/:id", viewQuestion);

export default router;
