import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import signupRouter from './src/routers/signup.js';
import authRoutes from './src/routers/authRouter.js';
import postRouter from './src/routers/postRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use(signupRouter);
app.use(authRoutes);
app.use(postRouter);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log('servidor em pé na porta ', PORT);
});
