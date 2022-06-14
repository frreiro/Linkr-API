import express from "express";
import cors from "cors"
import dotenv from "dotenv"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()


const {PORT} = process.env
app.listen(PORT, () => {
    console.log("servidor em pé na porta ", PORT)
})