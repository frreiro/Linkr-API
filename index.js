import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import timelineRoutes from "./routes/timelineRoute.js";

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
app.use(timelineRoutes)

const { PORT } = process.env
app.listen(PORT, () => {
    console.log("servidor em pé na porta ", PORT)
})