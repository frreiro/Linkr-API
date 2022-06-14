import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import postRouter from "./src/routers/postRouter.js"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use(postRouter)

const { PORT } = process.env
app.listen(PORT, () => {
    console.log("servidor em pé na porta ", PORT)
})
