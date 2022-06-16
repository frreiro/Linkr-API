import { Router } from 'express';
import { like } from '../controllers/likeController.js';
import { deleteLike, postValidate, validateToken } from '../middlewares/likesMiddleware.js';

const likesRouter = Router();

likesRouter.post("/likes", validateToken, postValidate, deleteLike, like);

export default likesRouter;
