import express from "express";
import { homeController } from "../controllers/home_controller.js";
import questionsRouter from "./questions.js";
import optionsRouter from "./options.js";

const routes = express.Router();

routes.get("/", homeController);
routes.use("/questions", questionsRouter);
routes.use("/options", optionsRouter);

export default routes;
