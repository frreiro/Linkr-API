import { Router } from 'express';
import { postsData } from '../controllers/timelineController.js';
import { tokenValidate } from '../middlewares/tokenMiddleware.js';

const timelineRoutes = Router();

timelineRoutes.get('/timeline', tokenValidate, postsData)

export default timelineRoutes;