import { Router } from "express"

import {
    validateRetweetSchema,
    validateToken,
} from "../middlewares/validateInformation.js"

const retweetRouter = Router()

retweetRouter.post("/share/:postId", validateRetweetSchema, validateToken)

export default retweetRouter
