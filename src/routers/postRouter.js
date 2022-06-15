import { Router } from 'express';
import { createPost } from '../controllers/postsController.js';
import { validatePost } from '../middlewares/validateInformation.js';

const postRouter = Router();

postRouter.post('/posts', validatePost, createPost);

export default postRouter;
