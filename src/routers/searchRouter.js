import { Router } from 'express';
import { searchGet } from '../controllers/searchController.js';
import { searchMiddleware } from '../middlewares/searchMiddleware.js';

const searchRouter = Router();

searchRouter.post("/search", searchMiddleware, searchGet);

export default searchRouter;