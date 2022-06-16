import { Router } from 'express';
import { postsData } from '../controllers/timelineController.js';
import { tokenExists } from '../middlewares/timelineMiddleware.js';

const timelineRoutes = Router();

timelineRoutes.get('/timeline', tokenExists, postsData)

export default timelineRoutes;