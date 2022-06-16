import { Router } from 'express';
import { postsData } from '../controllers/timelineController.js';

const timelineRoutes = Router();

//TODO: colocar o tokenValidate para validar o token
timelineRoutes.get('/timeline', postsData)

export default timelineRoutes;