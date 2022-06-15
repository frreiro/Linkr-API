import { Router } from 'express';
import { like } from '../controllers/likeController.js';
import { postValidate, validateToken } from '../middlewares/likesMiddleware.js';

const likesRouter = Router();

likesRouter.post("/likes", validateToken, postValidate, like);

export default likesRouter;
