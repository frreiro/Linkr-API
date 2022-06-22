import express from 'express';

import { postFollow, removeFollow } from '../controllers/followController.js';
import { tokenExists } from '../middlewares/timelineMiddleware.js';

const followRouter = express.Router();

followRouter.post('/follow', tokenExists, postFollow);
followRouter.delete('/follow', tokenExists, removeFollow);

export default followRouter;
