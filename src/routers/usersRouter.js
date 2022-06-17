import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/users/:id', getUserById);

export default usersRouter;
