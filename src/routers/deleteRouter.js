import { Router } from "express";
import { deletePost } from "../controllers/deleteController.js";
import { validateToken } from "../middlewares/likesMiddleware.js";

const deleteRouter = Router();

deleteRouter.get("/delete/:id", validateToken, deletePost);

export default deleteRouter;