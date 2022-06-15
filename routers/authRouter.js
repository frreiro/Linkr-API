import { Router } from "express"
import { signIn } from "../controllers/signIn.js"
import { validateData, validatePass, validateUser } from "../middlewares/logInMiddlewareAuth.js"

const authRoutes = Router()

authRoutes.post("/signin",validateData, validateUser, validatePass, signIn)

export default authRoutes