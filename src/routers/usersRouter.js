import { Router } from 'express';

import { getUserPosts } from '../controllers/usersController.js';
import { tokenExists } from '../middlewares/timelineMiddleware.js';

const usersRouter = Router();

usersRouter.get('/users/:userId', tokenExists, getUserPosts);

export default usersRouter;
