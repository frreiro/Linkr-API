import { Router } from 'express';
import { signup } from '../controllers/signup.js';
import { signupValidation } from '../middlewares/signup.js';

const signupRouter = Router();

signupRouter.post('/signup', signupValidation, signup);

export default signupRouter;
