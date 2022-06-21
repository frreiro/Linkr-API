import express from 'express';

import { postFollow, removeFollow } from '../controllers/followController';
import { tokenExists } from '../middlewares/timelineMiddleware';

const followRouter = express.Router();

followRouter.post('/follow', tokenExists, postFollow);
followRouter.delete('/follow', tokenExists, removeFollow);

export default followRouter;
