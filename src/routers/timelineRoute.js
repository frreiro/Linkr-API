import { Router } from 'express';
import { postsData } from '../controllers/timelineController.js';
import { checkIfUserFollow, tokenExists } from '../middlewares/timelineMiddleware.js';

const timelineRoutes = Router();

timelineRoutes.get('/timeline', tokenExists, checkIfUserFollow, postsData);

export default timelineRoutes;
