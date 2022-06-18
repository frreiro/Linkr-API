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

const app = express();
app.use(cors());

app.use(signupRouter);
app.use(authRoutes);
app.use(postRouter);
app.use(likesRouter)
app.use(timelineRoutes)
app.use(hashtagsRouter)
app.use(likesRouter);
app.use(searchRouter);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log('servidor em pé na porta ', PORT);
});
