import { Router } from 'express';
import { postsData } from '../controllers/timelineController.js';
import { checkIfUserFollow, pageValidate, tokenExists } from '../middlewares/timelineMiddleware.js';

const timelineRoutes = Router();

timelineRoutes.get('/timeline', tokenExists, checkIfUserFollow, pageValidate, postsData);

export default timelineRoutes;
