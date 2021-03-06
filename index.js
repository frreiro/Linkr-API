import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import signupRouter from './src/routers/signup.js';
import authRoutes from './src/routers/authRouter.js';
import postRouter from './src/routers/postRouter.js';
import likesRouter from './src/routers/likesRouter.js';
import timelineRoutes from './src/routers/timelineRoute.js';
import hashtagsRouter from './src/routers/hashtagsRouter.js';
import searchRouter from './src/routers/searchRouter.js';
import deleteRouter from './src/routers/deleteRouter.js';
import usersRouter from './src/routers/usersRouter.js';
import commentsRouter from './src/routers/commentsRouter.js';
import retweetRouter from './src/routers/retweetRouter.js';
import followRouter from './src/routers/followRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use(signupRouter);
app.use(authRoutes);
app.use(postRouter);
app.use(likesRouter);
app.use(timelineRoutes);
app.use(hashtagsRouter);
app.use(likesRouter);
app.use(searchRouter);
app.use(deleteRouter);
app.use(usersRouter);
app.use(commentsRouter)
app.use(retweetRouter);
app.use(followRouter);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log('servidor em pé na porta ', PORT);
});
