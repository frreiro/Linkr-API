import { Router } from "express"
import { like } from "../controllers/like.js"

const likesRoutes = Router()

likesRoutes.post("/signin", like)

export default likesRoutes