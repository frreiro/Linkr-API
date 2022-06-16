import { Router } from 'express';
import { like, likedby } from '../controllers/likeController.js';
import { deleteLike, postValidate, validateToken } from '../middlewares/likesMiddleware.js';

const likesRouter = Router();

likesRouter.post("/likes", validateToken, postValidate, deleteLike, like);
likesRouter.get("/likes/:id", validateToken, postValidate, likedby);

export default likesRouter;
