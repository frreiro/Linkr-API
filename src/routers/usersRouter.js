import { Router } from 'express';

import {
  getUserById,
  getCurrentUserInfos,
} from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/users/:id', getUserById);
usersRouter.get('/users/currentuser', getCurrentUserInfos);

export default usersRouter;
