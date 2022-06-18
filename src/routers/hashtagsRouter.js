import { Router } from 'express';
import { tokenExists } from '../middlewares/timelineMiddleware.js';
import { getHashtag, getPostsByHashtag } from './../controllers/hashtagsController.js';

const hashtagsRouter = Router();

hashtagsRouter.get('/hashtags/:hashtag', getPostsByHashtag);
hashtagsRouter.get('/hashtags', tokenExists, getHashtag)

export default hashtagsRouter;
