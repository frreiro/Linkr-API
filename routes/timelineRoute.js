import { Router } from 'express';
import { postsData } from '../controllers/timelineController.js';

const timelineRoutes = Router();

timelineRoutes.get('/timeline', postsData)

export default timelineRoutes;