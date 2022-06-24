import { Router } from "express";
import { deletePost } from "../controllers/deleteController.js";
import { validateToken } from "../middlewares/likesMiddleware.js";

const deleteRouter = Router();

deleteRouter.post("/delete/:id", validateToken, deletePost);

export default deleteRouter;