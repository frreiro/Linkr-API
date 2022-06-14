import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import signupRouter from "./routers/signup.js";

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use(signupRouter);

const {PORT} = process.env
app.listen(PORT, () => {
    console.log("servidor em pé na porta ", PORT)
})