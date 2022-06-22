import { Router } from 'express';
import { insertComment, listComments } from '../controllers/commentsController.js';
import { validateComment } from '../middlewares/commentsMidlleware.js';
import { postValidate, validateToken } from '../middlewares/likesMiddleware.js';

const commentsRouter = Router();

commentsRouter.post("/comments", validateToken, postValidate, validateComment, insertComment);
commentsRouter.get("/comments/:id",validateToken, postValidate, listComments);

export default commentsRouter;
