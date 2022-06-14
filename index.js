import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routers/authRouter.js";

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use(authRoutes)

const {PORT} = process.env
app.listen(PORT, () => {
    console.log("servidor em pé na porta ", PORT)
})