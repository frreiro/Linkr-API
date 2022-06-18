import { Router } from 'express';
import { signIn } from '../controllers/signIn.js';
import { validateData, validatePass, validateUser } from '../middlewares/logInMiddlewareAuth.js';
import { validateToken } from '../middlewares/likesMiddleware.js';
import userdata from '../controllers/dataUserController.js';

const authRoutes = Router();

authRoutes.post('/signin', validateData, validateUser, validatePass, signIn);
authRoutes.get('/data', validateToken, userdata);

export default authRoutes;
