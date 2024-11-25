import express from "express";
import { deleteOption, addVote } from "../controllers/options_controller.js";

const router = express.Router();

router.delete("/:id/delete", deleteOption);
router.put("/:id/add_vote", addVote);

export default router;
